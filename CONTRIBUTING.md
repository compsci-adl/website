# Contributing Guidelines

You can contribute to the University of Adelaide Computer Science Club (CS Club) website with PRs, testing of PRs and issues. We appreciate your efforts to make our website better. Please read the entire documentation before continuing to make sure you understand all the processes. 

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

### Commit Messages
Please format commit messages as follows (see [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for more details):

```bash
<type>[optional scope]: <description>
```

For Example: 
```bash
refactor: Reuse header and footer layout

feat(link): Remove size
```

### Code Style
Please follow our [Code Style Guide](docs/coding-style.md). 

### PR - CI Process
Automatic tests will be performed for PRs. Builds and test runs must not contain errors or have bugs properly filed against unexpected errors that are unrelated to your change.

If the CI build fails for any reason, the PR actions tab should be consulted for more information on the error.

### PR Feedback
The maintainers and community members will provide feedback on your change. Community feedback is highly valued. When giving feedback, please be clear and concise.
