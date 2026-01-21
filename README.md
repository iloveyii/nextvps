# Next.js - NextVPS

- Version 16
- A next tutorial
- Site <https://nextjs.org/learn/dashboard-app/getting-started>

## Demo

- Live <https://nextvps.vercel.app/dashboard>

## Create

- Install `npm i -g pnpm`
- Scaffolding `npx create-next-app@latest nextjsvps --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm`
- Install if not already `pnpm i`
- Run dev `pnpm dev`
- Run lint `pnpm lint`

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
- Use (overview) folder to group page and loading but exclude it from url path, so that loading apply only to this page and not invoices/ etc.

## Kinde Auth

- npx nypm add @kinde-oss/kinde-auth-nextjs
- corepack prepare pnpm@latest --activate
- pnpm install @kinde-oss/kinde-auth-nextjs

## Deployment

- Push to main branch
- If not deployed check and run locally `pnpm build`
