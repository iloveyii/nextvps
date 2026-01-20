# Next.js - NextVPS

- Version 16
- A next tutorial
- Site <https://nextjs.org/learn/dashboard-app/getting-started>

## Create

- Install `npm i -g pnpm`
- Scaffolding `npx create-next-app@latest nextjsvps --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm`
- Install if not already `pnpm i`
- Run dev `pnpm dev`

## Styles

- Two ways to style
- Tailwind utility classes
- Module bases styles
-

## Layouts and file based routing

- Each route can have separate layout.tsx and page.tsx (page is like index of that folder so it must exist)

## Database

- Setup Vercel db
- Seed data
- Fetch data

## Streaming

- Some API / Network requests might be slower affecting the overall loading time even when using promise.all
- To improve user experience even with slow requests by transferring small amounts of data as it become available to the client
- It works well with React component model, as a model is considered a chunk
- There are two levels you can implement streaming at:
  - At the page level with loading.tsx which creates suspense
  - At the component level for finer control
  -
