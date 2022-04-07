//! Plugins
// Global methods to use in any mixin or component
//
// cleanArray(array): removes dupes from array
// 	scrollUp(): scrolls the page to top
// 	deplural(string): removes trailing s from string
// 	isValidURL(url): Returns true if URL is valid
// 	twentyFour(time): Converts 24h to 12hr
// 	lettersAndNumbers(string): Converts string to only letters and numbers and spaces
// 	navigate(route): pushes route to update vue router
// 	tab(url): opens url in new tab
// 	share(shareTextt, alertText): Activates native sharing dialog or falls back to copy to clipboard
// 	copyToClipboard(name, value): Copies value to clipboard, shows toast confirmation
// 	toast(): provides easy this.toast() call to use in any component.
// 	hello(message, icon, color): Shows tiny yellow toast for a brief moment
// 	getGeolocation(): Gets device geolocation and stores in store

import { _ } from "core-js";
import axios from "axios";

export default {

	install(Vue, options){


		// Scroll up
		// Simply scrolls to top of page
		Vue.prototype.scrollUp = function() {
			document.getElementById("mainScrollView").scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth",
			  });
		};


	
		// Removes S from string if it's the last letter
		Vue.prototype.isValidURL = function(url) {
			const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
			this.validUrl = regex.test(url);
			return this.validUrl;
		};



		// Navigate
		// Function to navigate with -> navigate("/route")
		// This lets you use custom elements that are accessible/focusable, rather than router-link
		// then use @click to navigate()
		Vue.prototype.navigate = function(route, confirm) {

			// If same route, don't navigate
			if(route == this.$route.path){
				return;
			}else{
				this.$router.push(route);
			}
		};


		// Open url in new tab
		Vue.prototype.tab = function(url) {
			window.open(url, "_blank");
		};


		// Native Sharing
		// Falls back to copy to clipboard
		Vue.prototype.share = function(shareText, alertText ) {
			var text = "Check this out: ";
			var thing = "Link";
			let _this = this;


			if(shareText){
				text = shareText;
			}
			if(alertText){
				thing = alertText;
			}

			if (navigator.share) {
				navigator.share({
					title: document.title,
					text: text,
					url: location.href,
				})
				.catch((error) => _this.$log().error("Error sharing", error));
			}else{
				this.copyToClipboard(thing, location.href);
			}
		};

		// Copy value to device clipboard 
		Vue.prototype.copyToClipboard = function(name, value) {
			// Create input element, append text, copy text, remove element
			var inp =document.createElement("input");
			document.body.appendChild(inp);
			inp.value = value;
			inp.select();
			document.execCommand("copy",false);
			inp.remove();
			// Toast
			if(name){
				this.hello(name + " copied to clipboard. ", "far fa-copy", "blue");
			}
		};

		// Toast & Hello
		// Toast & Hello
		Vue.prototype.toast = function(title, body, color, icon, path, info) {
			this.$root.$children[0].$refs.toastComponent.showToast(title, body, color, icon, path, info);
		};
		Vue.prototype.hello = function(message, icon, color) {
			this.$root.$children[0].$refs.alertComponent.showAlert(message, icon, color);
		};

	
	}
  
 };