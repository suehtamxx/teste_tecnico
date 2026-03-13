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
}
