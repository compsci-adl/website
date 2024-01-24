# CS Club Website

This is the official repository for the University of Adelaide Computer Science Club (CS Club) website. It is built using [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/).

## Getting Started

To get started, please follow these steps: 
1. Install the dependencies.
```bash
pnpm install
```

2. Set up the required keys:
- Copy `.env.local.example` to a new file `.env.local`.
- Create a [Clerk](https://clerk.com) account and make a new application within the Clerk dashboard.
- Configure the settings to require a name, reject compromised passwords, and enforce average strength passwords. 
- Copy the keys to `.env.local`.

3. Initialise the database.
```bash
pnpm run db:push
```

4. Then run the development server.

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

We welcome contributions to enhance the CS Club Website! If you find any issues, have suggestions, or want to request a feature, please follow our [Contributing Guidelines](CONTRIBUTING.md).

## License
This project is licensed under the MIT License. 
See [LICENSE](LICENSE) for details.