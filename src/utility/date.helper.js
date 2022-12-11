export const getNumberFloat = (number) => {
    if(number < 10) return `0${number}`
    return number
}

export const getDateGGAAYYYY = (date, separator = " ") => {
    return date.getDate() + separator + date.getMonth() + separator + date.getFullYear();
};

export const getDateYYYYMMDD = (date, separator = " ") => {
    return date.getFullYear() + separator + getNumberFloat(date.getMonth()) + separator + getNumberFloat(date.getDate());
}

export const getAfterDate = (date, afterCount) => {
    return new Date(date.setDate(date.getDate() + afterCount));
}