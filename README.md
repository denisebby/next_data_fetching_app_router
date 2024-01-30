# nextdatafetching-Next

Next so fetch

An app that demos multiple ways to fetch data with next js

next-data-fetching-app-router.vercel.app

To run:


## Dev

```
npm install
npm run dev
```

## Prod

```
npm run build
npm start
```

# Overall design reference repos
https://github.com/denisebby/nextadmin/blob/starter/package.json


Helpful video around differences btw next js 12 and 13:
https://www.youtube.com/watch?v=WfgSm_q6HeE

Server vs Client Components:
https://www.youtube.com/watch?v=aoHK8skFZ1U

# Page Router Vs App Router

This repo is uses app router as it seems to be the latest flavor promoted by Next JS/Vercel.


# Follow Up
- How do we easily use mdx, rendering markdown content in next js? Is it worth it? (Might
be bc of code snippets and syntax highlighting.)
    - https://www.youtube.com/watch?v=n2CV6f0vFr4
    - https://www.youtube.com/watch?v=YC6LqIYVHxI


# Notes
I had to use wrapper components because when loading both data in the same page, one with timeout and one without, it caused examples to not be accurate.
