# Mumak Web

Mumak on the WWW

## Introduction

Monorepo for Mumak Web applications.

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
