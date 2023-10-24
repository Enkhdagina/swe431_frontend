
export function currency(value: string) {
   
    let copy = ""
   
    let index = value.length%3
    if(index == 0) index = 3
    copy = value.slice(0, index)
    if(value.length < 3) copy = value
    value = value.slice(index)
    while(value.length >= 3) {
       
        copy+=  "," + value.slice(0, 3) 
        
        value = value.slice(3)
        
        index=3
    } 
    copy+='₮'
    return copy
}
