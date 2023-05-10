# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Todo
- [x] create collection
- [x] create profile page
- [x] create block
- [x] error handling
- [x] upload avatar
- [x] edit profile info
- [x] auth
- [x] google auth
- [x] github auth
- [x] add block to collection while creating block
- [x] fetch data for collection detail pages
- [x] component-ize masonry
- [x] make block cards
- [x] make collection cards
- [ ] consolidate panels and then cleanup break
- [ ] make collection header
- [ ] cleanup code.....
- [ ] rate limiting
- [x] pay for url service...
- [ ] check auth before user can edit profile (userId must equal profileId)
- [x] send user somewhere after they create a block 
- [ ] send user somewhere after they create a collection
- [x] only let signed in users collect
- [x] block detail page
  - [x] list all collections it exists in
  - [x] embed webpage in block detail
  - [x] fall back to image if we cant embed
- [x] link out from cards
- [ ] collection previews
- [ ] private collections
- [ ] pagination 
- [ ] resolve styling inconsistencies
- [ ] delete a block
- [ ] delete a collection
- [ ] update a collection if its yours
- [x] remove a block from a collection
- [x] intersperse blocks and collections on homepage
- [x] add a block to a collection after creation
- [x] add a collection to a collection :o
- [ ] error handling
- [ ] optimize for mobile
- [ ] add option to disable previews

