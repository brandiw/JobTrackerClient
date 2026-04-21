# Brandi's Job Tracker

A React-based job application tracking application that helps you organize your job search, manage companies, track applications, and save interview notes all in one place.

## Features

- **Company Management**: Store and manage a list of target companies with their locations and websites
- **Application Tracking**: Track job applications through various stages (Applied, Initial Screen, Code Test, Interviewing, Closed, Rejected, Offer)
- **Interview Notes**: Save and manage interview notes and next steps for each application
- **Sortable Tables**: Sort companies alphabetically by name or location
- **Dashboard**: View an overview of your job search progress
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- **React** (v19.2.5) - UI framework
- **TypeScript** (v6.0.2) - Type-safe JavaScript
- **Vite** (v8.0.9) - Fast build tool and development server
- **React Router** (v7.14.1) - Client-side routing
- **Material-UI (MUI)** (v9.0.0) - Component library
  - @mui/material - UI components
  - @mui/icons-material - Icon library
- **Emotion** (v11.14.0+) - CSS-in-JS styling
- **ESLint** (v9.39.4) - Code linting
- **TypeScript ESLint** - TypeScript linting

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page with app overview and navigation |
| `/dashboard` | Dashboard | Dashboard view with job search progress |
| `/companies` | Companies | List of all companies with sortable table |
| `/companies/new` | NewCompany | Form to add a new company |
| `/applications` | AllApplications | List of all job applications |
| `/applications/:companyId` | Applications | List of applications for a specific company |
| `/applications/:companyId/new` | NewApplication | Form to add a new application for a company |
| `/application/:applicationId` | ApplicationDetail | Detailed view of an application with interview notes |
| `/applications/:applicationId/notes/new` | NewInterviewNote | Form to add a new interview note |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will start on `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```
