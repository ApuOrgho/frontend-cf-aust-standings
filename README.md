# Codeforces Contest Standings - AUST

A web application to fetch and display Codeforces contest standings filtered for Ahsanullah University of Science & Technology (AUST) users.  
Built with **FastAPI** backend and **React** frontend, designed for local development and production deployment.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Fetch live Codeforces contest standings using the official Codeforces API.
- Filter standings by a predefined list of AUST user handles.
- Display global and filtered AUST standings side by side.
- Download standings snapshot as PNG image.
- Responsive design with fixed-position logos and clear UI.
- Support for local development and production with environment-based API URLs.

---

## Tech Stack

- **Backend:** FastAPI, Python, httpx
- **Frontend:** React, Axios, html2canvas
- **Deployment:** Railway (Backend), Vercel (Frontend)

---

## Project Structure

```
/
├── backend/                    # Backend folder (FastAPI)
│   ├── main.py                # Main FastAPI app with API endpoints
│   ├── cf_api.py              # Codeforces API helper functions
│   ├── aust_handles.py        # List of AUST handles (backend)
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables for backend (not committed)
│   ├── __pycache__/           # Python cache files (ignored)
│   └── venv/                  # Virtual environment folder (ignored)
│
├── frontend/                   # Frontend folder (React)
│   ├── public/                # Public static files like images
│   │   ├── images/            # Images like logos, background, etc.
│   │   └── index.html         # Main HTML file
│   ├── src/                   # React source code
│   │   ├── App.js             # Main React component
│   │   ├── api.js             # API request helpers
│   │   ├── handles/           # List of AUST handles (frontend)
│   │   ├── components/        # React UI components like standings table
│   │   ├── style.css          # CSS styles
│   │   └── index.js           # ReactDOM render entry point
│   ├── .env                   # Frontend environment variables (not committed)
│   ├── package.json           # Frontend dependencies and scripts
│   ├── package-lock.json      # Auto-generated lock file for npm
│   └── node_modules/          # npm dependencies (ignored)
│
├── .gitignore                 # Git ignore rules for both backend and frontend
├── README.md                  # Project documentation
```
