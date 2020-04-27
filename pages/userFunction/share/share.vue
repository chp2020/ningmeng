<template>
	<view class="page">
		<image :src="imgUrl + shareImg" style="width: 100%; height: 100%;" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: "",
				shareImg: ""
			}
		},
		onLoad() {
			this.imgUrl = this.$store.state.imgUrl;
			this.api({
				method: "post",
				url: "User/user_share_code"
			}).then(res=> {
				console.log(res);
				this.shareImg = res.data.date.share_code;
			})
		}
	}
</script>

<style>
.page {
	background-image: none;
}
</style>
