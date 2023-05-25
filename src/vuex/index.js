import { createStore } from 'vuex'
import formModule from './form'
import routeModule from './routeplan'
  const store=createStore({
    modules:{
      formModule,
      routeModule
    }
}
)
export default store
