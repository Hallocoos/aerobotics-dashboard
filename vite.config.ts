import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
	plugins: [react(), EnvironmentPlugin("all", { prefix: "VITE_" }),],
	server: {
		proxy: {
			"/farm": {
				target: "https://api.aerobotics.com",
				changeOrigin: true,
				secure: false,
				configure: (proxy) => {
					proxy.on("error", (err) => {
						console.log("proxy error", err);
					});
					proxy.on("proxyReq", (proxyReq, req) => {
						console.log("Sending Request to the Target:", req.method, req.url);
					});
					proxy.on("proxyRes", (proxyRes, req) => {
						console.log("Received Response from the Target:", proxyRes.statusCode, req.url);
					});
				},
			},
		},
	},
});
