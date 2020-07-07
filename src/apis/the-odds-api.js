import axios from 'axios'
const KEY ='763eeecb845ff81a3c5cd63452bd47f9'

export default axios.create({
    baseURL:  'https://api.the-odds-api.com/v3/odds/?apiKey=938761136cd182581930d58d844d7867&region=uk&mkt=h2h',
    params:{
        apiKey: KEY,
        market: 'h2h',
        sport: 'soccer_epl',
        region: 'uk'
    }
})