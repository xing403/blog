import { spawn } from "cross-spawn";
import fs from "fs";
import path from "path";
import pMap from "p-map";
import { createContentLoader } from "vitepress";

// Define the custom loader using createContentLoader
const loader = createContentLoader("/**/*.md", {
	async transform(rawData) {
		const data = await pMap(
			rawData,
			async (item) => {
				// console.log(item.url);
				const lastUpdated = await getLastUpdated(item.url);
				return { ...item, lastUpdated };
			},
			{ concurrency: 64 }
		);
		// Sort the data based on the lastUpdated field
		data.sort((a, b) => b.lastUpdated - a.lastUpdated);
	//	console.log(JSON.stringify(data, null, 2));
		return data;
	},
});

// getLastUpdated function to fetch the last update time of a markdown file
async function getLastUpdated(url) {
	// Access global VITEPRESS_CONFIG
	const siteConfig = globalThis.VITEPRESS_CONFIG;

	let file = url.replace(/(^|\/)$/, "$1index");
	file = file.replace(/(\.html)?$/, ".md");
	file = siteConfig.rewrites.inv[file] || file;
	file = path.join(siteConfig.srcDir, file);

	return new Promise((resolve, reject) => {
		const cwd = path.dirname(file);
		if (!fs.existsSync(cwd)) return resolve(0);
		const fileName = path.basename(file);
		const child = spawn("git", ["log", "-1", '--pretty="%ai"', fileName], {
			cwd,
		});
		let output = "";
		child.stdout.on("data", (data) => (output += String(data)));
		child.on("close", () => resolve(new Date(output).getTime()));
		child.on("error", reject);
	});
}

// Export the data and the loader
export const data = await loader.load();
export default loader;
