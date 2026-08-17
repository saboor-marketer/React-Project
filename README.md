# GitHub Repository Analytics Dashboard

A production-quality React application that analyzes any public GitHub user's repositories and displays comprehensive analytics through a modern, responsive dashboard.

![GitHub Analytics Dashboard](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.2.11-purple)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3)

## 🌟 Features

- **User Profile Analysis**: Fetch and display comprehensive GitHub user profiles
- **Repository Analytics**: 
  - Total repositories, stars, forks, and watchers
  - Top repositories ranked by stars
  - Language distribution visualization
  - Repository activity timeline
- **Interactive Filtering & Sorting**:
  - Search repositories by name and description
  - Filter by programming language
  - Sort by various metrics (stars, forks, popularity, etc.)
- **Popularity Score**: Custom algorithm calculating repository popularity based on stars, forks, and watchers
- **Modern UI/UX**:
  - Dark mode with theme persistence
  - Responsive design (mobile-first)
  - Skeleton loading states
  - Beautiful error and empty states
  - Smooth animations and transitions
- **Performance Optimized**:
  - React hooks for state management
  - Memoized calculations
  - Efficient API usage with pagination support

## 🚀 Technologies Used

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.2.11
- **CSS Framework**: Bootstrap 5.3.3
- **Chart Library**: Chart.js 4.4.2 with react-chartjs-2
- **Language**: JavaScript ES6+
- **API**: GitHub REST API (unauthenticated public endpoints)

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── ProfileCard.jsx
│   ├── StatCard.jsx
│   ├── TopRepositoryCard.jsx
│   ├── LanguageChart.jsx
│   ├── ActivityChart.jsx
│   ├── RepositoryTable.jsx
│   ├── RepositoryFilters.jsx
│   ├── LoadingSkeleton.jsx
│   ├── ErrorState.jsx
│   └── EmptyState.jsx
├── services/           # API service layer
│   └── githubApi.js
├── utils/              # Utility functions
│   ├── analytics.js
│   ├── formatters.js
│   └── dateUtils.js
├── hooks/              # Custom React hooks
│   └── useGithub.js
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and design system
```

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd github-analytics-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🏃 Running Locally

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚢 Deployment

The application can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use the `dist` folder as the source

## 🔧 API Usage

This application uses the GitHub REST API with the following endpoints:

- **User Profile**: `GET https://api.github.com/users/{username}`
- **Repositories**: `GET https://api.github.com/users/{username}/repos?per_page=100&sort=updated`

### Important API Limitations

**Repository Traffic/Views**: The application does **not** display repository view counts or traffic statistics because:
- GitHub's traffic API requires authentication for most users
- Traffic data is not available for arbitrary public users through the unauthenticated API
- Attempting to fetch traffic data would result in 404 errors for most repositories

Instead, the application uses publicly available metrics:
- Stars ⭐
- Forks 🍴
- Watchers 👁️
- Open issues 🐛
- Repository size 📦
- Last updated date 📅
- Programming languages 💻
- Custom popularity score calculation

### Rate Limiting

The GitHub public API has rate limits:
- Unauthenticated requests: 60 requests per hour
- The application handles rate limit errors gracefully with user-friendly messages

## 🎨 Design System

The application uses a comprehensive CSS variable-based design system:

- **Light/Dark Themes**: Fully supported with localStorage persistence
- **Color Palette**: GitHub-inspired colors with semantic naming
- **Typography**: Inter font family with consistent type scale
- **Spacing**: Consistent spacing scale (4px, 8px, 16px, 24px, 32px)
- **Border Radius**: Rounded corners (8px, 12px, 16px)
- **Shadows**: Subtle, layered shadows for depth

## 🧪 Testing

The application has been tested with:

1. **Valid usernames**: `octocat`, `facebook`, `google`
2. **Invalid usernames**: Non-existent users
3. **Empty inputs**: Blank search fields
4. **Edge cases**: Users with no repositories, single repository
5. **Filtering**: Search, language filters, sorting
6. **Dark mode**: Theme switching and persistence
7. **Responsive design**: Mobile, tablet, desktop layouts
8. **Error handling**: Network failures, API rate limits

## 📊 Analytics Calculations

### Popularity Score

```
Popularity Score = (Stars × 5) + (Forks × 3) + Watchers
```

This is an application-generated metric and not an official GitHub metric.

### Activity Groups

Repositories are categorized by their `updated_at` date:
- **Recently**: Updated within the last 7 days
- **This month**: Updated 8-30 days ago
- **1-6 months**: Updated 31-180 days ago
- **More than 6 months**: Updated 180+ days ago

## 🔒 Security

- No backend required - frontend-only application
- No authentication needed for public GitHub data
- No secrets or API keys stored
- All API calls made directly from the browser
- Safe handling of user input and API responses

## 🌐 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚧 Future Improvements

- [ ] Add authentication for enhanced API limits
- [ ] Implement caching for frequently accessed profiles
- [ ] Add more chart types and visualizations
- [ ] Support for comparing multiple users
- [ ] Export analytics data as PDF/CSV
- [ ] Add contribution graph visualization
- [ ] Implement PWA capabilities
- [ ] Add unit and integration tests

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Note**: This application uses the GitHub REST API and is subject to GitHub's terms of service and API usage policies. Please use responsibly and respect rate limits.
