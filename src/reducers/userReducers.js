export const authUser = (isSignedIn=null, action)=>{
    if(action.type==='SIGN_UP'){
        return action.payload
    }
    else if(action.type==='SIGN_IN'){
        return action.payload
    }
    else if(action.type==='SIGN_OUT'){
        return null
    }
    return isSignedIn
}

export const betAmount = (betAmount=null, action)=>{
    if(action.type==='BET_AMOUNT'){
        return action.payload
    }
    return betAmount
}

export const placedBets = (placedBets=[], action)=>{
    if(action.type==='FETCH_BETS'){
        return [...action.payload]
    }
    return placedBets
}

export const appLoaded = (appLoaded=false, action)=>{
    if(action.type==='APP_LOAD'){
        return action.payload
    }
    return appLoaded
}