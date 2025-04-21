import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
import imagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		visualizer({
			emitFile: true,
			open: true,
			sourcemap: true
		}),
		compression({
			verbose: true,
			disable: false,
			algorithm: "gzip",
			threshold: 10 * 1024,
			ext: ".gz"
		}),
		imagemin({
			gifsicle: {
				optimizationLevel: 7, interlaced: false
			},
			optipng: {
				optimizationLevel: 7
			},
			pngquant: {
				quality: [0.8, 0.9],
				speed: 4
			},
			mozjpeg: {
				quality: 80,
				progressive: true,
				speed: 4
			},
			svgo: {
				plugins: [
					{ name: "removeViewBox" },
					{ name: "removeEmptyAttrs", active: false }
				]
			},
			webp: {
				quality: 80,
				lossless: false,
				method: 6
			}
		})
	],
	build: {
		minify: process.env.NODE_ENV === "production" ? "esbuild" : false,
		outDir: "dist",
		esbuild: {
			minifyWhiteSpace: true,
			minifyIdentifiers: true,
			minifySyntax: true,
			dropConsole: true,
			pure: ["console.log", "console.info"]
		},
		rollupOptions: {
			output: {
				experimentalMinChunkSize: 10 * 1024,
				manualChunks: (id) => {
					if (id.includes("react")) {
						return "react-vendor";
					}

					if (id.includes("redux")) {
						return "redux";
					}

					if (id.includes("ant-design") || id.includes("antd")) {
						return "antd";
					}

					if (id.includes("echarts")) {
						return "echarts";
					}

					if (id.includes("moment")) {
						return "moment";
					}

					if (id.includes("node_modules")) {
						return "vendor";
					}
				},
				entryFileNames: "js/index-[hash].js",
				chunkFileNames: "js/[name]-[hash].js",
				assetFileNames: "[ext]/[name]-[hash].[ext]"
			}
		}
	}
})
