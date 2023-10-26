import { OrderType, PaymentType } from "@/utils/enum";
import { Coffee } from "./coffee";
import { Payment } from "./payment";

export  interface Order {
    id: string,
	coffee: Coffee;
	quantity: number;
	address: string;
    type: OrderType,
    payment: Payment;
    
    
}
