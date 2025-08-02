
# Clinical Trial Budget Forecaster

A modern React-based web application designed to help clinical trial budget specialists plan and forecast budgets for industry-sponsored studies. Built with React, TypeScript, and Tailwind CSS — no backend required. Data is saved using `localStorage`.

🚀 **Live Demo**: [https://jasonsim.github.io/CTA-Budget/](https://jasonsim.github.io/CTA-Budget/)

---

## 📌 Purpose

This app simplifies early-stage budget planning by allowing users to:
- Enter study fees and customizable revenue items
- Set a target enrollment and forecast revenue
- Track personnel costs (per patient or flat rate)
- Keep consult notes within the same interface
- Export and import data using JSON

Ideal for academic or research budget specialists who need flexibility, clarity, and speed during industry negotiations.

---

## 🎨 Design Goals

- Modern, clean, and professional interface
- Intuitive workflow with minimal clicks
- Responsive design (desktop and tablet-friendly)
- Persistent local data storage
- Quick note-taking during sponsor calls or team meetings

---

## 🚀 Features

### 🧾 Budget Inputs
- **Startup Fees**: IRB, Ethics, Archiving, Pharmacy, etc.
- **Visit Schedule**: Add any number of visits with custom per-visit payments
- **Overhead %**: Apply institutional or departmental overhead rate
- **Custom Revenues**: Add flexible line items (e.g., SAE reimbursement, Re-consent fee)

### 🎯 Enrollment
- **Total Target Enrollment** input (e.g., 20 patients)
- Forecasts are based entirely on this number — no monthly pacing needed

### 👥 Personnel Cost Section
Two types of entries:
1. **Per-patient/visit roles**:
   - Enter staff role, hourly rate, and hours per patient or per visit
   - Auto-calculate total cost based on target enrollment
2. **Flat/monthly roles**:
   - Enter fixed monthly fee and number of months
   - Ideal for PI oversight retainers

Personnel cost summary included in total budget and margin calculations.

### 📈 Forecast Output
- Summary table with per-patient and total budget
- Total cost breakdown (including startup, personnel, and overhead)
- Optional margin: Revenue – Total Site Cost
- Revenue visualization using Chart.js (line or bar chart)

### 💾 Storage & Data Handling
- All data stored in browser `localStorage`
- Export/import full budgets as `.json` files
- Useful for versioning or sharing

### 🗒️ Notes Section
- Free-text "Consultation Notes" area
- Auto-saves to localStorage
- Use during calls with sponsors or PIs to capture changes or assumptions

---

## 🧰 Tech Stack

- React 19 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Chart.js with react-chartjs-2 for interactive charts
- localStorage API for data persistence
- GitHub Actions for automated deployment

---

## 📂 Setup & Development

### Local Development

1. Clone this repository
2. Navigate to the app directory:
   ```bash
   cd cta-budget-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:5173 in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `cta-budget-app/dist` directory.

## 🚀 GitHub Pages Deployment

This repository is configured for automatic deployment to GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy the app
3. Access the live app at: https://[your-username].github.io/CTA-Budget/

To enable GitHub Pages in your repository:
1. Go to Settings → Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. The workflow will run automatically on the next push to `main`

---

## 🔄 Roadmap

### ✅ MVP Goals (Current)
- [x] Budget input forms
- [x] Custom revenue lines
- [x] Target enrollment-driven forecasts
- [x] Personnel cost builder (per-patient and flat fee)
- [x] Forecast table and chart
- [x] Notes section
- [x] localStorage persistence
- [x] Export/import as JSON

### 🚧 Future Plans
- [ ] Optional Firebase or Supabase backend
- [ ] Support for multiple saved budgets
- [ ] PDF/CSV report export
- [ ] Role-based cost tags (e.g., billable vs. non-billable)
- [ ] Authentication (for multi-user environments)

---

## 🙌 Author

Built by Jason Sim, Clinical Trial Budget Specialist  
Location: Vancouver, BC 🇨🇦
