// app/services/gateways/gateway2_service.ts

import { PaymentGateway } from './gateway_interface.js'

export class Gateway2Service implements PaymentGateway {
    private baseUrl = 'http://localhost:3002'
    
    async process(amount: number, cardData: any, clientData: any): Promise<boolean> {
        try {
            const paymentResponse = await fetch(`${this.baseUrl}/transacoes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Gateway-Auth-Token':'tk_f2198cc671b5289fa856',
                    'Gateway-Auth-Secret':'3d15e8ed6131446ea7e3456728b1211f'
                },
                body: JSON.stringify({
                    valor: amount,
                    nome: clientData.name,
                    email: clientData.email,
                    numeroCartao: cardData.cardNumber,
                    cvv: cardData.cvv
                })
            })

            return paymentResponse.ok
            
        } catch (error) {
            console.error('Erro de conexao no gateway 2', error)
            return false
        }

        
    }

    async refund(transactionId: string): Promise<boolean> {
        console.log('Reembolsando via gateway 2')
        
        return true
    }
}