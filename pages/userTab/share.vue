<template>
	<view class="page">
		<!-- 顶部海报背景 -->
		<view class="line-one">
			<image src="../../static/images/linshi/share-bg.png" style="width: 100%;" mode="widthFix"></image>
		</view>
		<!-- 用户信息 -->
		<view class="line-two">
			<view class="box-1">
				<view class="left-box">
					<image :src="topInfo.avater" mode=""></image>
				</view>
				<view class="mid-box">
					<view class="user-id">{{ topInfo.idnumber }}</view>
					<view class="time">{{ topInfo.pay_time }}</view>
				</view>
			</view>
			<view class="right-box"> 
				<view class="btn">正在奖励</view>
			</view>
		</view>
		<!-- 奖励情况 -->
		<view class="line-three">
			<view class="single-reward">
				<view class="number">￥{{ topInfo.fenrun.dai_money }}</view>
				<view class="title">待奖励</view>
			</view>
			<view class="single-reward">
				<view class="number">￥{{ topInfo.fenrun.day_money }}</view>
				<view class="title">今日奖励</view>
			</view>
			<view class="single-reward">
				<view class="number">￥{{ topInfo.fenrun.yi_money }}</view>
				<view class="title">累积奖励</view>
			</view>
		</view>
		
		<!-- 所有排队情况 -->
		<view class="line-four">
			<view class="title">所有排队情况:</view>
			<view class="single-box" v-for="(item,index) in list" :key="index">
				<view class="box-1">
					<view class="left-box">
						<image :src="item.avater" mode=""></image>
					</view>
					<view class="mid-box">
						<view class="user-id">{{item.idnumber}}</view>
						<view class="time">{{item.pay_time}}</view>
					</view>
				</view>
				<view class="right-box"> 
					<view class="reward-number">已奖励 {{item.money}}</view>
					<view class="sort">NO.{{item.ranking+1}}</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topInfo: {},
				list: [],
				page: 1
			}
		},
		onLoad(){
			this.api({
				method: "get",
				url: "Order/order_bonus_info",
				data: {
					page: 1
				}
			}).then(res=> {
				console.log(res);
				this.topInfo = res.data.date.one_bonus_info;
				this.list = res.data.date.list;
			})
		},
		onShow() {

		},
		onReachBottom() {
			this.init()
		},
		methods: {
			init() {
				this.page++;
				this.api({
					method: "get",
					url: "Order/order_bonus_info",
					data: {
						page: this.page
					}
				}).then(res=> {
					console.log(res);
					res.data.date.list.forEach(item=> {
						this.list.push(item)
					})
				})
			}
		}
 	}
</script>

<style lang="scss">
.page {
	padding: 0 !important;
}
.line-two {
	padding: 0 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #e0e0e0;
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
			}
			.time {
				font-size: 22rpx;
				color: #9a9a9a;
			}
		}
	}
	.right-box {
		text-align: right;
		.btn {
			padding: 14rpx 26rpx;
			border-radius: 80rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			background-image: linear-gradient(to right, #fc052a, #ff0577);
			position: relative;
		}
	}
}
.line-three {
	display: flex;
	justify-content: space-around;
	font-size: 28rpx;
	align-items: center;
	padding: 20rpx 40rpx;
	.single-reward {
		text-align: center;
		.number {
			color: #fd052a;
			padding-bottom: 10rpx;
		}
		.title {
			color: #9a9a9a;
		}
	}
}
.line-four {
	.title {
		background-color: #f4f4f4;
		line-height: 80rpx;
		font-size: 30rpx;
		color: #8c8c8c;
		padding: 0 30rpx;
	}
	.single-box {
		font-size: 26rpx;
		display: flex;
		padding: 18rpx 24rpx;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #d7d7d7;
		.box-1 {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.left-box {
				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 100%;
					margin: 0 30rpx 0 10rpx;
				}
			}
			.mid-box {
				.user-id {
					font-size: 26rpx;
					padding-bottom: 10rpx;
				}
				.time {
					font-size: 22rpx;
					color: #9a9a9a;
				}
			}
		}
		.right-box {
			.reward-number {
				color: #ff7c01;
			}
			.sort {
				text-align: right;
				padding-top: 20rpx;
			}
		}
	}
}

</style>
