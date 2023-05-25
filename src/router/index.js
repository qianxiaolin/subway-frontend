import { createRouter,  createWebHashHistory  } from 'vue-router';
import Home from '../views/Home.vue'
import RoutePlan from '../components/RoutePlan.vue'
import SearchResult from '../components/SearchResult.vue'
import TainsportInfo from '../components/TransportInfo.vue'
import WeatherInfo from '../components/WeatherInfo.vue'
const routes = [
    {
        path:'',redirect:'/map',
        children:[
            {
                path:'map',component:Home,
                children:[
                    {path:'subwayroute',component:RoutePlan},
                    {path:'baiduroute',component:SearchResult},
                    {path:'transport',component:TainsportInfo},
                    {path:'weather',component:WeatherInfo}
                ]
            },
        ]
        
    }
            
]
const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),//修改后
    routes,
    mode:'hash'
})

export default router