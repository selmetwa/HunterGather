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
- [ ] component-ize masonry
- [ ] make block cards
- [ ] make collection cards
- [ ] pay for url service...
- [ ] check auth before user can edit profile (userId must equal profileId)
- [ ] block detail page
  - [ ] list all collections it exists in
- [ ] link out from cards
- [ ] pagination
- [ ] delete a block
- [ ] delete a collection
- [ ] update a collection if its yours
- [ ] remove a block from a collection
- [ ] intersperse blocks and collections on homepage
- [ ] add a block to a collection after creation
- [ ] add a collection to a collection :o

