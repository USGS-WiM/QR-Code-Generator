// ! Router
//	Defines available routes and views


// Imports
import Vue from "vue";
import Router from "vue-router";
import { routes } from "./routes.js";



Vue.use(Router);


const router = new Router({
	mode: "history",
	linkExactActiveClass: "is-active",
	base: process.env.VUE_APP_BASE_PATH,
	// Return to top after route change
	scrollBehavior(to, from, savedPostition) {
		if (to.hash) {
			return {
			  selector: to.hash,
			//   behavior: 'smooth',
			};
		}else{
			return { x: 0, y: 0, };
		}
	},
	routes
});

// Scroll up
  router.afterEach((to, from) => {
		document.getElementById("mainScrollView").scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth"
		});
  });





export default router;
