# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application that provides a local, browser-based version of Excalidraw. All drawings are stored in browser localStorage and never leave the user's device.

## Commands

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run analyze` - Analyze bundle size with @next/bundle-analyzer

### Testing
- `npm run test` - Run all tests (prettier, lint, typecheck, jest)
- `npm run jest` - Run Jest tests only
- `npm run jest:watch` - Run Jest in watch mode
- `npm run typecheck` - TypeScript type checking
- `npm run lint` - Run ESLint and Stylelint
- `npm run prettier:check` - Check code formatting

### Code Quality
- `npm run prettier:write` - Format all TypeScript files

### Storybook
- `npm run storybook` - Start Storybook dev server on port 6006
- `npm run storybook:build` - Build Storybook to storybook-static/

## Architecture

### State Management

The application uses a client-side state architecture with two main data models:

1. **ExcalidrawLocally** (models/storage.ts) - The localStorage data structure containing:
   - `currentFileId` - ID of the currently active file
   - `files` - Record mapping file IDs to ExcalidrawFile objects

2. **ExcalidrawFile** - Individual drawing file containing:
   - `fileId` - Unique identifier (UUID or "untitled")
   - `fileName` - User-editable display name
   - `elements` - Excalidraw drawing elements

### Data Persistence

All data is stored in localStorage under the key `https://github.com/marty-anz/excalidraw-locally`. The storage layer (models/storage.ts) provides:
- `getExcalidrawLocally()` - Load data from localStorage
- `saveExcalidrawLocally()` - Persist data to localStorage
- `getCurrentFile()` - Get the active file with fallback to "untitled"
- `newFile()` - Create new file and handle special "untitled" file migration

### Component Architecture

The app uses Next.js App Router with a single-page architecture:

- **app/page.tsx** - Entry point rendering Welcome component
- **Welcome.tsx** - Main container using Mantine AppShell with:
  - Header: App title, burger menu, filename editor, new file button
  - Navbar: File list with FileNavLink components for switching/deleting files
  - Main: ExcalidrawWrapper component

- **ExcalidrawWrapper** - Dynamically imports @excalidraw/excalidraw with SSR disabled (required for Excalidraw)

### Key Patterns

1. **File Switching**: Clicking a file in the navbar updates `currentFileId` in localStorage and calls `excalidrawAPI.updateScene()` to refresh the canvas

2. **Untitled File Migration**: When creating a new file, if an "untitled" file exists, it's migrated to a UUID-based ID to prevent conflicts

3. **State Synchronization**: Changes to drawings auto-save via onChange handler that updates currentFile.elements and calls saveExcalidrawLocally()

4. **Theme Integration**: Mantine color scheme is synced to Excalidraw's theme prop

## Path Aliases

TypeScript is configured with `@/*` mapping to project root, so imports use `@/components/`, `@/models/`, etc.

## Framework & Libraries

- **Next.js 16** with App Router and Turbopack
- **React 19** with automatic JSX runtime
- **Mantine 8.3** for UI components
- **Excalidraw 0.18** (dynamically imported, SSR disabled)
- **Testing**: Jest + React Testing Library
- **Styling**: PostCSS with mantine-postcss-preset

## TypeScript Configuration

- **moduleResolution**: "bundler" (required for modern package exports)
- **jsx**: "react-jsx" (React automatic runtime, set by Next.js 16)
- Type imports from Excalidraw use the new export path: `@excalidraw/excalidraw/element/types`
