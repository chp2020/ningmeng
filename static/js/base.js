const gotoTab = function(url) {
	uni.navigateTo({
		url: '../' + url
	})
}
const showToast = function(dur, title, icon) {
	uni.showToast({
		duration: dur,
		title: title,
		icon: icon
	})
}
module.exports = {
	gotoTab: gotoTab,
	showToast: showToast
}