import {http} from '../axios/index.js'

const getRoutePlan=(Form)=>{
    return http.post('/map/get_route', {
        Form
      })
}
const getCityData=()=>{
  return http.get('/city')
}
const getWeatherCity=()=>{
  return http.get('/weather/city')
}
const getWeatherInfo=(data)=>{
  return http.post('/weather/info',{data})
}
export {getRoutePlan,getCityData,getWeatherInfo,getWeatherCity} 
