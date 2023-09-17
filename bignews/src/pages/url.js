
const apiKey = process.env.REACT_APP_NEWSAPI_APIKEY
export const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&category=technology&language=en&pageSize=10`;