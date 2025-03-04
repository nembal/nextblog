# Publishing NextBlog

This document provides instructions for publishing NextBlog to npm.

## Prerequisites

- You need an npm account
- You need to be logged in to npm (`npm login`)
- You need to have appropriate permissions to publish the package

## Publishing Process

### 1. Update Version

Update the version in `package.json` according to [Semantic Versioning](https://semver.org/):

- MAJOR version for incompatible API changes
- MINOR version for added functionality in a backward compatible manner
- PATCH version for backward compatible bug fixes

```bash
# Example for updating to version 1.0.1
npm version patch

# Example for updating to version 1.1.0
npm version minor

# Example for updating to version 2.0.0
npm version major
```

### 2. Update CHANGELOG.md

Add a new entry to the CHANGELOG.md file with the new version and the changes made.

### 3. Run Tests

Ensure all tests pass before publishing:

```bash
npm test
```

### 4. Build the Package

Build the package to ensure everything compiles correctly:

```bash
npm run build
```

### 5. Prepare for Publishing

Run the prepare-publish script to prepare the package for publishing:

```bash
npm run prepare-publish
```

### 6. Publish to npm

There are two ways to publish the package:

#### Option 1: Publish from the root directory

```bash
npm publish
```

#### Option 2: Publish from the dist directory

```bash
cd dist
npm publish
```

### 7. Verify the Publication

Check that the package was published successfully:

```bash
npm view nextblog
```

## Publishing a Beta Version

To publish a beta version:

```bash
# Update version with beta tag
npm version prerelease --preid=beta

# Publish with beta tag
npm publish --tag beta
```

## Unpublishing

If you need to unpublish a version (within 72 hours of publishing):

```bash
npm unpublish nextblog@<version>
```

Note: npm has restrictions on unpublishing packages. See the [npm documentation](https://docs.npmjs.com/unpublishing-packages-from-the-registry) for more details. 