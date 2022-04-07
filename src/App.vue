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

				<footer id="main">
					Created by <a href="https://wim.usgs.gov" target="_blank">WIM</a> at the USGS. 
					Open Source on <a href="https://github.com/USGS-WiM/QR-Code-Generator" target="_blank">GitHub</a>
				</footer>
				<footer id="required">
					<span>
						<a href="//www.doi.gov/privacy" target="_blank">
							DOI Privacy Policy
						</a>
					</span>
					<span>
						<a href="//usgs.gov/policies-and-notices" target="_blank">
							Legal
						</a>
					</span>
					<span>
						<a href="//usgs.gov/accessibility-and-us-geological-survey" target="_blank">
							Accessibility
						</a>
					</span>
					<span>
						<a href="//usgs.gov/sitemap" target="_blank">
							Site Map
						</a>
					</span>
					<span class="block"></span>
					<span>
						<a href="//doi.gov" target="_blank">
							U.S. Department of the Interior
						</a>
					</span>
					<span>
						<a href="//doioig.gov" target="_blank">
							DOI Inspector General
						</a>
					</span>
					<span>
						<a href="//whitehouse.gov" target="_blank">
							White House
						</a>
					</span>
					<span>
						<a href="//www.whitehouse.gov/omb/management/egov" target="_blank">
							E-Gov
						</a>
					</span>
					<span>
						<a href="//www.doi.gov/pmb/eeo/no-fear-act" target="_blank">
							No Fear Act
						</a>
					</span>
					<span>
						<a href="//www2.usgs.gov/foia" target="_blank">
							FOIA
						</a>
					</span>
				</footer>


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



	footer#main{
		box-sizing: border-box;
		padding: 45px var(--sidePadding) 20px var(--sidePadding);
		text-align: center;
		font-size: 14px;

		button{
			font-weight: 600;
			margin-left: 15px;
			color: var(--text);
		}
	}
	footer#required{
		box-sizing: border-box;
		padding: 12px 25px 14px 25px;
		color: white;
		background-color: var(--usgsBlue);

		.block{
			display: block;
		}
		a{
			font-size: 12px;
			color: white;
			text-decoration: none;
			padding-right: 10px;
			display: inline-block;
		}
		a:focus,
		a:hover{
			text-decoration: underline;
		}
	}

</style>
