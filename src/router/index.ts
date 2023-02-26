import { createRouter, createWebHashHistory } from "vue-router";
import App from "../App.vue";

const router = createRouter({
	// history: createWebHashHistory(import.meta.env.BASE_URL),
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/all",
			name: "all",
			component: () => import("../views/AllView.vue"),
		},
		{
			path: "/random",
			name: "random",
			component: () => import("../views/RandomView.vue"),
		},
		{
			path: "/mistakes",
			name: "mistakes",
			component: () => import("../views/MistakesView.vue"),
		},
	],
});

export default router;
