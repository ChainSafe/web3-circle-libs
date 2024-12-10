# Notes for maintainers

## Features

- ⚛️ [React 18](https://reactjs.org/)
- 📚 [Storybook 7](https://storybook.js.org/) - Components preview
- 🖌️ [Tailwind CSS 3](https://tailwindcss.com/)
- ⏩ [Vite](https://vitejs.dev/) - Run and build the project blazingly fast!
- ⚡ [Vitest](https://vitest.dev/) - Components Unit Testing
- 📐 [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) - Formatting and Linting
- 🌟 [Typescript](https://www.typescriptlang.org/)
- 🐶 [Husky](https://typicode.github.io/husky) & [Lint Staged](https://www.npmjs.com/package/lint-staged) - Pre-commit Hooks
- ⏰ [Release Please](https://github.com/googleapis/release-please) — Generate the changelog with the release-please workflow
- 👷 [Github Actions](https://github.com/features/actions) — Releasing versions to NPM
- Initial components setup using [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

## Getting Started

1. Clone your repo
2. Install dependencies with `yarn`
3. Run `yarn prepare` command to setup [Husky](https://typicode.github.io/husky) pre-commit hooks.
4. Run `yarn build` to build.
5. Check the scripts at [this-folder]/package.json like `yarn dev` to run the `storybook`.

## Main Scripts

Always prepending `yarn`:

- `dev`: Bootstrap the Storybook preview with Hot Reload.
- `build:storybook`: Builds the static storybook project.
- `build`: Builds the component library into the **dist** folder.
- `lint:fix`: Applies linting based on the rules defined in **.eslintrc.js**.
- `format:prettier`: Formats files using the prettier rules defined in **.prettierrc**.
- `test`: Runs testing using watch mode.
- `test:cov`: Runs testing displaying a coverage report.

## Used template

This template was created based on: [here](https://igna.hashnode.dev/vite-react-typescript-component-library-template-setup-explanation).
