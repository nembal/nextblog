#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Preparing to publish NextBlogX to npm...${NC}"

# Check if user is logged in to npm
echo -e "${YELLOW}Checking npm login status...${NC}"
NPM_USER=$(npm whoami 2>/dev/null)
if [ $? -ne 0 ]; then
  echo -e "${RED}You are not logged in to npm. Please login:${NC}"
  npm login
else
  echo -e "${GREEN}Logged in as: $NPM_USER${NC}"
fi

# Confirm publishing
echo -e "${YELLOW}Are you sure you want to publish NextBlogX to npm? (y/n)${NC}"
read -r CONFIRM
if [[ $CONFIRM != "y" && $CONFIRM != "Y" ]]; then
  echo -e "${RED}Publishing cancelled.${NC}"
  exit 1
fi

# Run tests and build
echo -e "${YELLOW}Running build...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed. Please fix the issues before publishing.${NC}"
  exit 1
fi

# Publish to npm
echo -e "${YELLOW}Publishing to npm...${NC}"
npm publish
if [ $? -eq 0 ]; then
  echo -e "${GREEN}NextBlogX has been successfully published to npm!${NC}"
else
  echo -e "${RED}Failed to publish to npm. Please check the error message above.${NC}"
  exit 1
fi 