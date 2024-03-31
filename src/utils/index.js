import {toast} from "react-toastify";

export const numberToFinanceFormat = (number = 0) => {
    if (!number) {
        return 0
    }
    let num = number
    if (!Number.isInteger(number)) {
        num = number.toFixed(1);
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const phoneNumberFormat = (number) => {
    number = number.indexOf('+') !== -1 ? number : `+${number}`;
    return number;
}

export const validPhone = phoneNumber =>{
    return phoneNumber && phoneNumber.length == 12;
}

export const requestErrorDisplay = (e, defaultText = "Произошла ошибка, попробуйте позже") => {
    if (e.errors) {
        for (const eKey in e.errors) {
            toast.error(e.errors[eKey][0])
        }
    }

    if(e.status==409) toast.error('В базе уже есть водитель с таким номером телефона');
    else if (e.errorText) toast.error(e.errorText)
    else if (e.message) toast.error(e.message)
    else toast.error(defaultText)
}


let timerDebounce = null
export const onDebounce = (fn, timer = 400) => {
    clearTimeout(timerDebounce)
    timerDebounce = setTimeout(fn, timer)
}
