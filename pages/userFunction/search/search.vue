<template>
	<view class="page">
		<!-- 搜索 -->
		<view class="line-one">
			<view class="left">
				<uni-icons type="search" color="#fe577b" class="search-icon"></uni-icons>
				<input type="text" value="" placeholder="全城热搜: igc商场" v-model="searchContent"  auto-focus="autofocus"/>
			</view>
			<view class="right">
				<button class="cu-btn ztbg crfff shadow-blur round" @click="ss()">搜索</button>
			</view>
		</view>
		
		
		<!-- 商品区域 -->
		<view class="shop-box">
			<view class="single-shop" v-for="(item,index) in list" :key="index" @click="toHomepage(item)">
				<view class="left-box">
					<image :src="imgUrl + item.logo" mode=""></image>
				</view>
				<view class="right-box">
					<view class="l-one">{{item.shop_name}}</view>
					<view class="l-two">
						<view class="star-box" v-if="item.shop_socre == 1">
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<view class="score">1分</view>
						</view>
						<view class="star-box" v-if="item.shop_socre == 2">
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<view class="score">2分</view>
						</view>
						<view class="star-box" v-if="item.shop_socre == 3">
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<view class="score">3分</view>
						</view>
						<view class="star-box" v-if="item.shop_socre == 4">
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<view class="score">4分</view>
						</view>
						<view class="star-box" v-if="item.shop_socre == 5">
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<uni-icons type="star-filled" color="#f79530" size="15"></uni-icons>
							<view class="score">5分</view>
						</view>
						<view class="category-box">
							珠江新城 | 美发
						</view>
					</view>
					<view class="l-three" v-if="item.goods.length >= 1">
						<view class="left">{{item.goods[0].price}}元</view>
						<view class="mid">[{{item.goods[0].gname}}]</view>
						<view class="right">已售{{item.goods[0].emptysales}}</view>
					</view>
					<view class="l-four" v-if="item.goods.length >= 2">
						<view class="left">{{item.goods[1].price}}元</view>
						<view class="mid">[{{item.goods[1].gname}}]</view>
						<view class="right">已售{{item.goods[1].emptysales}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: "",
				searchContent: "", //搜索内容
				long: "",
				lat: "",
				list: [], //搜索结果
			}
		},
		onLoad() {
			this.imgUrl = this.$store.state.imgUrl;
			uni.getStorage({
				key: "long",
				success: r=> {
					this.long = r.data;
					uni.getStorage({
						key: "lat",
						success: res=> {
							this.lat = res.data;
						}
					})
				}
			})
		},
		methods: {
			ss() {
				if(this.searchContent == "") {
					uni.showToast({
						title: '请输入搜索内容',
						duration: 1000,
						icon: 'none'
					});
				} else {
					this.api({
						method: "post",
						url: "Category/search_shop",
						data: {
							longitude: this.long,
							latitude: this.lat,
							page: 1,
							name: this.searchContent
						}
					}).then(res=> {
						console.log(res);
						if(res.data.date.length == 0) {
							this.list = [];
							// console.log('meishi');
						} else {
							this.list = res.data.date;
						}
					})
				}
			},
			toHomepage(item) {
				console.log('点击商家，信息为：');
				console.log(item);
				uni.navigateTo({
					url: '../../business/homepage?id=' + item.shop_id + "&distance=" + item.distance + "&shop_socre=" + item.shop_socre
				})
			}
		}
	}
</script>

<style lang="scss">
@import '../../../colorui/main.css';
@import '../../../colorui/icon.css';
.page {
	background-image: none;
	padding-top: 40rpx;
}
.line-one {
	display: flex;
	justify-content: space-between;
	height: 60rpx;
	align-items: center;
	.left {
		align-items: center;
		padding: 8rpx 0;
		background-color: #F5F5F5;
		border-radius: 50rpx;
		width: 80%;
		display: flex;
		justify-content: flex-start;
		.search-icon {
			margin: 0 20rpx;
		}
	}
	.right {
		button {
			color: #FFFFFF;
			background-color: #fe577b;
		}
	}
}
.shop-box {
	.single-shop {
		background-color: #FFFFFF;
		display: flex;
		// height: 210rpx;
		padding: 20rpx;
		margin-top: 60rpx;
		box-shadow: 0rpx 0rpx 20rpx 0 #e9e9e9;
		.left-box {
			width: 182rpx;
			text-align: center;
			image {
				border-radius: 10rpx;
				width: 150rpx;
				height: 150rpx;
				margin-top: 20rpx;
				z-index: 0;
			}
		}
		.right-box {
			width: 468rpx;
			.l-one{
				font-size: 30rpx;
				padding: 10rpx 0;
			}
			.l-two{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.star-box {
					display: flex;
					align-items: center;
					padding: 10rpx 0 20rpx 0;
					.score {
						font-size: 24rpx;
						color: #f79530;
						padding: 0 10rpx;
					}
				}
				.category-box {
					font-size: 24rpx;
					color: #5e5e5e;
				}
			}
			.l-three, .l-four{
				display: flex;
				justify-content: flex-start;
				font-size: 24rpx;
				width: 100%;
				padding: 2rpx 0;
				.left {
					color: #f79530;
				}
				.mid {
					height: 30rpx;
					max-width: 280rpx;
					padding: 0 6rpx;
					  overflow: hidden;
					  text-overflow: ellipsis;
					  display: -webkit-box;
					  -webkit-line-clamp: 1;
					  -webkit-box-orient: vertical;
				}
				.right {
					text-align: right;
					position: absolute;
					right: 50rpx;
					color: #8c8c8c;
				}
			}
			.l-four{}
		}
	}
}
</style>
