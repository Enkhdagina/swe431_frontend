import { PaymentType } from "@/utils/enum";

export  interface Payment {
    _id: string,
	img?: string;
	type: PaymentType;
	bank?: string,
	accountNumber?: number;
	accountName?: string;
    name?: string,
	text?: string
    
}
