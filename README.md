# NASA APOD Viewer 🚀🌌

A beautiful, modern web application for viewing NASA's Astronomy Picture of the Day (APOD). Browse through stunning space imagery and educational content from NASA's extensive archive dating back to 1995.

![NASA APOD Viewer](public/apod.svg)

## ✨ Features

- **Daily Astronomy Content**: View NASA's Astronomy Picture of the Day with detailed explanations
- **Date Navigation**: Browse through the entire APOD archive from June 16, 1995 to today
- **Intelligent Fallback**: Automatically loads the most recent available picture if today's hasn't been published yet
- **HD Downloads**: Download high-resolution versions of images
- **Media Support**: View both images and embedded videos
- **Responsive Design**: Beautiful UI that works seamlessly on desktop and mobile devices
- **Dark Theme**: Easy on the eyes with a modern dark space-themed interface
- **Direct NASA Links**: Quick access to original NASA APOD pages

## 🛠️ Tech Stack

- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **NASA APOD API** - Official NASA API for astronomy data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- NASA API key (get one free at [https://api.nasa.gov](https://api.nasa.gov))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/denisevalerie/apod-viewer.git
cd apod-viewer
```

2. Install dependencies:
```bash
npm install
```

3. Configure your NASA API key:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your NASA API key:
     ```env
     VITE_NASA_API_KEY=your_actual_api_key_here
     ```
   - Get a free API key at [https://api.nasa.gov](https://api.nasa.gov)

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

> **Note**: The `.env` file is already in `.gitignore` to keep your API key secure.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

Ready to deploy? Check out our comprehensive [Deployment Guide](DEPLOYMENT.md) which includes:
- Environment variable setup for different platforms
- Step-by-step deployment instructions for Vercel, Netlify, GitHub Pages, and more
- Security best practices
- Performance optimization tips
- Troubleshooting common issues

## 🎨 Features in Detail

### Date Navigation
- Navigate day by day using arrow buttons
- Pick any date from the calendar picker
- Quick "Today" button to jump to the latest picture
- Automatic fallback to previous available dates

### Smart Loading
- Handles cases where APOD isn't published yet for the current day
- Automatically tries previous days if selected date has no APOD
- Clear user feedback with loading states and informative messages

### Media Viewing
- Optimized image display with proper aspect ratios
- Embedded video support for video APOD entries
- High-resolution download option when available
- Copyright attribution when applicable

## 📝 Project Structure

```
apod-viewer/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components
│   │   └── APODViewer.tsx  # Main APOD viewer component
│   ├── lib/            # Utility functions
│   │   ├── api.ts      # NASA API integration
│   │   └── utils.ts    # Helper utilities
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Root component
│   └── main.tsx        # Application entry point
├── package.json        # Project metadata and dependencies
└── vite.config.ts     # Vite configuration
```

## 🌐 API Information

This project uses the [NASA APOD API](https://api.nasa.gov/). To get your free API key:

1. Visit [https://api.nasa.gov](https://api.nasa.gov)
2. Fill out the simple form
3. Your API key will be sent to your email instantly
4. Free tier includes 1,000 requests per hour

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- NASA for providing the incredible APOD API and content
- All the astronomers and astrophotographers who contribute to APOD
- The React and Vite communities for excellent tools and documentation

## 📧 Contact

Denise Valerie - [GitHub](https://github.com/denisevalerie)

Project Link: [https://github.com/denisevalerie/apod-viewer](https://github.com/denisevalerie/apod-viewer)

---

Made with ❤️ and ☕ for space enthusiasts everywhere
