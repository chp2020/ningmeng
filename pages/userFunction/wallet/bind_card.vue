<template>
	<view class="page">
		<view class="input-area">
			<view class="left-name">所属银行</view>
				<input type="text" value="" placeholder="请输入卡片所属银行" v-model="form.back_ad" />
		</view>
		<view class="input-area">
			<view class="left-name">开户人姓名</view>
				<input type="text" value="" placeholder="请输入开户人名字" v-model="form.back_name"/>
		</view>
		<view class="input-area">
			<view class="left-name">银行卡号</view>
				<input type="number" value="" placeholder="请输入银行卡号" v-model="form.back_id"/>
		</view>
		
		<view class="btn-area">
			<button type="primary" @click="bind()">绑定银行卡</button>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				form: {
					back_ad: "", //所属银行
					back_name: "", //开户人
					back_id: "" //银行卡号
				}
			}
		},
		onLoad() {
			this.getWalletInfo();
		},
		methods: {
			getWalletInfo() {
				this.api({
					method: "post",
					url: "User/index"
				}).then(res=> {
					console.log(res);
					this.form.back_ad = res.data.date.back_ad;
					this.form.back_name = res.data.date.back_name;
					this.form.back_id = res.data.date.back_id;
				})
			},
			bind() {
				console.log(this.form);
				if(this.form.back_ad == "") {
					uni.showToast({
						title: "请输入所属银行信息",
						duration: 1000,
						icon: 'none'
					})
				} else if(this.form.back_name == "") {
					uni.showToast({
						title: "请输入银行卡开户人姓名",
						duration: 1000,
						icon: 'none'
					})
				} else if(this.form.back_id == "") {
					uni.showToast({
						title: "请输入银行卡卡号",
						duration: 1000,
						icon: 'none'
					})
				} else {
					this.api({
						method: "POST",
						url: "User/tixian_edit",
						data: this.form
					}).then(res=> {
						console.log(res);
						if(res.data.code == 1 && res.data.msg == '修改成功') {
							uni.showModal({
								title: '提示',
								content: '账号添加/修改成功',
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
								success: res => {
									if(res.confirm) {
										uni.switchTab({
											url: '../../userTab/mine'
										})
									}
								},
								fail: () => {},
								complete: () => {}
							});
						} else if (res.data.code == 2){
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								icon: 'none'
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.page {
	background-image: none;
	padding: 0 !important;
	margin-top: 40rpx;
}
.input-area {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	border-bottom: 1px solid #F5F5F5;
	padding: 30rpx 30rpx;
	font-size: 24rpx;
	align-items: center;
	.left-name {
		width: 25%;
		font-weight: bold;
	}
	input {
		display: block;
		width: 70%;
	}
}
.btn-area {
	margin-top: 80rpx;
	button {
		width: 80%;
		margin: 0 auto;
		background-image: linear-gradient(to right, #fc052a, #ff0577);
		font-size: 24rpx;
	}
}

</style>
