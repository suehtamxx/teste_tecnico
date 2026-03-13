// app/services/gateways/gateway1_service.ts

import { PaymentGateway } from './gateway_interface.js'

export class Gateway1Service implements PaymentGateway {
    private baseUrl = 'http://localhost:3001'
    
    async process(amount: number, cardData: any, clientData: any): Promise<boolean> {
        try {
            const loginResponse = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'dev@betalent.tech',
                    token: 'FEC9BB078BF338F464F96B48089EB498'
                })
            })

            if(loginResponse.ok) return false

            const loginData = await loginResponse.json() as { token: string}
            const gatewayToken = loginData.token

            const paymentResponse = await fetch(`${this.baseUrl}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${gatewayToken}`
                },
                body: JSON.stringify({
                    amount: amount,
                    name: clientData.name,
                    email: clientData.email,
                    cardNumber: cardData.cardNumber,
                    cvv: cardData.cvv
                })
            })

            
            return paymentResponse.ok
        } catch (error) {
          console.error('Erro de conexao no Gateway 1:', error)
          return false
        }
    }

    async refund(transactionId: string): Promise<boolean> {
        console.log('Reembolsando via gateway 1')

        return true
    }
}