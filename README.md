# Turkey Regions & Provinces Guessing Game

This is a browser-based educational geography game about Turkey. The player selects one of Turkey's 7 official geographical regions, and must identify provinces in that region on a map without labels.

## Tech Stack
- **React 19** (UI Library)
- **TypeScript** (Static typing)
- **Vite** (Build tool)
- **Tailwind CSS v4** (Styling)
- **Zustand** (Global state management)
- **d3-geo & topojson-client** (For rendering the SVG map)
- **canvas-confetti** (For completion animations)

## Getting Started

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the provided local URL in your browser (usually `http://localhost:5173`).

## Project Structure
- `src/components`: React UI components.
- `src/data`: Static reference data (81 provinces, 7 regions).
- `src/store`: Zustand state management.
- `src/types`: TypeScript definitions.
- `src/hooks`: Custom React hooks.
- `src/utils`: Helper functions.
- `src/assets`: Static assets.
