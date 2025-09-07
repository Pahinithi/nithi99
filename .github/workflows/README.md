# GitHub Workflows for Portfolio

This directory contains GitHub Actions workflows for your portfolio website.

## Available Workflows

### 1. `deploy.yml` - GitHub Pages Deployment
- **Trigger**: Push to main/master branch, pull requests, manual dispatch
- **Purpose**: Automatically deploys your portfolio to GitHub Pages
- **Features**:
  - HTML validation using tidy
  - Basic link and asset checking
  - Automatic deployment to GitHub Pages

### 2. `ci.yml` - Continuous Integration
- **Trigger**: Push to main/master/develop branches, pull requests
- **Purpose**: Validates code quality and checks for issues
- **Features**:
  - HTML, CSS, and JavaScript validation
  - Broken link detection
  - Missing asset verification
  - Portfolio structure validation
  - Generates validation reports

### 3. `lighthouse.yml` - Performance Audit
- **Trigger**: Push to main/master branch, pull requests, manual dispatch
- **Purpose**: Runs Lighthouse performance audits
- **Features**:
  - Performance, accessibility, best practices, and SEO scoring
  - Generates detailed reports
  - Uploads results as artifacts

### 4. `security.yml` - Security Scanning
- **Trigger**: Push to main/master branch, pull requests, weekly schedule, manual dispatch
- **Purpose**: Scans for security vulnerabilities and best practices
- **Features**:
  - Trivy vulnerability scanning
  - Sensitive information detection
  - Security header validation
  - External dependency analysis

## Setup Instructions

### For GitHub Pages Deployment:
1. Go to your repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The `deploy.yml` workflow will automatically deploy your site

### For Enhanced Security Scanning:
1. Go to repository Settings → Security → Code scanning
2. Enable dependency graph and Dependabot alerts
3. The security workflow will upload results to the Security tab

### Optional: Lighthouse CI Integration
1. Create a `LHCI_GITHUB_APP_TOKEN` secret in your repository
2. This enables enhanced Lighthouse CI features

## Workflow Status

You can monitor all workflows in the "Actions" tab of your GitHub repository. Each workflow will show:
- ✅ Success status
- ❌ Failure details
- 📊 Generated reports and artifacts

## Customization

Feel free to modify these workflows based on your specific needs:
- Adjust trigger conditions
- Add or remove validation steps
- Modify deployment targets
- Add custom checks or tests

## Troubleshooting

If workflows fail:
1. Check the Actions tab for detailed error logs
2. Ensure all referenced files exist in the `Nithilan` directory
3. Verify HTML, CSS, and JavaScript syntax
4. Check that all asset links are correct
