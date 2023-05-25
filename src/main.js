import { createApp } from 'vue'
import 'echarts/lib/component/grid'
import store from './vuex/index'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// router
import router from './router/index'
const app = createApp(App)
app.use(ElementPlus).use(router)
app.use(store)
app.mount('#app')


