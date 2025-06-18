# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

All development happens in the `frontend/` directory:

```bash
cd frontend
npm install        # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production (runs TypeScript check + Vite build)
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

## Architecture

This is an injury prevention application with a React + TypeScript + Vite frontend:

- **Frontend Stack**: React 19, TypeScript, Vite
- **Build Tool**: Vite with React plugin
- **Linting**: ESLint with TypeScript support
- **Structure**: Standard Vite React template structure
  - `src/App.tsx` - Main application component
  - `src/main.tsx` - Application entry point
  - `public/` - Static assets
  - `src/assets/` - Application assets

The project uses TypeScript with a project references setup (tsconfig.json references tsconfig.app.json and tsconfig.node.json).