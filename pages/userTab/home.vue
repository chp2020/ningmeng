<template>
	<view class="page">
		<view class="tab-bg"></view>
		<!-- 定位 - 客服 -->
		<view class="line-one">
			<view class="location-box">
				{{ locationArea }}
				<uni-icons type="arrowright" color="#ffffff"></uni-icons>
			</view>
			<view class="right-info">
				<uni-icons type="chat" color="#ffffff" size="22"></uni-icons>
				<uni-icons type="scan" color="#ffffff" style="margin: 0 20rpx;" size="22"></uni-icons>
			</view>
		</view>
		<!-- 搜索 -->
		<view class="line-two" @click="toPage('../userFunction/search/search')">
			<uni-icons type="search" color="#fe577b" class="search-icon"></uni-icons>
			<input type="text" value="" placeholder="全城热搜: igc商场" />
		</view>
		<!-- 轮播 -->
		<swiper 
		style="height: 180rpx; width: 690rpx; margin-top: 40rpx;"
		class="swiper" 
		:indicator-dots="false" 
		:autoplay="true" 
		:interval="5000" 
		:duration="500">
			<swiper-item v-for="(item, index) in ban1List" :key="index">
				<view class="swiper-item uni-bg-red">
					<image :src="imgUrl + item.img" style="width: 690rpx; height: 150rpx; border-radius: 12rpx;" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 四个入口 -->
		<view class="line-three">
			<view class="single-ad" v-for="(item, index) in topList" :key="index">
				<view class="left-box">
					<view class="big">{{item.title}}</view>
					<view class="sm">{{item.desc}}</view>
				</view>
				<view class="right-box">
					<image :src="imgUrl + item.img" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 轮播 -->
		<swiper 
		style="height: 280rpx; width: 690rpx; margin-top: 40rpx;"
		class="swiper" 
		:indicator-dots="false" 
		:autoplay="true" 
		:interval="5000" 
		:duration="500">
			<swiper-item @click="toPage('../business/screen')" v-for="(item, index) in ban2List" :key="index">
				<view class="swiper-item uni-bg-red">
					<image :src="imgUrl + item.img" style="width: 690rpx; height: 260rpx;" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		
		<!-- 分类商品 - 横向可拉动、可顶吸导航栏 -->
		<glanceSlideNavTabBar
		style="z-index: 999;"
		underlineheight="4rpx"
		underlinewidth="100%"
		underlinecolor="#fd1b49"
		textcolor="#000000"
		activetextcolor="#fd1b49"
		fontsize="24rpx"
		topfixedval='0px' 
		:topfixed=true 
		@clickitem="clickitem" 
		:data = "businessList">
		</glanceSlideNavTabBar>
		
		<!-- 商品区域 -->
		<view class="shop-box">
			<view class="single-shop" v-for="(item,index) in dian" :key="index" @click="toHomepage(item)">
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
						<view class="mid">[{{item.goods[0].title}}]</view>
						<view class="right">已售{{item.goods[0].emptysales}}</view>
					</view>
					<view class="l-four" v-if="item.goods.length >= 2">
						<view class="left">{{item.goods[1].price}}元</view>
						<view class="mid">[{{item.goods[1].title}}]</view>
						<view class="right">已售{{item.goods[1].emptysales}}</view>
					</view>
				</view>
			</view>
			<!-- <view class="single-shop">
				<view class="left-box">
					<image src="../../static/images/linshi/2.jpg" mode=""></image>
				</view>
				<view class="right-box">
					<view class="l-one">商户名称(珠江新城店)</view>
					<view class="l-two">
						<view class="star-box">
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
					<view class="l-three">
						<view class="left">71元</view>
						<view class="mid">[剪发]单人资深发型师tony在线为您打call</view>
						<view class="right">已售9995</view>
					</view>
					<view class="l-four">
						<view class="left">40.5元/次</view>
						<view class="mid">[洗吹]3次单人洗头溪水溪水溪水</view>
						<view class="right">已售975</view>
					</view>
				</view>
			</view> -->
		</view>
		
		<view class="no-more">
			没有更多数据了哦
		</view>
		
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import glanceSlideNavTabBar from '@/wxcomponents/glance-SlideNavTabBar/glance-SlideNavTabBar.vue'
	export default {
		components: {uniIcons, glanceSlideNavTabBar},
		data() {
			return {
				imgUrl: "",
				longitude: "", //经度
				latitude: "",
				locationArea: "", //定位区域  广州市-海珠区
				city: "",
				area: "",
				ban1List: [],
				ban2List: [],
				businessList: [], //商家分类
				topList: [], //顶部 四个入口
				initForm: {
					cate_id: "",
					lng: "",
					lat: ""
				}, //
				dian: [], //分类下的店
				
			}
		},
		onLoad() {
			this.imgUrl = this.$store.state.imgUrl;
			uni.setStorageSync('pageCur', 0);
			this.getLocation();
			this.getTopClass();
			this.getFirstBanner();
			this.getSecondBanner();
		},
		methods: {
			getLocation() {
				uni.getLocation({
				    type: 'wgs84',
				    success:  (res)=> {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						uni.setStorageSync('long', res.longitude);
						uni.setStorageSync('lat', res.latitude);
						this.longitude = res.longitude;
						this.latitude = res.latitude;
						this.initForm.lng = res.longitude;
						this.initForm.lat = res.latitude;
						this.getCity();
				    }
				});
			},
			clickitem(idx,val) {
				console.log(val);
				this.initForm.cate_id = val.id;
				this.dian = [];
				this.init();
				// this.initForm.
				
			},
			getFirstBanner() {
				this.api({
					method: "post",
					url: "Index/sowing"
				}).then(res=> {
					// console.log(res);
					this.ban1List = res.data.date;
				})
			},
			getSecondBanner() {
				this.api({
					method: "post",
					url: "Index/newFirendsenjoy"
				}).then(res=> {
					// console.log(res);
					this.ban2List = res.data.data;
				})
			},
			getBusinessClass() {
				this.api({
					method: "post",
					url: "Index/cate_goods_list",
					data: {
						city: this.city,
						area: this.area,
						longitude: this.longitude,
						latitude: this.latitude
					}
				}).then(res=> {
					// console.log(res);
					this.businessList = res.data.data;
					this.initForm.cate_id = parseInt(res.data.data[0].id);
					this.init();
				})
			},
			getTopClass() {
				this.api({
					method: "post",
					url: "Index/shop_cate"
				}).then(res=> {
					// console.log(res);
					this.topList = res.data.date;
				})
			},
			getCity() {
				this.api({
					method: "get",
					url: "Index/change_address",
					data: {
						longitude: this.longitude,
						latitude: this.latitude
					}
				}).then(res=> {
					// console.log(res);
					this.city = res.data.uid.result.ad_info.city;
					this.area = res.data.uid.result.ad_info.district;
					this.locationArea = res.data.uid.result.ad_info.city + "·" + res.data.uid.result.ad_info.district;
					this.getBusinessClass();
				})
			},
			/* 获取 分类下的商家列表 */
			init() {
				// console.log(this.initForm);
				this.api({
					method: "get",
					url: "Index/touch_categoodlist",
					data: this.initForm
				}).then(res=> {
					console.log(res);
					if(res.data.data) {
						res.data.data.forEach(item=> {
							this.dian.push(item);
						})
					} else {
						console.log('莫得东西');
					}
					// res.data.data.forEach(item=> {
					// 	this.dian.push(item);
					// })
				})
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			toHomepage(item) {
				console.log('点击商家，信息为：');
				console.log(item);
				uni.navigateTo({
					url: '../business/homepage?id=' + item.shop_id + "&distance=" + item.distance + "&shop_socre=" + item.shop_socre
				})
			}
		}
	}
</script>

<style lang="scss">
.page {
	font-size: 24rpx;
	// margin-bottom: 160rpx;
}
.line-one {
	color: #FFFFFF;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 24rpx;
	padding: 30rpx 0 30rpx 0;
	.right-info {
		image{
			display: block;
			float: left;
		}
	}
}
.line-two {
	display: flex;
	justify-content: flex-start;
	background-color: #FFFFFF;
	border-radius: 10rpx;
	height: 60rpx;
	align-items: center;
	padding: 8rpx 0;
	.search-icon {
		margin: 0 20rpx;
	}
}
.line-three {
	display: flex;
	justify-content: space-around;
	.single-ad {
		// width: 152rpx;
		height: 86rpx;
		border-radius: 16rpx;
		box-shadow: 2rpx 2rpx 10rpx 0 #e9e9e9;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		.left-box {
			.big {
				font-size: 24rpx;
				font-weight: bold;
				padding-bottom: 6rpx;
			}
			.sm {
				font-size: 18rpx;
				color: #616161;
			}
		}
		.right-box {
			image {
				width: 30rpx;
				height: 30rpx;
				position: relative;
				top: 16rpx;
				left: 10rpx;
				// right: 8rpx;
			}
		}
	}
}
.shop-box {
	.single-shop {
		background-color: #FFFFFF;
		display: flex;
		// height: 210rpx;
		padding: 20rpx;
		margin-top: 20rpx;
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
.no-more {
	width: 100%;
	text-align: center;
	padding: 40rpx 0;
}
</style>
