import { Payment } from "@/model/payment"
import { OrderType, PaymentType } from "./enum"
import { Order } from "@/model/order"
import { Coffee } from "@/model/coffee"

export const imgUrl = 'https://res.cloudinary.com/dg2laerve/image/upload/'


export const paymentType:Payment = {
    accountName: "Dagina",
    accountNumber: 1223412312141234,
    bank: "Хаан банк" ,
    id: 'asdf',
    img: 'v1698251138/aacurzycuvcaempc2obs.svg',
    type: PaymentType.TRANSFER,

} 

export const orders: Order[] = [
    {
        address: '',
        coffee: {
            name: "Tanzania",
            img: "v1698169047/srcx4tr421kfupbqdixw.svg",
            ingredients: ["Espresso", "Chocolate", "Steamed Milk"],
            price: 30000,
            id: "string",
            description: "string",
          },
          id: '',
          payment: paymentType,
          quantity: 1,
          type: OrderType.HAND
    }
]
export const data: Coffee[] = [
    {
      name: "Tanzania",
      img: "v1698169047/srcx4tr421kfupbqdixw.svg",
      ingredients: ["Espresso", "Chocolate", "Steamed Milk"],
      price: 30000,
      id: "string",
      description: 'Африкын бүс нутаг Танзани улсад ургасан энэхүү кофе нь чихэрлэг жимсний үл ялиг амтнаас гадна бэрсүүт жүржний хүчиллэг амт давамгайлсан, хар цай болон дарсны амт мэдрэгдэх болно. Балгасны дараа аманд бага зэрэг шоколадны амт үлдэж таатай мэдрэмж төрүүлнэ.'
    },
    {
        name: "asdf",
        img: "v1698169047/srcx4tr421kfupbqdixw.svg",
        ingredients: ["Espresso", "Chocolate", "Steamed Milk"],
        price: 30000,
        id: "string1",
        description: 'Африкын бүс нутаг Танзани улсад ургасан энэхүү кофе нь чихэрлэг жимсний үл ялиг амтнаас гадна бэрсүүт жүржний хүчиллэг амт давамгайлсан, хар цай болон дарсны амт мэдрэгдэх болно. Балгасны дараа аманд бага зэрэг шоколадны амт үлдэж таатай мэдрэмж төрүүлнэ.'
      
    },
    {
        id: "strin2g",
        name: "asdfasdf",
        img: "v1698169047/srcx4tr421kfupbqdixw.svg",
        ingredients: ["Espresso", "Chocolate", "Steamed Milk"],
        price: 30000,
        description: 'Африкын бүс нутаг Танзани улсад ургасан энэхүү кофе нь чихэрлэг жимсний үл ялиг амтнаас гадна бэрсүүт жүржний хүчиллэг амт давамгайлсан, хар цай болон дарсны амт мэдрэгдэх болно. Балгасны дараа аманд бага зэрэг шоколадны амт үлдэж таатай мэдрэмж төрүүлнэ.'
      
    },
    {
        name: "aa",
        img: "v1698169047/srcx4tr421kfupbqdixw.svg",
        ingredients: ["Espresso", "Chocolate", "Steamed Milk"],
        price: 30000,
        id: "strin4g",
        description: 'Африкын бүс нутаг Танзани улсад ургасан энэхүү кофе нь чихэрлэг жимсний үл ялиг амтнаас гадна бэрсүүт жүржний хүчиллэг амт давамгайлсан, хар цай болон дарсны амт мэдрэгдэх болно. Балгасны дараа аманд бага зэрэг шоколадны амт үлдэж таатай мэдрэмж төрүүлнэ.'
      
    },
  ];

export const payments: Payment[] = [
    {
        id: '',
        img: 'v1698257440/afj6nnj5uquwdn0fcng2.svg',
        type: PaymentType.INTERNET,
        name: 'Интернет банк',
        text: 'Интернет пин код шаардлагатай'
    },
    {
        id: '',
        img: 'v1698257440/immnxp1uaubnnmd3dqmx.svg',
        type: PaymentType.TRANSFER,
        name: 'Дансаар шилжүүлэх',
        text: 'Манай данс руу шилжүүлэх'
    },
    {
        id: '',
        img: 'v1698257439/z2lgyvghpbkapztknthf.svg',
        type: PaymentType.QPAY,
        name: 'QPAY',
        text: 'QPAY-ээр төлбөрөө төлөх'
    },
    {
        id: '',
        img: 'v1698257440/xe62wmaaavljiinel7rg.svg',
        type: PaymentType.CASH,
        name: 'Бэлнээр төлөх',
        text: 'Бэлэн мөнгөөр төлөх'
    },
]