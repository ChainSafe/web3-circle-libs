# Release Process

This document outlines the steps to prepare and publish a new release of @circle-libs/react-elements.

## Before Release

1. Ensure all changes are committed and pushed to the main branch
2. Run the full test suite and check all tests pass:

   ```bash
   yarn lint
   yarn build
   ```

3. Check the `dist` folder to ensure all necessary files are generated

## Creating a Release

1. Create a new branch for the release:
   ```bash
   git checkout -b release/v[version]
   ```

### Beta Release

1. Update version in `package.json` to include beta tag (e.g., "0.1.0-beta.1")
2. Build the package:
   ```bash
   yarn build
   ```
3. Publish with beta tag:
   ```bash
   npm publish --tag beta --access public
   ```

### Stable Release

1. Update version in `package.json` following semver:
   - MAJOR version for incompatible API changes
   - MINOR version for backwards-compatible functionality
   - PATCH version for backwards-compatible bug fixes
2. Build the package:
   ```bash
   yarn build
   ```
3. Publish:
   ```bash
   npm publish --access public
   ```

## After Release

1. Create a pull request from the release branch to main
2. After the PR is approved, squash merge it to main
3. Once the PR is merged, checkout the main branch and pull the latest changes:
   ```bash
   git checkout main
   git pull origin main
   ```
4. Now create and push the version tag on the squashed commit:
   ```bash
   git tag v[version]
   git push origin --tags
   ```
5. If this was a beta release that is now stable, update release notes with what changed
6. Create a GitHub release with the changelog

This workflow ensures that version tags are always attached to the squashed commits in the main branch, preventing tag loss during squash merges.
