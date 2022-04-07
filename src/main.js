//! Main
//*	Sets up vue app

// Imports
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import { UswdsVue } from "uswds-vue";

// Custom Plugins
import logging from "@/components/plugins/logging.js";

// Set configs
Vue.config.productionTip = false;

// Use
Vue.use(logging);
Vue.use(UswdsVue);

// Main styles
import "./styles/main.scss";

// Create vue app - call after processing user
let app = new Vue({
	router,
	data: {
	},
	render: h => h(App)
}).$mount("#app");
