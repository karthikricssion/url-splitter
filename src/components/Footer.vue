<template>
    <div class="c-flex footer-wrapper">
        <div class="footer-content">
			<span class="feedback-button font-w-600" @click="showFeedbackModal = true">Feedback or Request Feature</span>
            <a href="https://www.buymeacoffee.com/karthik.raja" target="_blank" title="1secmail.com">
                <img class="buy-me-a-coffee-logo" src="../assets/images/buy-me-a-coffee-logo.png"  alt="buy-me-a-coffee-logo" />
            </a>
			<!-- 
				<a href="https://www.1secmail.com" target="_blank" title="1secmail.com">
					<span>Powered by</span>
					<img class="one-secmail-logo" src="../assets/images/1secmail-logo.png"  alt="1secmail-logo" />
					<span>API</span>
				</a> 
			-->
        </div>
		<feedback-modal @sent="messageSent" @close="showFeedbackModal = false" v-if="showFeedbackModal"></feedback-modal>
    </div>
</template>

<script>
import FeedbackModal from './FeedbackModal'
export default {
  	components: { 
		FeedbackModal 
	},
	name: 'Footer',
	data() {
		return {
			showFeedbackModal: false
		}
	},
	methods: {
		messageSent() {
			this.$toasted.show("Feedback sent successfully!", { 
				theme: "toasted-primary", 
				position: "bottom-center", 
				fullWidth: false,
				fitToScreen: true,
				duration : 2000
			});
		}
	}
}
</script>

<style lang="scss" scoped>
/* Footer content */
.footer-wrapper {
	text-align: center;
	.footer-content {
		width: 100%;
		background-color: #f9f9fa;
		a {
			border-top: 1px solid #E3E3E5;
			padding: 8px;
			text-decoration: none;
			color: #333;
			display: block;
			&:hover {
				opacity: 0.8;
			}
		}
		span {
			display: inline-block;
			vertical-align: top;
			padding: 6px 4px;
			font-size: 12px;

			&.feedback-button {
				border-top: 1px solid #E3E3E5;
				padding: 12px;
				display: block;
				cursor: pointer;
			}
		}
		.one-secmail-logo {
			width: 100px;
			height: auto;
		}

		.buy-me-a-coffee-logo {
			width: 100px;
			height: auto;
		}
	}
}
</style>
