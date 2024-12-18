import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/all.css'
import * as echarts from "echarts"
import 'echarts-wordcloud';

import router from './router'
import axios from 'axios'


Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
  el:'#app',
  render: h => h(App),
  router:router,
})
