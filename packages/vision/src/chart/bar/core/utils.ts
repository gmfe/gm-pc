export function getMaxFieldStringLength(field: string, data: any[]) {
  let maxLength = 0
  data.forEach((d) => {
    const strLen = d[field].length
    maxLength = Math.max(strLen, maxLength)
  })
  return maxLength
}
