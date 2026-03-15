import Gateway from '#models/gateway'
import { Gateway2Service } from './gateways/gateway2_service.js'
import { Gateway1Service } from './gateways/gateway1_service.js'

export class PaymentService {

    async process(amount: number, cardData: any, clientData: any) {
        let gatewayId
        const activeGateways = await Gateway.query().where('isActive', true).orderBy('priority', 'asc')
        
        for (const gateway of activeGateways) {
            let gatewayPayment
            if (gateway.name ==  'Gateway 1' || gateway.id == 1) {
                gatewayPayment = new Gateway1Service()
                gatewayId = gateway.id 
            }
            else{
                gatewayPayment = new Gateway2Service()
                gatewayId = gateway.id
            }
            const paymentSuccess = await gatewayPayment.process(amount, cardData, clientData)
            if (paymentSuccess){
                return {
                    success: true,
                    gatewayId: gateway.id
                }
            }

        }
        return {
                success: false, 
                gatewayId: gatewayId
            }
    }
}