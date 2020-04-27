import store from '../store/index.js';
const HOST = store.state.api;
const CJHOST = store.state.cjapi;
const fetchLocalUser = function() {
	let userData = uni.getStorageSync('user');
	if (typeof userData == "object") {
		return userData ? userData : '{}'
	} else {
		return JSON.parse(userData ? userData : '{}');
	}

}
const checkApi = function(api) {
	let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
	return reg.test(api);
}
var _this = this


const api = function(option) {
	var token = fetchLocalUser().token
	if (option.isAuth === undefined) {
		option.isAuth = true;
	}
	token = option.isAuth ? token : ''
	if (option.show == false) {

	} else {
		// uni.showLoading({
		// 	mask: true
		// })
	}
	return new Promise((resolve, reject) => {
		if (option.type) {
			var content = 'application/x-www-form-urlencoded'
		} else {
			var content = 'application/json'
		}
		var header = {
			Authorization: token ? token : '',
			'content-type': content,
			...option.header
		}
		uni.request({
			url: checkApi(option.url) ? option.url : HOST + option.url,
			method: option.method,
			header: header,
			data: option.data,
			success(result) {
				// uni.hideLoading();
				if(result.data.message){
					if (result.data.message.indexOf("JWT") != -1 || result.data.message.indexOf("HMAC") != -1) {
						uni.removeStorage({
							key: 'user',
							success: function(res) {
								// uni.reLaunch({
								// 	url: '../login/login'
								// });
							}
						});
						return false
					}
				}
				if (result.data.code == 3) {
					uni.removeStorageSync('user');
					uni.switchTab({
						url: '../userTab/mine'
						// success: r=> {
						// 	console.log(r);
						// },
						// fail: e=>{
						// 	console.log(e);
						// }
					})
					/* uni.showModal({
						title: '提示',
						content: '该页面内容需要您进行登陆',
						success: function(res) {
							if (res.confirm) {
								uni.removeStorageSync('user');
								uni.navigateTo({
									url: '/pages/login/login'
								});
							} else if (res.cancel) {
								// uni.tab({
								// 	url: '../index/index'
								// });
							}
						}
					}); */
					return false
				}
				if (result.statusCode == 501) {
					uni.showToast({
						title: result.data.message,
						icon: 'none'
					});
					// uni.switchTab({
					// 	url: '../yygtabber/index'
					// });
					return false
				}
				if (result.statusCode == 200) {
					resolve(result);
					return false
				}
				if (result.statusCode != 200) {
					uni.showToast({
						title: result.data.message,
						icon: 'none'
					});
					reject(result);
					return false
				}
				// else {
				// 	uni.showToast({
				// 		title: result.data.status,
				// 		icon: 'none'
				// 	});
				// 	uni.hideLoading();
				// }
			},
			fail(error, a) {
				console.log(JSON.stringify(error));
				// uni.hideLoading();
				reject(error);
			}
		});
	});
}

module.exports = {
	api: api
}
