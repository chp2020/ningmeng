<template>
	<view class="contents">
		<view class="cu-list menu">
			<view class="cu-item list">
				<view class="content">
					<view class="text-black text-lg">账户剩余金额：{{money}}元</view>
				</view>
			</view>
			<view class="cu-item list">
				<view class="text-red money">￥</view>
				<view class="content">
					<input type="number" placeholder="请输入提现金额" class="inupt_item" v-model="applyMoney" @input="getInput" />
				</view>
			</view>
			<view class="cu-item list2">
				<view class="content">
					<view class="text-sm text-gray">提现金额不能小于{{mix}}元,仅支持提现整数金额</view>
					<view class="text-bold draw">提现方式</view>
					<view class="img_item">
					<image src="../../../static/images/normal/yh_03.png" class="top_img"></image>
					<image src="../../../static/images/normal/guo_03.png" class="bottom"></image>
					</view>
				</view>
			</view>
			<view class="cu-item list">
				<view class="content">
					<checkbox-group class="content_item">
						<checkbox class="round checked orange"  :checked="agree"></checkbox>
						<view class="item1">我已阅读并同意<text class="text-red">《免责声明》</text></view>
					</checkbox-group>
					<button class="cu-btn block  margin-tb-sm lg btn" @click="apply()">提交申请</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				money: 0,
				agree: true,
				applyMoney: "", //提现申请金
				mix: "", //最低限制提现金额
			}
		},
		onShow() {
		},
		onLoad(e) {
			console.log(e);
			this.money = e.money - 0;
			this.mix = e.mix - 0;
		},
		methods: {
			getInput(e) {
				console.log(e.detail.value);
				console.log(typeof(this.money));
				if(e.detail.value > this.money) {
					uni.showToast({
						title: '不可超过您当前可提现金额!',
						duration: 2000,
						icon: 'none',
						success: r=> {
							this.applyMoney = this.money;
						}
						
					});
				}
			},
			apply() {
				console.log(this.applyMoney);
				if(this.applyMoney < this.mix) {
					uni.showToast({
						title: '提现金额不可小于' + this.mix + "元",
						icon: 'none',
						duration: 1000
					});
				} else {
					this.api({
						method: "post",
						url: "User/user_tixian",
						data: {
							money: this.applyMoney
						}
					}).then(res=> {
						console.log(res);
						if(res.data.code == 1) { //成功
							uni.showModal({
								title: '提示',
								content: '提现申请提交成功',
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
								success: res => {
									if(res.confirm) {
										uni.redirectTo({
											url: './wallet'
										})
									}
								},
								fail: () => {},
								complete: () => {}
							});
						}
					})
				}
			}
		}
	}
</script>

<style>
	@import "../../../colorui/main.css";
	@import "../../../colorui/icon.css";
	.img_item{
		width: 175upx;
		height: 80upx;
		border: 1upx solid #39B54A;
		margin-top: 20upx;
		position: relative;
	}
	
	.top_img{
		width: 175upx;
		height: 80upx;
	}
	.list{
		padding-top:30upx !important;
		padding-bottom: 30upx !important;
		border-top: 1upx solid #eee !important;
		
	}
	.list2{
		padding-bottom: 30upx !important;
		border-top: 1upx solid #eee !important;
	}
	.bottom{
		width: 38upx;
		height: 34upx;
		position: absolute;
		bottom: 0;
		right: 0;
	}
	.money{
		font-size: 55upx;
	}
	.inupt_item{
		 height: 100upx; 
		font-size: 36upx;
	}
	.draw{
		padding-top: 30upx;
	}
	.content_item{
		display: flex;
	}
	.item1{
		padding-left: 20upx;
	}
	.btn{
		margin-top: 100upx;
		background-image: linear-gradient(to right, #fc052a, #ff0577);
		color: #FFFFFF;
	}

</style>
