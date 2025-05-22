export const isDate = (date: any) => {
  //@ts-expect-error
  return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date))
}
export const isString = (string: any) => {
  return string.toString() === string
}
