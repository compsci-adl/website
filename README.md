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

## Development and Testing

### Seeding the CMS
To seed the Payload CMS database with mock data for local development, run:
```bash
pnpm run db:seed-cms
```

### Running Tests
To run the full suite of unit tests and compute coverage:
```bash
pnpm test:coverage
```

To run unit tests and verify required code coverage (as enforced in CI/CD checks):
```bash
pnpm test:coverage:check
```

To run the Playwright end-to-end integration tests:
```bash
pnpm test:playwright
```
> [!NOTE]
> Make sure no dev server is already running on port `3000` before starting Playwright tests, as the E2E test runner automatically provisions and controls its own Next.js instance.

## Contributing

We welcome contributions to enhance the CS Club Website! If you find any issues, have suggestions, or want to request a feature, please follow our [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License.
See [LICENSE](LICENSE) for details.
