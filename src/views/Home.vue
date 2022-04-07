<!--
Home.vue
-->

<template>

	<div>
	
		<!-- Site Details -->
		<div id="qrGenerator">

			<div id="qrLeft">

				<fieldset>
					<!-- URL -->
					<us-form-group 
						help-text="" 
						error="">
						<span slot="label">URL</span>

						<us-form-input name="QRurl" v-model="qr.url" placeholder="https://wim.usgs.gov/"/>

					</us-form-group>

					<!-- Logo -->
					<us-form-group>
						<span slot="label">Logo</span>
						<us-form-combobox
							class="mtop-xs"
							name="SelectTheme"
							:options="['None', 'USGS Black', 'USGS Green', 'WIM', 'Geoplatform']"
							v-model="qr.theme"
						/>
					</us-form-group>

					<!-- Transparent -->
					<div class="mright-md mbottom-sm flex mtop-md">
						<div class="flex column flex-center">
							<input type="checkbox" class="toggle yes-no" id="transToggle" v-model="qr.transparent"/>
						</div>
						<label class="flex column flex-center mleft-sm" for="transToggle">Transparent Background</label>
					</div>

					<!-- Code Color -->
					<us-form-group 
						help-text="Hex or rgb(a) values accepted. Formatted #FFFFFF or rgba(150, 150, 150, 0.5)" 
						error="">
						<span slot="label">QR Code Color</span>

						<us-form-input name="QRForeground" v-model="qr.foreground" placeholder="000000/"/>

					</us-form-group>

					<!-- Background Color -->
					<us-form-group 
						v-if="!qr.transparent"
						error="">
						<span slot="label">Background Color</span>

						<us-form-input name="QRBackground" v-model="qr.background" placeholder="FFFFFF/"/>

					</us-form-group>

					<!-- Warning -->
					<Callout
						icon="far fa-exclamation-triangle"
						class="mbottom-sm max-width-small mtop-lg"
						color="yellow">
						<b class="mbottom-xxs block">Important!</b>
						<p class="small no-padding">
							Verify your QR code works and takes you to the correct URL before sharing it.
						</p>
					</Callout>

					
					


				</fieldset>

			</div>

			<div id="qrRight">

				<!-- QR Code Canvas / Plugin -->
				<div class="margin-auto align-center ptop-md pbottom-md">
					<qrcode-vue :value="qr.url" :size="300" level="Q" :foreground="qr.foreground" :background="qr.background" class="qr-element" />
				</div>

				
				<!-- Download -->
				<div class="align-center mbottom-md">
					<button class="button invert big margin-auto" @click="download" variant="primary">
						Download Image
					</button>
				</div>
	
			</div>

		</div>

		<!-- Link used to convert canvas to image and download - empty -->
		<a id="link"></a>
	

		<!-- Spacer -->
		<div class="mtop-xl"></div>


	</div>

</template>

<script>
import Callout from "@/components/ui/Common/Callout";
// const imageDefinitions = require("@/definitions/images_base64.js");
import QrcodeVue from "qrcode.vue";

export default {
	name: "home",

	components: {
		Callout,
		QrcodeVue
	},
	

	mixins: [
	],

	data() {
		return {
			// Form Data
			qr: {
				url: "",
				theme: "USGS Black",
				transparent: true,
				foreground: "#000000",
				background: "rgba(0,0,0,0)",
			},
		};

	},

	computed: {

	},

	watch: {

		"qr.theme" () {
			let _this = this;
			var tempURL = this.qr.url.toString();
			this.qr.url = "";
			this.draw();

			if(this.qr.theme == "USGS Green"){
				this.qr.foreground = "#006D4D";
			}else if(this.qr.theme == "Geoplatform"){
				this.qr.foreground = "#102A46";
			}else{
				this.qr.foreground = "#000000";
			}
			
			// Timeout to redraw QR
			setTimeout(function(){
				_this.qr.url = tempURL;
			}, 50);

		},
		"qr.url" () {
			this.draw();
		},
		"qr.background" () {
			this.draw();
		},
		"qr.foreground" () {
			this.draw();
		},
		"qr.transparent" () {
			let _this = this;
			this.draw();

			if(this.qr.transparent){
				this.qr.background = "rgba(0,0,0,0)";
			}else{
				this.qr.background = "#FFFFFF";
			}
			setTimeout(function(){
				_this.qr.url = _this.qr.url + " ";
			}, 50);
		},
	},

	mounted() {
		let _this = this;
		setTimeout(function(){
			_this.draw();
		}, 500);
	},
	created: function () {
	},

	beforeDestroy(){
	},
	
	methods: {

		draw: function(){

			let _this = this;

			var canvas = document.getElementsByTagName("canvas")[0],
				context = canvas.getContext("2d");

			// Get logo based on theme choice
			var logoRef = "";
			// this.qr.foreground = "#000000";
			if(this.qr.theme == "USGS Black"){
				logoRef = "./img/logos/usgsblack.png";
			}else if(this.qr.theme == "USGS Green"){
				logoRef = "./img/logos/usgsgreen.png";
			}else if(this.qr.theme == "Geoplatform"){
				logoRef = "./img/logos/geo.png";
			}else if(this.qr.theme == "WIM"){
				logoRef = "./img/logos/wim.png";
			}


			
			// Wait for image to load before drawing
			var base_image = new Image();
			base_image.src = logoRef;
			
			base_image.onload = function(){

				// Clear center before logo and set Transparency
				// If transparent
				if(_this.qr.transparent){

					// Cut out pin for WIM logo
					if(_this.qr.theme == "WIM"){
						// No pin cutout
					}else{
						// Clear Regular rectangle
						context.clearRect(105, 105, 90, 90);
					}

				// Not transparent
				}else{
					context.fillStyle = _this.qr.background;

					// Draw PIN shape for WIM logo
					if(_this.qr.theme == "WIM"){
						context.beginPath();
						context.arc(150, 144, 42, 0, 2 * Math.PI, false);
						context.fill();
						context.beginPath();
						context.moveTo(188, 160);
						context.lineTo(150, 204);
						context.lineTo(112, 160);
						context.closePath();
						context.fill();
					}else{
						// Regular rectangle
						context.fillRect(105, 105, 90, 90);
					}
				}


				// Draw image
				context.drawImage(base_image, 105, 105, 90, 90);

			};
		},


		download: function(){
			var canvas = document.getElementsByTagName("canvas")[0];
			var link = document.getElementById("link");
			link.setAttribute("download", "QR.png");
			link.setAttribute("href", canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
			link.click();
		}


	}
};
</script>


<style lang="scss">


#qrGenerator{
	display: flex;
	width: 100%;
	box-sizing: border-box;
	padding:  55px var(--sidePadding);
	gap: 50px;
	justify-content: center;

	@media (max-width: $screenSM) {
		flex-wrap: wrap;
    }

	#qrLeft{
		max-width: var(--maxWidth);
		width: var(--maxWidthSmall);

		@media (max-width: $screenSM) {
			margin: 0 auto;
		}
	}

	#qrRight{
		min-width: 420px;
		height: fit-content;
		box-sizing: border-box;
		padding: 0 var(--sidePadding);
		background-color: var(--greyDark);
		border: 1px solid var(--borderFade);
		border-radius: var(--borderRadius);

		@media (max-width: $screenSM) {
			min-width: unset;
			padding: 25px;
		}

	}
}


.qr-element{
	@media (max-width: $screenSM) {
		transform: scale(0.75);
	}
}


</style>