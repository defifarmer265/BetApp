export const shortenText = (text,startingPoint ,maxLength)=>{
    return text.length > maxLength?
       `${text.slice(startingPoint, maxLength)}...`:
       text
    }