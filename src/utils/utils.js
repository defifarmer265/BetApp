export const shortenText = (text, startingPoint, maxLength) => {
  return text.length > maxLength ? `${text.slice(startingPoint, maxLength)}...` : text
}

export const convertObjectToArray = object => {
  if (object) {
    const betArrays = []
    const keys = Object.keys(object)
    for (let i = 0; i < keys.length; i++) {
      betArrays.push({betId: keys[i], ...object[keys[i]]})
    }
    return betArrays
  }
  return []
}

export const months_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
