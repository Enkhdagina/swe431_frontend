import { OrderPaymentType, OrderStatus, OrderType, PaymentType } from "@/utils/enum";
import { Coffee } from "./coffee";
import { Payment } from "./payment";
import { User } from "./user";

export  interface Order {
    id: string,
	product: Coffee;
	quantity: number;
	address: string;
    type: OrderType,
    payment: Payment;
    status: OrderStatus
    orderPayment: OrderPaymentType
    user: User
    
}
