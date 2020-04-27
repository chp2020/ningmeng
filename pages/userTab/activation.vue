<template>
	<view class="page">
		<!-- <view class="">当前等级: {{vip}}</view> -->
		<view v-for="(item,index) in list" :key="index" class="content" :class="index == 0 ? 'more-top' : ''" @click="upgrate(item)">
			<image :src="imgUrl + item.img" style="width: 100%;" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: "",
				list: [],
				vip: "", //从缓存中获取 当前用户等级
			}
		},
		onShow() {
			this.getVip();
		},
		onLoad(){
			this.imgUrl = this.$store.state.imgUrl;
			this.getList();
		},
		methods: {
			getList() {
				this.api({
					method: "post",
					url: "Vip/daili_list"
				}).then(res=> {
					// console.log(res);
					this.list = res.data.date;
				})
			},
			getVip() {
				uni.getStorage({
					key: "vip",
					success: ok=> {
						console.log(ok);
						this.vip = ok.data;
					},
					fail: err=> { //缓存中没有 请求接口 自己去看
						this.getUserInfo();
					},
					complete: done => {
						// console.log(done);
					}
				})
			},
			upgrate(item) {
				const up = item.id; //当前要升级的等级
				if(this.vip >= item.id) {
					uni.showModal({
						title: '提示',
						content: '您当前等级高于或等于此等级,请选择更高级别进行升级!',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {
							if(res.confirm) {
								// 
							}
						},
						fail: () => {},
						complete: () => {}
					});
					
				} else {
					this.api({
						method: "post",
						url: "Api/buyvip_up_userlevel",
						data: {
							vip_id: item.id
						}
					}).then(res=> {
						// console.log(res);
						uni.requestPayment({
						  timeStamp: res.data.date.timeStamp,
						  nonceStr: res.data.date.nonceStr,
						  package: res.data.date.package,
						  signType: res.data.date.signType,
						  paySign: res.data.date.paySign,
						  success: (ok)=> { 
							  console.log(ok);
							  if(ok.errMsg == 'requestPayment:ok') {
								  uni.showModal({
								  	title: '提示',
								  	content: '支付成功,等级已改变',
								  	showCancel: false,
								  	cancelText: '',
								  	confirmText: '确定',
								  	success: res => {
										if(res.confirm) { //加载 用户数据
											uni.setStorage({
												key: "vip",
												data: up,
												success: r=> {
													this.vip = up
												}
											})
										}
									},
								  	fail: () => {},
								  	complete: () => {}
								  });
							  }
						  },
						  fail: (err)=> { 
							  console.log(err);
						  }
						})
					})
				}
				// console.log(item);

			},
			getUserInfo() {
				this.api({
					method: "post",
					url: "User/user_info"
				}).then(res=> {
					this.vip = res.data.date.vip
					console.log(this.vip);
					uni.setStorage({
						key: "vip",
						data: res.data.date.vip
					})
				})
			},
		}
 	}
</script>

<style lang="scss">
.content {
	padding: 10rpx 0;
}	
.more-top {
	padding-top: 80rpx;
}
</style>
