import axios from 'axios'

export default axios.create({
    baseURL:  `https://api.the-odds-api.com/v3/odds/?apiKey=${process.env.REACT_APP_ODDS_API_KEY}&region=uk&mkt=h2h`
})