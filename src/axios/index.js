import axios from 'axios'
const http=axios.create({
    baseURL:'http://localhost:8000',
})

// 请求拦截器，将token放入请求头，传给后端进行校验
http.interceptors.request.use(
    // config 就是请求对象
   (config) => {
     const token = localStorage.getItem('token')
     // 将token添加到请求对象的请求头中，跟随请求一并发送至服务器
     if (token) config.headers.Authorization = `Bearer ${token}`;
     // 请求拦截器，允许请求发送的话别忘了给请求对象返回出去，否则请求发不出去
     return config
   },
   (error) => Promise.reject(error),
 )
export {http}

