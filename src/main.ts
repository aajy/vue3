import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import vueYoutube from 'vue-youtube'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import '@/assets/dist/css/common.scss'

createApp(App).use(store).use(router).use(BootstrapVue3).mount('#app')
