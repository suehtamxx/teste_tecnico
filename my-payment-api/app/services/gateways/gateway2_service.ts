import { PaymentGateway } from './gateway_interface.js'

export class Gateway2Service implements PaymentGateway {
    private baseUrl = 'http://localhost:3002'
    
    async process(amount: number, cardData: any, clientData: any): Promise<boolean> {
        try {
            const paymentResponse = await fetch(`${this.baseUrl}/transacoes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
                    'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f'
                },
                body: JSON.stringify({
                    valor: amount,
                    nome: clientData.name,
                    email: clientData.email,
                    numeroCartao: String(cardData.cardNumber),
                    cvv: String(cardData.cvv)
                })
            })
            
            const responseData = await paymentResponse.json() as any
            if(responseData.erros || (responseData.statuscode && responseData.statuscode >= 400)) {
                console.log('Gateway 2 recusou o cartao')
                return false
            }
            
            return true
        } catch (error) {
            console.error('Erro de conexao no gateway 2:', error)
            return false
        }
    }

    async refund(transactionId: string): Promise<boolean> {
        try {
            const refundResponse = await fetch(`${this.baseUrl}/transacoes/reembolso`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
                    'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f'
                },
                body: JSON.stringify({
                    id: transactionId
                })
            })
            
            return refundResponse.ok
        } catch (error) {
            console.error('Erro no Reembolso do Gateway 2:', error)
            return false
        }
    }
}