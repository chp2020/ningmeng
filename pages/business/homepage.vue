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
				<swiper-item v-for="(item,index) in info.slide_img" :key="index">
					<view class="swiper-item uni-bg-red">
						<image :src="imgUrl + item" style="width: 690rpx; height: 450rpx; border-radius: 12rpx;" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 点名 -->
			<view class="shop-name">{{ info.shop_name }}</view>
			<!-- 促销语 -->
			<view class="title">{{ info.sdesc }}</view>
			
			<!-- 标签 虚拟售出-->
			<view class="shop-box">
				<view class="left-bq-box">
					<view class="single-bq" v-for="(item,index) in info.keyword" :key="index">
						<image src="../../static/images/normal/bq.png" style="width: 36rpx; height: 36rpx;" mode=""></image>
						<text>{{ item }}</text>
					</view>
				</view>
				<view class="right-box">
					已售 <text>2310</text>
				</view>
			</view>
		</view>
		<!-- 灰色 -->
		<view class="grey-desc"></view>
		<!-- 店铺信息 -->
		<view class="line-two">
			<view class="name">{{ info.shop_name }}</view>
			<view class="phone">联系电话: {{ info.phone }}</view>
			<view class="locate">
				<!-- <view class="left-box"> -->
					<image src="../../static/images/normal/locate.png" mode=""></image>
					<view class="locate-num">{{ info.distance }}</view>
					<view>{{ info.address }}</view>
				<!-- </view> -->
			</view>
		</view>
		<!-- 灰色 -->
		<view class="grey-desc"></view>
		<!-- 团购 -->
		<view class="line-three">
			<view class="title">
				<view class="left-name">团购</view>
				<view class="right-bq">
					<view class="single-right-bq">
						<image src="../../static/images/normal/yes.png" mode=""></image>
						<view class="desc">随时退</view>
					</view>
					<view class="single-right-bq">
						<image src="../../static/images/normal/yes.png" mode=""></image>
						<view class="desc">过期退</view>
					</view>
				</view>
			</view>
			
			<view class="tuangou-box">
				<view class="single-tg" v-for="(single,index) in info.item" :key="index" @click="toSinglePage(single)">
					<view class="left-img">
						<image :src="imgUrl + single.img" style="" mode=""></image>
					</view>
					<view class="right-box">
						<view class="l-one">{{ single.title }}</view>
						<view class="l-two">
							<view class="left-s-box">
								<view class="cuxiao">￥{{ single.cprice }}</view>
								<view class="yuanjia">￥<text>{{ single.price }}</text> </view>
							</view>
							<view class="right-s-box">
								已售{{single.emptysales}}<uni-icons type="forward" color="#b7b7b7"></uni-icons>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {uniIcons},
		data() {
			return {
				imgUrl: "",
				id: "", //商家的id 拿来请求
				info: {}, //商家店面的信息
			}
		},
		onLoad(option){
			this.imgUrl = this.$store.state.imgUrl;
			console.log(option);
			this.api({
				method: "get",
				url: "Shop/shop_info",
				data: {
					id: option.id
				}
			}).then(res=> {
				console.log(res);
				res.data.date.keyword = res.data.date.keyword.split(",");
				this.info = res.data.date;
				this.info.distance = option.distance;
				this.info.shop_socre = option.shop_socre;
				console.log(this.info);
			})
		},
		methods: {
			toSinglePage(single) {
				console.log(single);
				uni.navigateTo({
					url: "./single_shop?id=" + single.id + "&distance=" + this.info.distance
				})
			}
		}
 	}
</script>

<style lang="scss">
.page {
	background-image: none;
	padding: 0 !important;
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
		font-size: 30rpx;
		padding: 20rpx 0;
		.left-bq-box {
			display: flex;
			justify-content: flex-start;
			.single-bq {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				font-size: 24rpx;
				margin-right: 14rpx;
				image {
					margin: 0 4rpx;
				}
			}
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
// 团购
.line-three {
	padding: 30rpx;
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left-name {
			color: #333333;
			font-size: 36rpx;
			font-weight: bold;
		}
		.right-bq {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.single-right-bq {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-right: 10rpx;
				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 4rpx;
				}
				.desc {
					color: #7c7c7c;
					font-size: 26rpx;
					padding-left: 0rpx;
				}
			}
		}
	}
	.tuangou-box {
		.single-tg {
			padding: 30rpx 0;
			display: flex;
			justify-content: flex-start;
			// align-items: center;
			.left-img {
				text-align: center;
				image{
					display: block;
					width: 120rpx;
					height: 120rpx;
					border-radius: 10rpx;
					margin: 0 20rpx 0 10rpx;
				}
			}
			.right-box {
				width: 100%;
				font-size: 32rpx;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				.l-one {
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					letter-spacing: 2rpx;
				}
				.l-two {
					width: 100%;
					display: flex;
					justify-content: space-between;
					.left-s-box {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.cuxiao {
							font-size: 38rpx;
							color: #ff5d26;
						}
						.yuanjia {
							padding-left: 10rpx;
							color: #7a7a7a;
							font-size: 24rpx;
							text {
								text-decoration: line-through;
							}
						}
					}
					.right-s-box {
						color: #7a7a7a;
						font-size: 24rpx;
						position: relative;
						bottom: 10rpx;
					}
				}
			}
		}
	}
}
</style>
