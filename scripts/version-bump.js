#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the version bump type from command line arguments
const args = process.argv.slice(2);
const validBumpTypes = ['major', 'minor', 'patch'];
const bumpType = args[0] || 'patch';

if (!validBumpTypes.includes(bumpType)) {
  console.error(`Invalid bump type: ${bumpType}. Must be one of: ${validBumpTypes.join(', ')}`);
  process.exit(1);
}

// Read the current package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;

// Parse the version
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Calculate the new version
let newVersion;
switch (bumpType) {
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'patch':
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Update CHANGELOG.md
const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
const changelog = fs.readFileSync(changelogPath, 'utf8');

// Get the current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Add the new version to the changelog
const newEntry = `## [${newVersion}] - ${today}\n\n### Added\n- \n\n### Changed\n- \n\n### Fixed\n- \n\n`;
const updatedChangelog = changelog.replace('# Changelog\n\n', `# Changelog\n\n${newEntry}`);

fs.writeFileSync(changelogPath, updatedChangelog);

console.log(`Version bumped from ${currentVersion} to ${newVersion}`);
console.log('CHANGELOG.md updated. Please fill in the changes before committing.');

// Optionally commit the changes
const shouldCommit = args.includes('--commit');
if (shouldCommit) {
  try {
    execSync(`git add package.json CHANGELOG.md`);
    execSync(`git commit -m "Bump version to ${newVersion}"`);
    console.log('Changes committed.');
  } catch (error) {
    console.error('Failed to commit changes:', error.message);
  }
}

// Usage instructions
console.log('\nUsage:');
console.log('  npm run version-bump [major|minor|patch] [--commit]');
console.log('  - major: Bump major version (X.0.0)');
console.log('  - minor: Bump minor version (0.X.0)');
console.log('  - patch: Bump patch version (0.0.X) [default]');
console.log('  --commit: Automatically commit the changes'); 