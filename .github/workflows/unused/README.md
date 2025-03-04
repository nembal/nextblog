# Unused GitHub Workflows

This directory contains GitHub workflow files that are not currently being used in the project.

## Files

- `setup-vercel.yml`: Used to set up Vercel tokens as GitHub secrets
- `vercel-deploy.yml`: Used to deploy to Vercel from GitHub Actions

## Why they're not used

These workflows are not needed because the project is using Vercel's native GitHub integration for automatic deployments. When you connect your GitHub repository to Vercel through their dashboard, Vercel automatically sets up the necessary hooks and configurations for deployment.

If you want to switch to manual deployments via GitHub Actions in the future, you can move these files back to the parent directory. 