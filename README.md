# Mumak Web

<span>![GitHub Release](https://img.shields.io/github/v/release/0420syj/mumak-web)
</span>
<span>![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/0420syj/mumak-web/.github%2Fworkflows%2Fci.yml)</span>

<span>![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=mumak-web-moomin-money)</span>
<span>[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://main--65e0ddfd5157def71497f3a5.chromatic.com/)</span>

Mumak on the WWW

## Introduction

Monorepo for Mumak Web applications.

- [Moomin Money](https://mumak-web-moomin-money.vercel.app/): a personal finance app
- [UI](https://main--65e0ddfd5157def71497f3a5.chromatic.com/) : a component library with [shadcn/ui](https://ui.shadcn.com/)

## Structure

This monorepo is managed by [Turborepo](https://turborepo.dev/). It contains several packages and applications:

### Apps and Packages

- `moomin-money`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `@repo/ui`: a React component library with [shadcn/ui](https://ui.shadcn.com/) with [Vite](https://vitejs.dev/)
- `@repo/utils`: a collection of utility functions
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/tailwind-config`: `tailwind.config.js` used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).
