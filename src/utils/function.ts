import { OrderPaymentType, OrderStatus, OrderType } from "./enum"



export function currency(value: string) {

    let copy = ""

    let index = value.length % 3
    if (index == 0) index = 3
    copy = value.slice(0, index)
    if (value.length < 3) copy = value
    value = value.slice(index)
    while (value.length >= 3) {

        copy += "," + value.slice(0, 3)

        value = value.slice(3)

        index = 3
    }
    copy += '₮'
    return copy
}

export function statusValue(status: OrderStatus) {
    switch (status) {
        case OrderStatus.DELIVERED:
            return "Хүргэгдсэн"
        case OrderStatus.DELIVERING:
            return "Хүргэлт хийж байна"
        case OrderStatus.QUEUE:
            return "Хүлээгдэж байна"
        case OrderStatus.RETURNED:
            return "Буцаагдсан"
    }

}
export function typeValue(type: OrderType) {
    switch (type) {
        case OrderType.DOOR:
            return "Гар дээр авах"
        case OrderType.HAND:
            return "Үүдэнд тавих"

    }

}
export function orderPaymentValue(value: OrderPaymentType) {
    switch (value) {
        case OrderPaymentType.UNPAID:
            return "Төлөөгүй"
        case OrderPaymentType.PAID:
            return "Төлсөн"

    }

}

export function bankHide(value: string) {

    let copy = value.substring(0, 4) + ("*".repeat(value.length - 8)) + value.substring(value.length - 4)
    return copy.substring(0, 4) + " " + copy.substring(4, 8) + " " + copy.substring(8, 12) + " " + copy.substring(12)
}