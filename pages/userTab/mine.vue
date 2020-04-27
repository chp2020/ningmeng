<template>
	<view class="page">
		<block v-if="!login">
			<!-- <view class="login-box"> -->
			<view class="login-top">
				<view class="img">
					<image src="../../static/images/tab/mine.png" mode=""></image>
				</view>
				<view class="one">用户未登录</view>
				<view class="two">用户未登录可能无法正常体验</view>
			</view>
			<!-- <view class="login-btn" @click="loginwx()">微信直接登录</view> -->
			<button class="login-btn" type="default" open-type="getUserInfo" @getuserinfo="getInfo" withCredentials="true">登录</button>
			<!-- <button type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button> -->
			<!-- </view> -->
		</block>
		<block v-else>
			<!-- 用户信息 -->
			<view class="line-one">
				<view class="box-1">
					<view class="left-box">
						<image :src="userInfo.headpath" mode=""></image>
					</view>
					<view class="mid-box">
						<view class="user-id">
							{{userInfo.nickname}}
							<!-- <text class="level" v-if="userInfo.vip == 0"></text> -->
							<text class="level" v-if="userInfo.vip == 1">A级</text>
							<text class="level" v-if="userInfo.vip == 2">B级</text>
							<text class="level" v-if="userInfo.vip == 3">C级</text>
							<text class="level" v-if="userInfo.vip == 4">D级</text>
							</view>
						<view class="time">ID: {{userInfo.idnumber}}</view>
					</view>
				</view>
				<view class="right-box"> 
					<image src="../../static/images/linshi/logout.png" @click="logout()"></image>
				</view>
			</view>
			
			<!-- 订单 -->
			<view class="line-two">
				<view class="left">我的订单</view>
				<view class="right">
					全部订单<uni-icons type="arrowright" color="#acacac" style="position: relative; top: 2rpx;" size="17"></uni-icons>
				</view>		
			</view>
			
			<view class="line-three">
				<view class="order-status">
					<view class="top-area">
						<image src="../../static/images/normal/q1.png" mode=""></image>
						<view class="amount">{{userInfo.waite_pay}}</view>
					</view>
					<view class="title">待付款</view>
				</view>
				<view class="order-status">
					<view class="top-area">
						<image src="../../static/images/normal/q2.png" mode=""></image>
						<view class="amount">{{userInfo.succe_pay}}</view>
					</view>
					<view class="title">待发货</view>
				</view>
				<view class="order-status">
					<view class="top-area">
						<image src="../../static/images/normal/q3.png" mode=""></image>
						<view class="amount">{{userInfo.receivi}}</view>
					</view>
					<view class="title">待收货</view>
				</view>
				<view class="order-status">
					<view class="top-area" style="left: 40rpx;">
						<image src="../../static/images/normal/q4.png" mode=""></image>
						<view class="amount">{{userInfo.tuikuan}}</view>
					</view>
					<view class="title">退款 / 售后</view>
				</view>
			</view>
			
			<view class="line-four">
				<image :src="banImg" style="width: 100%;" mode="widthFix"></image>
			</view>
			
			<view class="line-five">
				<view class="title">我的服务</view>
			</view>
			<!-- 菜单adcb -->
			<view class="line-six">
				<view class="menu" @click="toPage('../userFunction/wallet/wallet')">
					<view class="left">
						<image src="../../static/images/linshi/a.png" mode=""></image>
						<view class="title">我的钱包</view>
					</view>
					<view class="right">
						<uni-icons type="arrowright" color="#acacac" size="22"></uni-icons>
					</view>
				</view>
				<view class="menu" @click="toPage('../userFunction/share/share')">
					<view class="left">
						<image src="../../static/images/linshi/d.png" mode=""></image>
						<view class="title">分享赚钱</view>
					</view>
					<view class="right">
						<uni-icons type="arrowright" color="#acacac" size="22"></uni-icons>
					</view>
				</view>
				<view class="menu">
					<view class="left">
						<image src="../../static/images/linshi/c.png" mode=""></image>
						<view class="title">实名认证</view>
					</view>
					<view class="right">
						<uni-icons type="arrowright" color="#acacac" size="22"></uni-icons>
					</view>
				</view>
				<view class="menu" @click="toPage('../userFunction/wallet/bind_card')">
					<view class="left">
						<image src="../../static/images/linshi/e.png" mode=""></image>
						<view class="title">我的银行卡</view>
					</view>
					<view class="right">
						<uni-icons type="arrowright" color="#acacac" size="22"></uni-icons>
					</view>
				</view>
				<view class="desc"></view>
				<view class="menu">
					<view class="left">
						<image src="../../static/images/linshi/b.png" mode=""></image>
						<view class="title">联系客服</view>
					</view>
					<view class="right">
						<uni-icons type="arrowright" color="#acacac" size="22"></uni-icons>
					</view>
				</view>
				<view class="desc"></view>
			</view>
		</block>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {uniIcons},
		data() {
			return {
				login: false,
				userInfo: {},
				banImg: "", //海报图
			}
		},
		onShow() {
			uni.getStorage({
				key: "user",
				success: ok => {
					this.login = true;
					this.getUserInfo();
				},
				fail: err => {
					this.login = false;
				}
			})
		},
		onLoad(){
			this.getBanner();
		},
		methods: {
			getBanner() {
				this.api({
					method: "get",
					url: "User/poster"
				}).then(res=> {
					console.log(res);
					this.banImg = res.data.data;
				})
			},
			getUserInfo() {
				this.api({
					method: "post",
					url: "User/user_info"
				}).then(res=> {
					// console.log(res);
					this.userInfo = res.data.date;
					uni.setStorage({
						key: "vip",
						data: res.data.date.vip
					})
				})
			},
			getInfo(e) {
				const userInfo = e.detail.userInfo;
				const nickName = userInfo.nickName;
				const avatarUrl = userInfo.avatarUrl;
				// const a = JSON.stringify(userInfo);
				uni.login({
					provider: 'weixin',
					success:  (loginRes)=> {
					  // console.log(loginRes);
					  const code = loginRes.code;
					  this.api({
						 method: "get",
						 url: "Index/register",
						 data: {
							 code: code,
							 nickName: nickName,
							 avatarUrl: avatarUrl
						 }
					  }).then(res=> {
						  // console.log(res);
						  const user = res.data.date;
						  uni.setStorage({
						  	key: "user",
							data: user,
							success: r=> {
								this.getUserInfo();
								uni.showToast({
									title: '授权登录成功',
									duration:1000,
									icon: 'success'
								})
								setTimeout(()=> {
									this.login = true; //登录成功
								},1000)
							}
						  })
						  // uni.setStorageSync('user', user);
						  // this.getUserInfo();
					  })
					}
					
				})
			},
			logout() {
				uni.removeStorage({
					key: "user",
					success: res=> {
						this.login = false;
					}
				})
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
 	}
</script>

<style lang="scss">
.page {
	padding: 0 !important;
	background-image: none;
}
.line-one {
	padding: 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 10rpx;
	.box-1 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.left-box {
			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 100%;
				border: 1px solid #f5f5f5;
				margin: 0 30rpx 0 10rpx;
			}
		}
		.mid-box {
			.user-id {
				font-size: 26rpx;
				padding-bottom: 10rpx;
				.level {
					padding: 6rpx 10rpx;
					border-radius: 14rpx;
					color: #FFFFFF;
					background-image: linear-gradient(to right, #ff7c01, #ff5118);
					margin: 0 10rpx;
				}
			}
			.time {
				font-size: 22rpx;
				color: #9a9a9a;
			}
		}
	}
	.right-box {
		image {
			width: 136rpx;
			height: 52rpx;
			position: absolute;
			right: 0;
			margin-top: -20rpx;
		}
	}
}
.line-two {
	padding: 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;		
	font-size: 30rpx;
	.left {
		font-weight: bold;
	}
	.right {
		color: #acacac;
	}
}
.line-three {
	display: flex;
	justify-content: space-around;
	padding: 20rpx 30rpx;
	.order-status {
		text-align: center;
		.top-area {
			display: flex;
			position: relative;
			left: 22rpx;
			.amount {
				font-size: 22rpx;
				position: relative;
				bottom: 20rpx;
			}
		}
		image {
			width: 40rpx;
			height: 40rpx;
			margin: 6rpx 0;
		}
		.title {
			font-size: 26rpx;
			color: #313131;
		}
	}
}
.line-five {
	font-size: 30rpx;
	padding: 30rpx;
	.title {
		font-weight: bold;
	}
}
.line-six {
	color: #4f4f4f;
	font-size: 24rpx;
	.menu {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 30rpx;
		.left {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			image {
				width: 40rpx;
				height: 40rpx;
				margin: 0 20rpx 0 16rpx;
			}
			.title {
				
			}
		}
		.right {
			
		}
	}
}
.desc {
	height: 20rpx;
	background-color: #f3f3f3;
}
.login-top {
	width: 90%;
	margin: 0 auto;
	background-color: #FFFFFF;
	box-shadow: 2rpx 2rpx 10rpx 0 #e9e9e9;
	margin-top: 150rpx;
	border-radius: 16rpx;
	text-align: center;
	font-size: 32rpx;
	.img {
		width: 100%;
		padding-top: 20rpx;
		image {
			width: 40rpx;
			height: 40rpx;
		}
	}
	.one {
		font-weight: bold;
		padding: 20rpx 0 10rpx 0;
	}
	.two {
		color: #333333;
		padding-bottom: 20rpx;
	}
}

.login-btn {
	width: 90%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	background-image: linear-gradient(to right, #fc052a, #ff0577);
	margin: 0 auto;
	margin-top: 40rpx;
	border-radius: 16rpx;
	color: #FFFFFF !important;
}
.line-four {
	padding: 30rpx;
}

</style>
