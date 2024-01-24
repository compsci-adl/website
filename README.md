# CS Club Website

---

This is the official repository for the University of Adelaide Computer Science Club (CS Club) website. It is built using [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/).

## Getting Started

To get started, first clone the repository and open the folder.

```bash
git clone https://github.com/compsci-adl/website
cd website
```

Next install the dependencies.
```bash
pnpm i
```

Set up the keys by copying `.env.local.example` to a new file `.env.local` and replace the placeholder keys with the actual keys. Please contact the open source officers on the CS Club Discord to get these keys.

Initialise the database
```bash
pnpm run db:push
```

Then run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

We welcome contributions to enhance the CS Club Website! If you find any issues, have suggestions, or want to request a feature, please follow these guidelines:

- Check the [Code Style Guide](docs/coding-style.md) to maintain consistency.
- Open an issue to report problems or discuss potential changes.
- Submit a pull request to propose fixes or improvements.

For more details, check our [Contributing Guidelines](CONTRIBUTING.md).
