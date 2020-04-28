export function toNumberFormatString(num){
    return (num+'').replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
export function toDateFormat(date){
    const y = date.getFullYear();
    const _m = date.getMonth() + 1;
    let m = (_m).toString();
    if(m.length === 1) m = '0' + m;
    const d = date.getDate();
    return y + m + d;
}
