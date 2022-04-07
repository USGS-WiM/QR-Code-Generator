<!--
//! App.vue
// Main app component with top bar, router views
// -->

<template>

	<!-- Set classes for different preferences -->
	<div id="app">


		<transition name="load">

			<!-- App wrapper only shown if page mounted -->
			<main class="app-wrapper" v-if="pageMounted">

				<!-- Top bar component -->
				<TopBar></TopBar>


				<!-- Center/Main Content -->
				<div class="body-content" id="mainScrollView">
					<transition name="page" mode="out-in">
						<router-view/>
					</transition>
				</div>


				<!-- Toast Component -->
				<Toast ref="toastComponent"></Toast>

				<!-- Alert Component -->
				<Alert ref="alertComponent"></Alert>

			</main>

		</transition>

	</div>
</template>


<script>
// Components
import TopBar from "@/components/ui/TopBar/TopBar";
import Alert from "@/components/ui/Common/Alert";
import Toast from "@/components/ui/Common/Toast";

export default {
	name: "app",
	mixins: [
	],
	components: {
		Alert,
		Toast,
		TopBar,
	},
	data() {
		return {
			pageMounted: false,
		};
	},
	created: function () {
	},
	computed: {
	},
	watch: {
	},
	mounted() {
		let _this = this;
		_this.pageMounted = true;
	},
	beforeDestroy() { 
	},
	methods: {

	}
};
</script>

<style lang="scss">
	

	// Outermost wrapper
	#app {
		display: block;
		width: 100%;
		margin: 0;
		box-sizing: border-box;
		min-height: 100%;

		// Inner wrapper only shown on mountt
		.app-wrapper{
			width: 100%;
			margin: 0 auto;
			display: block;
			min-height: 100%;
		}
	}



	// Main view content
	.body-content{
		box-sizing: border-box;
		flex-grow: 3;
		// to account for header
		height: calc(100% - var(--topBarHeight) - var(--bottomBarHeight));
		overflow-x: hidden;
		width: 100%;
		transition: 0.2s 0.5s;
		padding-bottom: var(--bottomBarHeight);
		height: 100%;
		overflow-Y: auto;
		overflow-X: hidden;

		// Hide body content if viewing content panel
		@media (min-width: $screenSM) {
			&.hide-body{
				transition: 0s;
				width: 0;
			}
		}
		@media (max-width: $screenSM) {
			padding: 0 0;
			&.hide-body{
				transition: 0s;
				height: 0;
				min-height: 0;
				max-height: 0;
			}
		}
	}


</style>
