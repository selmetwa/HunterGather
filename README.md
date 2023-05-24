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
- [x] consolidate panels and then cleanup break
- [x] make collection header
- [x] pay for url service...
- [x] send user somewhere after they create a block 
- [x] send user somewhere after they create a collection
- [x] only let signed in users collect
- [x] block detail page
  - [x] list all collections it exists in
  - [x] embed webpage in block detail
  - [x] fall back to image if we cant embed
- [x] link out from cards
- [x] collection previews
- [x] pagination 
  - [x] main page
  - [x] collection detail
  - [x] collection preview
  - [x] profile blocks
  - [x] profile collections
- [x] make blocks and collections separate pages on profile
- [x] resolve styling inconsistencies
- [x] delete a block
- [x] delete a collection
- [?] update a collection if its yours
- [x] remove a block from a collection
- [x] intersperse blocks and collections on homepage
- [x] add a block to a collection after creation
- [x] add a collection to a collection :o
- [x] turn off preview
- [x] error handling
- [x] duplicate collection names
- [x] edit profile modal issue
- [x] correct counts on collection cards
- [x] check auth before user can edit profile (userId must equal profileId)
- [x] truncate long urls
- [x] handle null names?
- [?] weird navigation with previews
- [x] link to profile from collection header
- [x] remove social auth stuff
- [x] checkout modals on smaller screens
- [x] make sure register works (today)
- [x] search
- [x] turn cards into rows
- [x] toggle row view
- [x] blocks only view
- [x] collections only view
- [x] searchResults page
- [x] use loadMore button everywhere
- [x] use grid component everywhere
- [x] move interweave into utils
- [x] move search queries into query files
- [x] add pagination to search
- [x] loadMore buttons not working on search pages
- [x] add buttons to toggle views everywhere
- [x] clean up collection rows on block detail pages
- [x] handle background when there arent many items
- [ ] code cleanup
  - [ ] move supabasequeries into their own place
  - [ ] add a bunch of comments
- [ ] search filter for profile pages
- [ ] search filter for collection pages
- [ ] profile not reacting correctly to profileId change
- [x] add dates
- [x] move view toggle buttons into their own component
- [ ] optimize for mobile
  - [ ] fix header on mobile