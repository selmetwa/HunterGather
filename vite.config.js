import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  build: {
    rollupOptions: {
      external: [
        "@supabase/gotrue-js", // ignore react stuff
      ],
    },
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
};

export default config;