// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Qs from 'qs'
import md5 from 'js-md5'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  Row,
  Col,
  Tab,
  Tabs,
  NavBar,
  Toast,
  Lazyload,
  List,
  PullRefresh,
  Swipe,
  SwipeItem,
  Cell,
  CellGroup
} from 'vant';

Vue.use(Row).use(Col).use(Tab).use(Tabs).use(NavBar).use(Toast).use(List).use(PullRefresh).use(Swipe).use(SwipeItem).use(Cell).use(CellGroup)
Vue.use(Lazyload, {
  error: require('../static/images/error.png'),
  loading: require('../static/images/loading.gif'),
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'],
  preload: 1.5,
})

Vue.config.productionTip = false

const img = 'http://192.168.1.206:8010/img/'
const globKey = 'YjU5YTA3NzEtMDI2MS00YzhiLTljM2ItYzE2MTljZDQwNDNhNGExYjEzZTUtYmIx'

Vue.prototype.axios = axios
Vue.prototype.qs = Qs
Vue.prototype.$md5 = md5
Vue.prototype.$img = img
Vue.prototype.$nprogress = nprogress
Vue.prototype.$globKey = globKey

axios.defaults.baseURL = 'http://192.168.1.206:8090/nft'

nprogress.configure({ease:'ease',speed:500});

axios.interceptors.request.use(config => {
  nprogress.start();
  return config
}, error => {

  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  nprogress.done();
  return data
}, error => {
  return Promise.reject(error)
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
