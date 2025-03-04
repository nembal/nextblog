#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('NextBlog GitHub Repository Setup');
console.log('================================\n');

rl.question('GitHub username or organization name: ', (username) => {
  rl.question('Repository name (default: nextblog): ', (repoName) => {
    const repo = repoName || 'nextblog';
    
    console.log(`\nSetting up GitHub repository: ${username}/${repo}\n`);
    
    try {
      // Initialize git if not already initialized
      try {
        execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
        console.log('Git repository already initialized.');
      } catch (error) {
        console.log('Initializing git repository...');
        execSync('git init', { stdio: 'inherit' });
      }
      
      // Add all files
      console.log('Adding files to git...');
      execSync('git add .', { stdio: 'inherit' });
      
      // Initial commit if needed
      try {
        execSync('git rev-parse HEAD', { stdio: 'ignore' });
        console.log('Repository already has commits.');
      } catch (error) {
        console.log('Creating initial commit...');
        execSync('git commit -m "Initial commit"', { stdio: 'inherit' });
      }
      
      // Add GitHub remote
      console.log('Adding GitHub remote...');
      try {
        execSync('git remote remove origin', { stdio: 'ignore' });
      } catch (error) {
        // Ignore if origin doesn't exist
      }
      
      execSync(`git remote add origin https://github.com/${username}/${repo}.git`, { stdio: 'inherit' });
      
      console.log('\nGitHub repository setup complete!');
      console.log('\nNext steps:');
      console.log('1. Create a new repository on GitHub: https://github.com/new');
      console.log(`2. Push to GitHub: git push -u origin main`);
      console.log('3. Set up Vercel deployment: https://vercel.com/import/git');
      console.log('4. Add VERCEL_TOKEN secret to GitHub repository for CI/CD');
      
      rl.close();
    } catch (error) {
      console.error('Error setting up GitHub repository:', error.message);
      rl.close();
    }
  });
}); 