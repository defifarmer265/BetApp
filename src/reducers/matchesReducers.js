export const fetchMatches = (matches=[], action)=>{
    if(action.type==='FETCH_MATCHES'){
        return action.payload
    }
    return matches
}

export const selectMatch = (selectedMatches=[], action)=>{
    if(action.type==='SELECT_MATCH'){
        const matchIncluded = selectedMatches.some(match=> match.match_id === action.payload.match_id)
        if(!matchIncluded && action.payload.checked){
            //this means the match is not there at all and you anna add it
            return [...selectedMatches, action.payload]
        }
        else if(matchIncluded){
            //this means the match is included,
            if(action.payload.hasOwnProperty('checked')){
                //this means that you want to update the checked property because the checked property is present
                console.log("Present and not checked lmaoo")
                console.log(selectedMatches.find(match=>match.match_id === action.payload.match_id))
                selectedMatches.find(match=>match.match_id === action.payload.match_id).checked = action.payload.checked
                return [...selectedMatches]
            }
            //no checked property, this means you wanna remove the match
                return selectedMatches.filter(match => match.match_id !== action.payload.match_id)
            
        }
    }
    return selectedMatches
}