// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

// Cloudflare Pages set CF_PAGES=1 during production build.
// Local dev/build stays static: adapter only get imported in prod,
// so a static build never resolves @astrojs/cloudflare.
const isProd = process.env.CF_PAGES === '1'

let adapter
if (isProd) {
	const { default: cloudflare } = await import('@astrojs/cloudflare')
	adapter = cloudflare()
}

// https://astro.build/config
export default defineConfig({
	// Astro.url base during prerender
	site: process.env.SITE_URL,
	output: isProd ? 'server' : 'static',
	adapter,
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Onest',
			cssVariable: '--font-sans',
			weights: ['100 900'],
			styles: ['normal'],
			fallbacks: ['sans-serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Geist Mono',
			cssVariable: '--font-mono',
			weights: ['100 900'],
			styles: ['normal'],
			fallbacks: ['monospace'],
		},
	],
})
