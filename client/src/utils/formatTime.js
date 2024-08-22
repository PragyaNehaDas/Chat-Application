//helper function to pad single-digit numbers with a leading zero
const padZero = (number) =>{
    return number.toString().padStart(2, "0")
}

const formatTime = (inputDate) =>{
    const date = new Date(inputDate)
    const hours = padZero(date.getHours())
    const min = padZero(date.getMinutes())

    return `${hours}:${min}`
}

export default formatTime