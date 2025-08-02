# Clinical Trial Budget Forecaster

A modern React application for planning and forecasting clinical trial budgets. Built with TypeScript, Vite, and Tailwind CSS.

## Features

- **Startup Fees**: Track IRB, Ethics, Archiving, Pharmacy, and other fees
- **Visit Schedule**: Dynamic table for visit names and payments
- **Overhead**: Apply institutional overhead percentages
- **Custom Revenue Items**: Flexible revenue tracking (Flat, Per Patient, Per Visit)
- **Target Enrollment**: Set patient numbers for forecasting
- **Personnel Costs**: Track per-patient/visit and flat/monthly costs
- **Forecast Summary**: Visual charts and comprehensive budget breakdown
- **Notes Section**: Consultation notes with auto-save
- **Data Persistence**: localStorage with JSON export/import

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- React 19 with TypeScript
- Vite for fast builds
- Tailwind CSS for styling
- Chart.js for visualizations
- localStorage for data persistence

## Usage

1. Enter startup fees in the Startup Fees section
2. Add visits with their payment amounts
3. Set your target enrollment number
4. Add any custom revenue items
5. Enter personnel costs (hourly or monthly)
6. View the forecast summary with charts
7. Export/import your budget as JSON

All data is automatically saved to your browser's localStorage.