<template>
	<view class="page">
		<view class="line-one">
			<!-- 轮播 -->
			<swiper 
			style="height: 450rpx; width: 690rpx; margin-top: 10rpx;"
			class="swiper" 
			:indicator-dots="false" 
			:autoplay="true" 
			:interval="5000" 
			:duration="500">
				<swiper-item v-for="(item,index) in shopInfo.info_img" :key="index">
					<view class="swiper-item uni-bg-red">
						<image :src="imgUrl + item" style="width: 690rpx; height: 450rpx; border-radius: 12rpx;" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 点名 -->
			<view class="shop-name">{{ shopInfo.title }}</view>
			<!-- 促销语 -->
			<view class="title">{{ shopInfo.sdesc }}</view>
			
			<!-- 标签 虚拟售出-->
			<view class="shop-box">
				<view class="left-bq-box">
					使用时间: 2019.08.01-2019.12.31
				</view>
				<view class="right-box">
					已售 <text>{{ shopInfo.emptysales }}</text>
				</view>
			</view>
		</view>
		<!-- 灰色 -->
		<view class="grey-desc"></view>
		<!-- 店铺信息 -->
		<view class="line-two">
			<view class="name">{{ shopInfo.shop_name }}</view>
			<view class="phone">联系电话: {{ shopInfo.phone }}</view>
			<view class="locate">
				<!-- <view class="left-box"> -->
					<image src="../../static/images/normal/locate.png" mode=""></image>
					<view class="locate-num">{{ shopInfo.distance }}</view>
					<view>{{ shopInfo.address }}</view>
				<!-- </view> -->
			</view>
		</view>
		<!-- 灰色 -->
		<view class="grey-desc"></view>
		
		<!-- 详情内容 -->
		<view class="line-three">
			<view class="title">详情内容</view>
			<!-- <view class="content">{{ shopInfo.userule}}</view> -->
			<view class="content">
				1. 详情内容详情内容详情内容详情内容<br>
				2. 详情内容详情内容详情内容详情内容
			</view>
		</view>
		
		<!-- 灰色 -->
		<view class="grey-desc"></view>
		
		<!-- 详情内容 -->
		<view class="line-three">
			<view class="title">使用规则</view>
			<!-- <view class="content">{{ shopInfo.userule}}</view> -->
			<view class="content">
				1. 通知：APP、短信、微信（微信号：dpchwl）通知，不参加请回复拒绝，超时无效；未回复超时回复视参与活动； <br>
				2. 发奖：名单公布后3个工作日内会通过app+短信+微信发放中奖凭证即电子券；一旦遗失概不补发； <br>
				3. 预约：收到电子券后，按照活动页面规则提前预约（请勿 在收到电子券前私自联系商户）； 
			</view>
		</view>
		
		<!-- 灰色 -->
		<view class="grey-desc"></view>
		
		<!-- 详情内容 -->
		<view class="line-three">
			<view class="title">购买须知</view>
			<!-- <view class="content">{{ shopInfo.userule}}</view> -->
			<view class="content">
				1. 不与其他优惠活动同享 不找零、不兑现、不叠加、不开票、限到店使用<br>
				2. 此券仅本人使用，不可转送亲朋好友<br>
				3. 全天可用，不限节假日和周末 
			</view>
		</view>
		
		<!-- 底部按钮 -->
		<view class="line-four">
			<view class="jiage">
				<view class="cprice">￥ <text>{{ shopInfo.cprice }}</text></view>
				<view class="price">市场价:￥{{ shopInfo.price }}</view>
			</view>
			<view class="btn" @click="buy()">立即抢购</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: "",
				shopInfo: {}, //商品详情信息
			}
		},
		onLoad(option){
			this.imgUrl = this.$store.state.imgUrl;
			this.api({
				method: "get",
				url: "item/info",
				data: {
					id: option.id
				}
			}).then(res=> {
				console.log(res);
				this.shopInfo = res.data.date;
				this.shopInfo.distance = option.distance;
			})
		},
		methods: {
			buy() {
				this.api({
					method: "get",
					url: "Api/add_order",
					data: {
						itemid: this.shopInfo.id,
						shop_id: this.shopInfo.shop_id
					}
				}).then(res=> {
					console.log(res);
					// wx.requestPayment()
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
								content: '购买成功',
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
								success: res => {
									uni.switchTab({
										url: '../userTab/home'
									})
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
		}
 	}
</script>

<style lang="scss">
.page {
	background-image: none;
	padding: 0 !important;
	margin-bottom: 300rpx;
}
.line-one {
	padding: 0 30rpx;
	.shop-name {
		width: 100%;
		line-height: 36rpx;
		height: 36rpx;
		font-size: 36rpx;
		color: #333333;
		padding: 20rpx 0 0 0;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		margin-bottom: 20rpx;
	}
	.title {
		font-size: 30rpx;
		line-height: 30rpx;
		color: #666666;
		padding: 20rpx 50rpx 0rpx 0;
		margin-bottom: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.shop-box {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 26rpx;
		padding: 20rpx 0;
		.left-bq-box {
			display: flex;
			justify-content: flex-start;
			color: #ff7c01;
		}
		.right-box {
			position: absolute;
			right: 30rpx;
			color: #666666;
			text {
				color: #fc052b;
			}
		}
	}
}
.grey-desc {
	width: 100%;
	height: 20rpx;
	background-color: #f5f5f5;
}
.line-two {
	padding: 30rpx;
	.name {
		color: #333333;
		font-size: 36rpx;
		font-weight: bold;
		// padding-bottom: 20rpx;
	}
	.phone {
		font-size: 26rpx;
		padding: 20rpx 0;
	}
	.locate {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #999999;
		font-size: 26rpx;
		image {
			width: 30rpx;
			height: 30rpx;
		}
		.locate-num {
			padding: 0 10rpx;
		}
	}
}
.line-three {
	padding: 30rpx;
	.title {
		color: #333333;
		font-size: 36rpx;
		font-weight: bold;
		padding-bottom: 20rpx;
	}
	.content {
		font-size: 26rpx;
		color: #999999;
		line-height: 32rpx;
		
	}
}
.line-four {
	width: calc(100% - 60rpx);
	padding: 20rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid #e0e0e0;
	position: fixed;
	bottom: 0;
	background-color: #FFFFFF;
	.jiage {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.cprice {
			font-weight: bold;
			color: #fd0b30;
			font-size: 28rpx;
			padding-right: 4rpx;
			text {
				font-size: 50rpx;
			}
		}
		.price {
			text-decoration: line-through;
			color: #999999;
			font-size: 22rpx;
			position: relative;
			top: 6rpx;
		}
	}
	.btn {
		background-image: linear-gradient(#ff797b, #fd0a2f);
		border-radius: 30rpx;
		padding: 10rpx 40rpx;
		color: #FFFFFF;
		font-size: 32rpx;
	}
}
</style>
