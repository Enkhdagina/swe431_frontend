export enum OrderType { HAND = "HAND", DOOR = "DOOR" }
export enum PaymentType {
    TRANSFER = "TRANSFER",
    INTERNET = "INTERNET", QPAY = "QPAY", CASH = "CASH"
}
export enum OrderStatus {
    DELIVERING = 'DELIVERING',
    DELIVERED = 'DELIVERED',
    RETURNED = 'RETURNED',
    QUEUE = 'QUEUE',
}
export enum OrderPaymentType {
    UNPAID = 'UNPAID',
    PAID = 'PAID',

}
