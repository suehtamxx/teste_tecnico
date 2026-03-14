import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import Transaction from '#models/transaction'
import { PaymentService } from '../services/payment_service.js'

export default class PurchasesController {
    async store({ request, response }: HttpContext) {
        const dados = request.body()
        const product = await Product.findOrFail(dados.productId)

        const valorTotal = product.amount * dados.quantity

        const payment = new PaymentService()

        const isApproved = await payment.process(valorTotal, dados.cardData, dados.clientData)

        const transaction = await Transaction.create({
            clientId: dados.clientId, 
            amount: valorTotal, 
            status: isApproved.success ? 'PAID': 'FAILED',
            gatewayId: isApproved.gatewayId,
            externalId: 'PAY-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            cardLastNumbers: dados.cardData.cardNumber.slice(-4)
        })
        await transaction.related('products').attach({[product.id]: { quantity: dados.quantity }})
        
        if(isApproved.success){
            return response.status(201).json({ message: 'Aprovado', transaction})
        }else{
            return response.status(400).json({ message: 'Recusado', transaction})
        }
    }

    public async index({ response }: HttpContext) {
        // busca todas as transações e traz os dados das tabelas relacionadas
        
        const transactions = await Transaction.query()
        .preload('client')
        .preload('products')
        .orderBy('createdAt', 'desc')

        return response.ok(transactions)
    }

    public async show({ params, response}: HttpContext) {
        const transactionId = params.id

        const transaction = await Transaction.query()
        .where('id', transactionId)
        .preload('client')
        .preload('products')
        .firstOrFail()
        
        return response.ok(transaction)
    }   

    public async refund({ params, response}: HttpContext) {
        const transaction = await Transaction.findOrFail(params.id)

        if(transaction.status !== 'PAID')
            return response.badRequest({message: 'Apenas transacoes pagas podem ser reembolsadas.'})
        
        try {
            if (transaction.gatewayId === 1) {
                await fetch(`http://localhost:3001/transactions/${transaction.externalId}/charge_back`, {
                    method: 'POST',
                    headers: {'Authorization': 'Bearer FEC9BB078BF338F464F96B48089EB498'}
                })
            } else {
                await fetch(`http://localhost:3002/transacoes/reembolso`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
                        'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f'
                    },
                    body: JSON.stringify({id: transaction.externalId})
                })
            }

            transaction.status = 'REFUNDED'
            await transaction.save()

            return response.ok({ message: 'Reembolso realizado com sucesso', transaction})
        } catch (error) {
            return response.internalServerError({ message: 'Erro ao se comunicar com o Gateway', error: error.message})
        }

    }
}
