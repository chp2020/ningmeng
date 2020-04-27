<template>
	<view class="contents">
		<view class="head">
			<view class="text-black text_item">您当前的收益</view>
			<view class="text-red money">{{walletInfo.money}}</view>
			<view><button class="cu-btn round bg-orange btn" @tap="tixian()">立即提现</button></view>
			
		</view>
		
		<view class="main">
			<view class="main_item">
				<view class="text-df text-gray">总收益(元)</view>
				<view class=" text-df text-gray">待分红(元)</view>
				<view class="text-df text-gray">已提现(元)</view>
			</view>
			<view class="main_item list">
				<view class="text-red">{{walletInfo.total_revenue}}</view>
				<view class="text-red">{{walletInfo.dividends_payable}}</view>
				<view class="text-red">{{walletInfo.yi_tixian}}</view>
			</view>
		</view>
		<view class="footer">
			<scroll-view class="bg-white nav" scroll-x>
				<view class="cu-item  text-black" :class="indexs===0? 'sroll_item':''" @click="change(0)">分润明细</view>
				<view class="cu-item  text-black" :class="indexs===1? 'sroll_item':''" @click="change(1)">提现明细</view>
			</scroll-view>
			<!-- 分润提现 -->
			<view class="fenrun_draw" v-if="indexs===0">
			<view class="cu-list menu">
				<view class="cu-item text-list" v-for="(item,index) in fenrunList" :key="index">
					<view class="content">
						<view>{{item.shop_name}}</view>
						<text class="text-df text-gray">{{item.ctime}}</text>
					</view>
					<view class="action">
						<view class="text-orange">+{{item.money}}</view>
					</view>
				</view>
			</view>
			</view>
			<!-- 提现明细 -->
			<view class="draw_detail" v-if="indexs===1">
			<view class="cu-list menu">
				<view class="cu-item text-list" v-for="(item,index) in tixianList" :key="index">
					<view class="content">
						<view>提现金额</view>
						<text class="text-df text-gray">{{item.time}}</text>
					</view>
					<view class="action">
						<view>{{item.money}}</view>
						<view class="text-df text-yellow draw">{{item.state}}</view>
					</view>
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
				indexs:0,
				walletInfo: {}, //用户钱包信息
				fenrunPage: 0,
				fenrunList: [],
				tixianPage: 0,
				tixianList: [],
				bindCard: false, //是否绑定银行卡  默认 无绑定 
				money: 0, //可提现金额
				mix_put_forward: 0, //最低提现金额限制
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getWalletInfo();
			this.getFenrun();
			this.getTixian();
		},
		onReachBottom() {
			if(this.indexs == 0) {
				this.getFenrun();
			} else if(this.indexs == 1) {
				this.getTixian();
			}
		},
		methods: {
			change(index){
				this.indexs=index;
			},
			getWalletInfo() {
				this.api({
					method: "post",
					url: "User/index"
				}).then(res=> {
					console.log(res);
					this.walletInfo = res.data.date;
					this.money = res.data.date.money;
					this.mix_put_forward = res.data.date.mix_put_forward;
					if(this.walletInfo.back_id == null) {
						this.bindCard = false;
					} else {
						this.bindCard = true; //有银行卡
					}
				})
			},
			getFenrun() { //
				this.fenrunPage++;
				this.api({
					method: "post",
					url: "User/fenrun_list",
					data: {
						page: this.fenrunPage
					}
				}).then(res=> {
					console.log(res);
					if(res.data.date.length > 0) {
						res.data.date.forEach(item=> {
							this.fenrunList.push(item);
						})
					}
				})
			},
			getTixian() {
				this.tixianPage ++;
				this.api({
					method: "post",
					url: "User/tixian_list",
					data: {
						page: this.tixianPage
					}
				}).then(res=> {
					console.log(res);
					if(res.data.date.length > 0) {
						res.data.date.forEach(item=> {
							this.tixianList.push(item);
						})
					}
				})
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			tixian() {
				if(this.bindCard) { //有卡
					uni.redirectTo({
						url: './withdrawal?money=' + this.money + "&mix=" + this.mix_put_forward
					})
				} else { //无卡
					uni.showModal({
						title: '提示',
						content: '您还未绑定银行卡,还无法提现哦',
						showCancel: true,
						cancelText: '取消',
						confirmText: '去绑定',
						success: res => {
							if(res.confirm) {
								this.toPage('./bind_card');
							} else if(res.cancel) {
								// 
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
			}
			
		}
	}
</script>

<style lang="scss">
	@import "../../../colorui/main.css";
	.contents{
		font-size: 35upx;
		background-color: #fff;
	}
	.head {
		padding: 50upx 0;
		view {
			text-align: center;
			margin: 0 auto;
		}
		.money{
			font-weight: 600;
			font-size: 40upx;
			padding: 30upx 0;
		}
	}
	.btn{
		width: 300upx;
			margin: 0 auto;
	}
	.main{
		padding: 45upx 35upx;
	}
	.main_item{
		display: flex;
		justify-content: space-around;
	}
	.sroll_item{
		color:#ffda43;
		border-bottom: 2upx solid #ffda43;
	}
	.text-list{
		border: 1upx solid #eee;
		padding: 28upx !important;
	}
	.draw{
		padding-left: 20upx;
	}

</style>
