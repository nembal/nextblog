# Contributing to NextBlog

Thank you for considering contributing to NextBlog! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of others.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:

- A clear, descriptive title
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment information (OS, browser, NextBlog version, etc.)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:

- A clear, descriptive title
- A detailed description of the proposed feature
- Any relevant examples or mockups
- Why this feature would be beneficial to the project

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests to ensure they pass (`npm test`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Pull Request Guidelines

- Follow the existing code style
- Include tests for new features or bug fixes
- Update documentation as needed
- Keep pull requests focused on a single concern
- Link to any relevant issues

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Run tests: `npm test`

## Project Structure

```
nextblog/
├── app/                  # Next.js app directory
├── posts/                # Sample blog posts
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # React components
│   ├── utils/            # Utility functions
│   └── index.tsx         # Main entry point
├── .npmignore            # Files to exclude from npm package
├── LICENSE               # MIT License
├── README.md             # Project documentation
└── package.json          # Project metadata and dependencies
```

## Testing

We use Jest for testing. Please ensure all tests pass before submitting a pull request:

```bash
npm test
```

## Documentation

Please update the documentation when adding or modifying features. This includes:

- README.md
- JSDoc comments
- Code comments for complex logic

## Questions?

If you have any questions, feel free to create an issue or reach out to the maintainers.

Thank you for contributing to NextBlog! 