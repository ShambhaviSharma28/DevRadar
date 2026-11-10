# 🔎 DevRadar — GitHub Developer Explorer

Discover developers. Explore their work.

DevRadar is a responsive web application that allows users to explore GitHub profiles and repositories using the GitHub REST API.

Search for any GitHub username, view their developer profile, discover their repositories, and filter and sort their work through a clean and intuitive interface.

## ✨ Features

### 👤 GitHub Profile Explorer
- Search GitHub users by username.
- View profile avatar and full name.
- Display username, bio and location.
- View follower, following and public repository counts.
- Direct link to the user's GitHub profile.

### 📂 Repository Explorer
- Display the user's public repositories.
- View repository descriptions.
- Display programming languages.
- View star and fork counts.
- Check the last updated date.
- Direct links to individual repositories.

### 🔍 Search, Filter & Sort
- Search repositories by name.
- Filter repositories by programming language.
- Sort repositories by:
  - Most stars
  - Recently updated
  - Repository name
- Reset filters to restore the default view.

### ⚡ User Experience
- Responsive design for desktop and mobile devices.
- Loading state while fetching GitHub data.
- Error handling for invalid usernames.
- Empty username validation.
- Empty state when no repositories match the filters.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Vite | Development server and build tool |
| CSS3 | Styling and responsive design |
| GitHub REST API | Fetching GitHub profile and repository data |
| Git & GitHub | Version control |

## 🚀 Getting Started

Follow these instructions to run DevRadar locally.

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/ShambhaviSharma28/DevRadar.git
```

### 2. Navigate to the project directory

```bash
cd DevRadar
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access DevRadar.

### 5. Build for production

```bash
npm run build
```

## 🌐 API Reference

DevRadar uses the public GitHub REST API.

- User profile: `https://api.github.com/users/{username}`
- User repositories: `https://api.github.com/users/{username}/repos`

Public API requests are subject to GitHub's unauthenticated rate limits.

## 📱 Responsive Design

DevRadar is designed to provide a smooth experience across desktop, tablet and mobile screen sizes.

## 🔮 Future Improvements

- Repository pagination.
- Dark mode.
- Advanced repository filtering.
- Repository language statistics.
- Developer comparison.
- Improved API rate-limit handling.

## 👩‍💻 Author

**Shambhavi Sharma**

- GitHub: [@ShambhaviSharma28](https://github.com/ShambhaviSharma28)

---

⭐ If you find DevRadar interesting, consider giving the repository a star!

**Built with curiosity and a love for development.** ❤️