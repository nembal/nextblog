#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('NextBlog Vercel Setup');
console.log('=====================\n');
console.log('This script will help you set up your Vercel project and tokens.\n');

// Function to get Vercel token
function getVercelToken() {
  return new Promise((resolve) => {
    rl.question('Enter your Vercel API token (create one at https://vercel.com/account/tokens): ', (token) => {
      resolve(token.trim());
    });
  });
}

// Function to get project name
function getProjectName() {
  return new Promise((resolve) => {
    rl.question('Enter your Vercel project name (default: nextblog-demo): ', (name) => {
      resolve(name.trim() || 'nextblog-demo');
    });
  });
}

// Function to create a Vercel project
async function createVercelProject(token, projectName) {
  console.log(`\nCreating Vercel project: ${projectName}...`);
  
  try {
    // Check if Vercel CLI is installed
    try {
      execSync('vercel --version', { stdio: 'ignore' });
    } catch (error) {
      console.log('Installing Vercel CLI...');
      execSync('npm install -g vercel', { stdio: 'inherit' });
    }
    
    // Login to Vercel
    console.log('Logging in to Vercel...');
    execSync(`echo "y" | vercel login --token ${token}`, { stdio: 'inherit' });
    
    // Create a new project
    console.log('Creating a new project...');
    const output = execSync(`echo "y" | vercel link --token ${token}`, { encoding: 'utf8' });
    
    // Extract org ID and project ID from output
    const orgIdMatch = output.match(/Linked to ([a-zA-Z0-9]+) \(([^)]+)\) under ([a-zA-Z0-9]+)/);
    
    if (orgIdMatch && orgIdMatch.length >= 4) {
      const orgId = orgIdMatch[1];
      const projectId = orgIdMatch[3];
      
      console.log(`\nVercel project created successfully!`);
      console.log(`Organization ID: ${orgId}`);
      console.log(`Project ID: ${projectId}`);
      
      // Create a .vercel directory with project.json
      const vercelDir = path.join(process.cwd(), '.vercel');
      if (!fs.existsSync(vercelDir)) {
        fs.mkdirSync(vercelDir);
      }
      
      const projectConfig = {
        orgId,
        projectId,
        settings: {
          framework: "nextjs"
        }
      };
      
      fs.writeFileSync(
        path.join(vercelDir, 'project.json'),
        JSON.stringify(projectConfig, null, 2)
      );
      
      // Add .vercel to .gitignore if it's not already there
      const gitignorePath = path.join(process.cwd(), '.gitignore');
      if (fs.existsSync(gitignorePath)) {
        const gitignore = fs.readFileSync(gitignorePath, 'utf8');
        if (!gitignore.includes('.vercel')) {
          fs.appendFileSync(gitignorePath, '\n# Vercel\n.vercel\n');
        }
      }
      
      console.log('\nVercel configuration saved to .vercel/project.json');
      console.log('This directory has been added to .gitignore');
      
      return { orgId, projectId };
    } else {
      console.error('Could not extract organization and project IDs from Vercel output.');
      return null;
    }
  } catch (error) {
    console.error('Error creating Vercel project:', error.message);
    return null;
  }
}

// Main function
async function main() {
  const token = await getVercelToken();
  const projectName = await getProjectName();
  
  const projectInfo = await createVercelProject(token, projectName);
  
  if (projectInfo) {
    console.log('\nNext steps:');
    console.log('1. Add the following secrets to your GitHub repository:');
    console.log(`   - VERCEL_TOKEN: ${token}`);
    console.log(`   - VERCEL_ORG_ID: ${projectInfo.orgId}`);
    console.log(`   - VERCEL_PROJECT_ID: ${projectInfo.projectId}`);
    console.log('2. Push your changes to GitHub to trigger the deployment');
    console.log(`3. Your site will be available at: https://${projectName}.vercel.app`);
  }
  
  rl.close();
}

main(); 