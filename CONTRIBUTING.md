# Contributing Guidelines

You can contribute to the University of Adelaide Computer Science Club (CS Club) website with PRs, testing of PRs and issues. We appreciate your efforts to make our website better. Please read the entire documentation before continuing to make sure you understand all the processes. 

## Quick Links

- [Code Style Guide](link-to-code-style-guide) 
- [Pull Request Guide](link-to-code-style-guide) 

## Reporting Issues 

We always welcome bug reports, feature requests and overall feedback. Here are a few tips on how you can make an effective issue report.

### Finding Existing Issues

Before creating a new issue, please search our [open issues](https://github.com/compsci-adl/website/issues) to check if it already exists. If you do find an existing issue, please add your own feedback in the discussion.

### Writing a Good Bug Report

Writing good bug reports make it easier for maintainers to verify and find the root cause of the problem. The better a bug report, the faster the problem can be resolved. Ideally, a bug report should contain the following information:

- 

When ready to submit a bug report, please use the [Bug Report issue template](https://github.com/compsci-adl/website/issues/new?assignees=&labels=&projects=&template=bug-report.yml).


### Writing a Good Feature Request

Please review any feature requests already opened to check it has not already been suggested and to familiarise yourself with the format. When you are ready to submit a request, please use the [Feature Request issue template](https://github.com/compsci-adl/website/issues/new?assignees=&labels=&projects=&template=feature-request.yml).

## Getting Started

To get started, first clone the repository.

```bash
git clone https://github.com/compsci-adl/website
cd website
```

Next install the dependencies.
```bash
pnpm install
```

Set up Clerk API Keys by copying `.env.local.example` to a new file `.env.local` and replace the keys. Please contact the open source officers on the CS Club Discord to get these keys.

Then run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Making Changes
Create a new branch if you are addressing an existing issue. If not, please create a new issue first.

```bash
git branch <branch-name>
git checkout <branch-name>
```


Thank you for contributing to the CS Club website!


