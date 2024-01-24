# Contributing Guidelines

You can contribute to the University of Adelaide Computer Science Club (CS Club) website with issues, PRs, and testing of PRs. We appreciate your efforts to make our website better. Please read the entire documentation before continuing to make sure you understand all the processes. 

## Reporting Issues 

We always welcome bug reports, feature requests and overall feedback. Here are a few tips on how you can make an effective issue report.

### Finding Existing Issues

Before creating a new issue, please search our [open issues](https://github.com/compsci-adl/website/issues) to check if it already exists. If you do find an existing issue, please add your own feedback in the discussion.

### Writing a Good Bug Report

Writing good bug reports make it easier for maintainers to verify and identify the root cause of the problem. The better the bug report, the faster the problem can be resolved. A bug report should contain the following information:

- **Description of the Bug**: What's the issue you encountered?
- **Reproduction Steps**: How can the issue be reproduced?
- **Expected Behaviour**: What do you expect to happen?
- **Information on the environment**: OS, Browser, Device
- **Additional Notes**: Add any other notes or screenshots about the bug here.

When you are ready to submit a bug report, please use the [Bug Report issue template](https://github.com/compsci-adl/website/issues/new?assignees=&labels=&projects=&template=bug-report.yml).

### Writing a Good Feature Request

Writing good feature requests make it easier for maintainers to understand the feature and see how it fits into the website. The better the feature request, the faster the feature can be discussed and possibly implemented. A feature request should contain the following information:

- **Overview**: Include the basic, high-level concepts for this feature here.
- **Details**: These may include specific methods of implementation, design considerations, or any other technical details.
- **Why would this feature be useful?**: A clear and concise description of why this feature would improve the CS Club website.
- **Additional Notes**: Add any other notes or screenshots about the feature request here.

When you are ready to submit a request, please use the [Feature Request issue template](https://github.com/compsci-adl/website/issues/new?assignees=&labels=&projects=&template=feature-request.yml).

## Contributing Changes

Project maintainers will merge changes that both improve the project and meet our code quality standards. 

### Suggested Workflow

We recommend you to use the following workflow:

1. Find an existing issue or create a new one.
    - Seek feedback from the maintainers and the community that your proposed change is a good one.
    - Clearly state whether you plan on implementing it yourself or not. If this is the case, you can request that the issue be assigned to you. Note: The person who filed the issue and the person who implements it don't have to be the same.
2. Create a personal fork of the repository using GitHub (if you don't already have one).
3. In your fork, create a branch based of main (`git checkout -b <mybranch>`). Replace `<mybranch>` with a relevant name for your branch.
4. Create and commit your changes to your branch.
    - Commit messages should follow the guidelines in [Commit Messages](#commit-messages)
6. Run the linting and prettier commands with `pnpm run lint` and `pnpm run format` to ensure your code follows our code quality standards.
7. Create a pull request (PR) to merge your changes into the [compsci-adl/website](https://github.com/compsci-adl/website) repository's `main` branch.
    - State in the description what issue or improvement your change is addressing.
    - Check if all the Continuous Integration checks are passing. Refer to [Actions](https://github.com/compsci-adl/website/actions) to check for errors.
8. Wait for feedback or approval of your changes from the maintainers
9. When the maintainers have signed off, all checks are green, and there are no merge conflicts, your PR will be merged.
    - You can safely delete the branch you used for making the change after the PR has been merged

### Commit Messages
Before you create a PR, please check whether your commits comply with the commit conventions used for this repository.
When you create a commit, please follow the convention
`<type>[optional scope]: <description>` in your commit message while using one of
the following categories:

- `feat`: Adds a new feature
- `fix`: Fixes a bug (please reference an
  existing issue if present)
- `refactor`: Restructures code while not changing its original functionality
- `docs`: Changing existing or creating new documentation (i.e.
  README or other markdown files)
- `build`: Changing the build system or dependencies
- `style`: Related to code formatting (i.e.
  Fixing linting or Prettier errors)
- `ci`: Changing the configuration of continuous integration (i.e.
  Github actions)
- `chore`: Changes that do not fit into any of the above
  categories

If you are interested in the detailed specification you can visit
<https://www.conventionalcommits.org/>

### Code Style
We follow the [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript) and the [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react). Please take the time to familiarise yourself with these guides.

### PR - CI Process
Automatic tests will be performed for PRs. Builds and test runs must not contain errors or have bugs properly filed against unexpected errors that are unrelated to your change.

If the CI build fails for any reason, the PR actions tab should be consulted for more information on the error.

### PR Feedback
The maintainers and community members will provide feedback on your change. Community feedback is highly valued. When giving feedback, please be clear and concise.
