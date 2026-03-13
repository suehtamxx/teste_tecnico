// app/services/gateways/gateway/interface.ts

export interface PaymentGateway {
    process(amount: number, cardData: any, clientData: any): Promise<boolean>

    refund(transactionId: string): Promise<boolean>
}
