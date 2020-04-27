<template>
	<view class="container">
		<view class="single-tab" 
		v-for="(item, index) in tabList" 
		:key="index" 
		@click="navChange(item, index)"
		:class="currentIndex == index ? 'choose' : ''"
		>
			<image v-if="currentIndex == index" :src="item.se_img" mode=""></image>
			<image v-else :src="item.img" mode=""></image>
			<view class="">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [
					{ name: "首页", img: "../../../static/images/tab/home.png", se_img: "../../../static/images/tab/home_se.png" },
					{ name: "共享广告分", img: "../../../static/images/tab/share.png", se_img: "../../../static/images/tab/share_se.png"  },
					{ name: "激活代理", img: "../../../static/images/tab/activation.png", se_img: "../../../static/images/tab/activation_se.png"  },
					{ name: "我的", img: "../../../static/images/tab/mine.png", se_img: "../../../static/images/tab/mine_se.png"  },
				],
				currentIndex: 0
			}
		},
		mounted() {
			uni.getStorage({
				key: "pageCur",
				success: res=> {
					console.log(res);
					this.currentIndex = res.data;
				},
				fail: err => {//
					this.currentIndex = 0;
				}
			})
		},
		methods: {
			navChange(item, index) {
				this.currentIndex = index;
				uni.setStorageSync('pageCur', index);
				switch (index) {
					case 0: 
						this.gotoTab('userTab/home')
						break;
					case 1:
						this.gotoTab('userTab/share')
						break;
					case 2:
						this.gotoTab('userTab/activation')
						break;
					case 3: 
						this.gotoTab('userTab/mine')
						break;
					default: 
						break;
				}
			}
		}
 	}
</script>

<style lang="scss">
.container {
	width: 100%;
	height: 140rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: #FFFFFF;
	display: flex;
	justify-content: space-around;
	.single-tab {
		padding-top: 20rpx;
		padding-bottom: 4rpx;
		color: #9e9e9e;
		font-size: 26rpx;
		width: 25%;
		border-top: 2px solid #e0e0e0;
		text-align: center;
		image {
			width: 50rpx;
			height: 50rpx;
			margin: 10rpx 0 0 0; 
		}
	}
	.choose {
		border-top: 2px solid #ff395f;
		color: #ff395f;
		transition-duration: 500ms;
	}
}

</style>
