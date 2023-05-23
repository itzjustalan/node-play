export const expensive_fn = async (number, count = 10) => {
    if (isNaN(number) || isNaN(count)) throw new Error('aah not a number');
    for (let i = 0; i < count; i++) number++
    return number;
}