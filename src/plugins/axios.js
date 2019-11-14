import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install (Vue) {
        // Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL: 'https://stock-trader-rapl.firebaseio.com/'
        })

        // para interceptar requisição
        Vue.prototype.$http.interceptors.request.use( config => {
            
            // --- inclu aqui suas regras de negócio
            
            return config
        }, error => Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use( res => {
            
            // --- inclu aqui suas regras de negócio
            
            return res
        }, error => Promise.reject(error))   
    }
})