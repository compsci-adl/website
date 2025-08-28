#!/usr/bin/env node
const { execSync } = require('node:child_process');

try {
    execSync('git --version', { stdio: 'ignore' });
    execSync('npx simple-git-hooks', { stdio: 'inherit' });
} catch {
    console.log('Git not found, skipping git hooks installation');
}
