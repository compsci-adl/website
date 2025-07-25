# CS Club Website

This is the official repository for the University of Adelaide Computer Science Club (CS Club) website. It is built using [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/).

## Getting Started

We recommend using the `docker-compose-dev.yml` setup for development. It includes all the required services (the website in development mode, Redis, and Keycloak) all preconfigured and ready to run:

```bash
docker compose -f docker-compose-dev.yml up --build
```

If you'd prefer a manual setup, follow these steps:

1. Install the dependencies.

```bash
pnpm install
```

2. Copy `.env.local.example` to a new file `.env.local` and set required environment variables (check `/docs` folder if you don't know how to edit it)

3. Initialise the database.

```bash
pnpm run db:push
```

4. Run the development server.

```bash
pnpm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

We welcome contributions to enhance the CS Club Website! If you find any issues, have suggestions, or want to request a feature, please follow our [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License.
See [LICENSE](LICENSE) for details.
