#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure the dist directory exists
if (!fs.existsSync('dist')) {
  console.log('Building the package...');
  execSync('npm run build', { stdio: 'inherit' });
}

// Copy README.md, LICENSE, and package.json to dist
console.log('Copying files to dist directory...');
fs.copyFileSync('README.md', path.join('dist', 'README.md'));
fs.copyFileSync('LICENSE', path.join('dist', 'LICENSE'));

// Create a simplified package.json for the dist directory
const pkg = require('../package.json');
const distPkg = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  main: 'cjs/index.js',
  module: 'esm/index.js',
  types: 'index.d.ts',
  exports: {
    '.': {
      import: './esm/index.js',
      require: './cjs/index.js',
      types: './index.d.ts'
    }
  },
  license: pkg.license,
  dependencies: pkg.dependencies,
  peerDependencies: pkg.peerDependencies,
  keywords: pkg.keywords,
  author: pkg.author,
  repository: pkg.repository,
  bugs: pkg.bugs,
  homepage: pkg.homepage,
  engines: pkg.engines
};

fs.writeFileSync(
  path.join('dist', 'package.json'),
  JSON.stringify(distPkg, null, 2)
);

// Create a minimal README for the dist directory if it doesn't exist
if (!fs.existsSync(path.join('dist', 'README.md'))) {
  const distReadme = `# ${pkg.name}

${pkg.description}

## Installation

\`\`\`bash
npm install ${pkg.name}
\`\`\`

## Documentation

For full documentation, visit [${pkg.homepage}](${pkg.homepage}).
`;

  fs.writeFileSync(path.join('dist', 'README.md'), distReadme);
}

console.log('Package prepared for publishing!');
console.log('To publish, run: cd dist && npm publish'); 