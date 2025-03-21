# Release Process

This document outlines the steps to prepare and publish a new release of @chainsafe/react-elements.

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

2. Update version in `package.json` following semver:

    - MAJOR version for incompatible API changes
    - MINOR version for backwards-compatible functionality
    - PATCH version for backwards-compatible bug fixes

3. Build the package:

   ```bash
   yarn build
   ```

4. Publish:

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
   git tag @chainsafe/react-elements@[version]
   git push origin --tags
   ```
5. Create a GitHub release with the changelog

This workflow ensures that version tags are always attached to the squashed commits in the main branch, preventing tag
loss during squash merges.
