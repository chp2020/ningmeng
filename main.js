import Vue from 'vue'
import App from './App'
import { gotoTab, showToast } from './static/js/base.js'
import tab from './components/tab.vue'
import store from './store/index.js'
import { api } from './api/index';
// import uniIcons from './components/uni-icons/uni-icons.vue'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store
Vue.prototype.gotoTab = gotoTab
Vue.prototype.showToast = showToast
Vue.prototype.api = api
Vue.component('tab-bar', tab)
// Vue.component('uni-icon', uniIcons)
const app = new Vue({
    ...App
})
app.$mount()
