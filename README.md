# Patient Management System

A React-based web app for managing patient records. Fetches initial data from a mock API and handles all CRUD operations locally in state.

## Description

This project displays a list of patients in a card-based interface. Each card can be expanded to show additional details. Users can add, edit, and delete patients through modals with form validation. All changes are local, nothing gets persisted to a backend.

Key workflows:

- View patient grird with search and sort capabilities
- Expand/collapse patient cards to see more details
- Add new patients via a modal form
- Edit existing patient info
- Delete patients after confirmation
- Form validation using React Hook Form + Zod

## Technologies Used

- **React 19** + **TypeScript**
- **Vite** - build tool and dev server
- **React Hook Form** - form state management
- **Zod** - schema validation
- **Styled Components** - component styling
- **Framer Motion** - animations and transitions
- **React Toastify** - toast notifications
- **React Icons** - icon library

## Features

### Patient List

- Fetches initial patient data from a mock API (`/users` endpoint)
- Displays patients in a responsive card grid
- Each card shows avatar, name, and truncated description
- Click to expand/collapse card for full details (website link, creation date)

### Search & Filter

- Real-time search by patient name (debounced for performance)
- Sort options: Name (A-Z, Z-A), Created date (Oldest, Newest)
- Empty state when no search results match

### Add Patient

- Opens a modal with a form
- Fields: Name (required), Avatar URL (optional), Website (optional, must be valid URL), Description (required)
- Generates unique ID and timestamp on creation
- Local state update only

### Edit Patient

- Click edit on any patient card
- Pre-fills form with existing data
- Updates patient in local state on save

### Delete Patient

- Removes patient from local state

### Form Validation

- **Name**: Required
- **Avatar**: Optional URL for profile image
- **Website**: Optional, but must be a valid URL if provided
- **Description**: Required

### UI/UX

- Avatar fallback: shows user initials if image fails to load or no URL provided
- Toast notifications for all actions (add, edit, delete)
- Smooth animations when cards appear/disappear (Framer Motion)
- Responsive design

## How to Run Locally

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

4. Open your browser to `http://localhost:5173` (or the port shown in terminal)

### Additional Commands

```bash
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run lint:fix    # Fix auto-fixable lint errors
npm run format      # Format code with Prettier
npm run type-check  # Run TypeScript compiler without emitting files
```

## Notes

- This project **does not persist data** to a backend server
- All create, update, and delete operations happen **locally in React state**
- On page refresh, the app re-fetches the original mock data and loses any local changes
- The mock API endpoint is configured in `src/api/http.ts`
- Form validation errors appear inline below each field as you type
