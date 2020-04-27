<template>
	<view class="page">
		<view class="line-one">
			<view class="flex-box">分类 <uni-icons type="arrowdown" color="#bdbdbd" size="12"></uni-icons></view>
			<view class="flex-box">价格 <uni-icons type="arrowdown" color="#bdbdbd" size="12"></uni-icons></view>
			<view class="flex-box">距离优先</view>
		</view>
		
		<!-- 列表 -->
		<view class="line-two">
			<view class="single">
				<view class="left-box">
					<image src="../../static/images/linshi/1.jpg" mode=""></image>
				</view>
				<view class="right-box">
					<view class="l-one">[商品名称]商品名称商品名称商品名称商品名称</view>
					<view class="l-two">>1.6km</view>
					<view class="l-three">
						<view class="name">商户名称</view>
						<view class="price-btn">$999</view>
					</view>
				</view>
			</view>
			<view class="single">
				<view class="left-box">
					<image src="../../static/images/linshi/1.jpg" mode=""></image>
				</view>
				<view class="right-box">
					<view class="l-one">[商品名称]商品名称商品名称商品名称商品名称</view>
					<view class="l-two">>1.6km</view>
					<view class="l-three">
						<view class="name">商户名称</view>
						<view class="price-btn">￥999</view>
					</view>
				</view>
			</view>
			<view class="single">
				<view class="left-box">
					<image src="../../static/images/linshi/1.jpg" mode=""></image>
				</view>
				<view class="right-box">
					<view class="l-one">[商品名称]商品名称商品名称商品名称商品名称</view>
					<view class="l-two">>1.6km</view>
					<view class="l-three">
						<view class="name">商户名称</view>
						<view class="price-btn">$999</view>
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
				
			}
		},
		onLoad(){},
		methods: {
		}
 	}
</script>

<style lang="scss">
.page {
	// height: 410rpx;
}
.line-one {
	color: #333333;
	padding-top: 410rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding-bottom: 30rpx;
	.flex-box {
		display: flex;
		align-items: center;
		font-size: 30rpx;
	}
}
.line-two {
	font-size: 30rpx;
	.single {
		padding: 20rpx 0;
		display: flex;
		justify-content: space-between;
		border-top: 1px solid #e5e5e5;
		.left-box {
			image {
				width: 260rpx;
				height: 170rpx;
				margin: 0 20rpx;
				
			}
		}
		.right-box {
			.l-one {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.l-two {
				text-align: right;
				font-size: 20rpx;
				color: #707070;
			}
			.l-three {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 10rpx;
				.name {
					font-size: 20rpx;
					color: #707070;
				}
				.price-btn {
					color: #FFFFFF;
					padding: 4rpx 20rpx;
					border-radius: 12rpx;
					background-image: linear-gradient(#ff7d7d, #ff4f4f);
				}
			}
			
		}
	}
}
</style>
