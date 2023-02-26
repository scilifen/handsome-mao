import { fileURLToPath, URL } from "node:url";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const pwaOptions: Partial<VitePWAOptions> = {
	includeAssets: ["favicon.svg"],
	manifest: {
		name: "Mao's Choices at NTU",
		short_name: "Mao",
		theme_color: "#ffffff",
		icons: [
			{
				src: "maskable_icon_x512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "maskable_icon_x384.png",
				sizes: "384x384",
				type: "image/png",
			},
		],
	},
	registerType: "autoUpdate",
	workbox: {
		runtimeCaching: [
			{
				urlPattern: /(.*?)\.(js|css|ts)/, // js /css /ts静态资源缓存
				handler: "NetworkFirst",
				options: {
					cacheName: "js-css-cache",
				},
			},
			{
				urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
				handler: "NetworkFirst",
				options: {
					cacheName: "image-cache",
				},
			},
			{
				urlPattern: /(.*?)\.(json)/, // json数据缓存
				handler: "NetworkFirst",
				options: {
					cacheName: "json-cache",
				},
			},
		],
		navigateFallback: "index.html",
	},
	devOptions: {
		enabled: true,
	},
};
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), VitePWA(pwaOptions)],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		host: true,
		port: 8000,
		cors: true,
	},
	build: {
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
	},
});
