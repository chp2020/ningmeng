<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.page {
		padding: 0 30rpx;
		background-image: url(static/images/tab/tab.png);
		background-size: 100% 406rpx;
		background-repeat: no-repeat;
		padding-bottom: 200rpx;
		background-color: #FFFFFF;
		.tab-bg {
		}
	}
	
	::-webkit-scrollbar {
	    display: none;
	}
	
</style>
