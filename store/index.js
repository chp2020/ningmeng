import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
// var bendiapi = 'http://192.168.0.149:8199/'
var bendiapi = 'https://newnmt.ljq360.com/Home/'
var bendiImg = 'https://newnmt.ljq360.com/'
var xianshang = ""

//vuex必须要有声明变量默认值，不然无法同步渲染到页面上
const store = new Vuex.Store({
	state: {
		// imgupapi: api+'/home/index/dyUpload', //图片上传地址 不带水印
		// imgurl:  api, //图片预览
		// api: api, //接口请求地址
		// cjapi: cjapi, //抽奖请求的api
		//下方本地
		imgUrl: bendiImg, //图片上传地址
		api: bendiapi, //接口请求地址
		imgurl: bendiapi, //图片预览
	},
	mutations: {
		ygtypef: function(state, val) { //万能马多个传参
			state.ygtype = val
		},
	}
});
export default store
