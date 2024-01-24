# CS Club Website

---

This is the official repository for the University of Adelaide Computer Science Club (CS Club) website. It is built using [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/).

## Getting Started

To get started, please follow these steps: 
1. Clone the repository and open the folder.

```bash
git clone https://github.com/compsci-adl/website
cd website
```

2. Install the dependencies.
```bash
pnpm i
```

3. Set up the keys by copying `.env.local.example` to a new file `.env.local` and replace the placeholder keys with the actual keys. Please contact the open source officers on the CS Club Discord to get these keys.

4. Initialise the database
```bash
pnpm db:push
```

5. Then run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

We welcome contributions to enhance the CS Club Website! If you find any issues, have suggestions, or want to request a feature, please follow our [Contributing Guidelines](CONTRIBUTING.md).
