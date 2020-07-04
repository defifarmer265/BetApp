export const fetchMatches = (matches=[], action)=>{
    if(action.type==='FETCH_MATCHES'){
        return action.payload
    }
    return matches
}

export const selectMatch = (selectedMatches=[], action)=>{
    if(action.type==='SELECT_MATCH'){
        //if the match doesn't exist, add it
        if(!selectedMatches.some(match=> match.match_id === action.payload.match_id)){
            return [...selectedMatches, action.payload]
        }
        //if xecution gets here, means the match exist, so remove that particular market
        return selectedMatches.filter(match => match.match_id !== action.payload.match_id)
    }
    return selectedMatches
}

export const betTotal = (betTotal = 0, action)=>{

}