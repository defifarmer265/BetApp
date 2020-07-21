export const fetchMatches = (matches=[], action)=>{
    if(action.type==='FETCH_MATCHES'){
        return action.payload
    }
    return matches
}

export const selectMatch = (selectedMatches=[], action)=>{
    if(action.type==='SELECT_MATCH'){
        const matchIncluded = selectedMatches.some(match=> match.match_id === action.payload.match_id)
        if(!matchIncluded){
            //this means the match is not there at all and you anna add it
            return [...selectedMatches, action.payload]
        }    
        else if(matchIncluded){
            return selectedMatches.filter(match => match.match_id !== action.payload.match_id) 
        }  
    }
    else if(action.type === 'CHECK_MATCH'){
                selectedMatches.find(match=>match.match_id === action.payload.match_id).checked = action.payload.checked
                return [...selectedMatches]
    }
    
    else if(action.type === 'REMOVE_MATCH'){
        return selectedMatches.filter(match => match.match_id !== action.payload.match_id)
    }
    else if(action.type==='REMOVE_MATCHES'){
        return []
    }
    return selectedMatches
}

export const clearMatches =()=>{
    
}