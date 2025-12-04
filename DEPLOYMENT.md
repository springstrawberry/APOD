# Deployment Guide

This guide will help you deploy the NASA APOD Viewer application safely and securely.

## 🔐 Pre-Deployment Checklist

### 1. Environment Variables Setup

**CRITICAL**: Before deploying, you must configure your NASA API key.

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace `DEMO_KEY` with your actual NASA API key:
   ```env
   VITE_NASA_API_KEY=your_actual_api_key_here
   ```

3. Get a free API key at: [https://api.nasa.gov/](https://api.nasa.gov/)
   - NASA provides 1,000 requests per hour for free
   - Registration takes less than 1 minute

**Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

### 2. Build the Application

```bash
# Install dependencies
npm install

# Run linter to check for issues
npm run lint

# Build for production
npm run build
```

The build will create optimized files in the `dist/` directory.

### 3. Test the Production Build Locally

```bash
npm run preview
```

This will serve the production build locally for testing before deployment.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variable in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add: `VITE_NASA_API_KEY` = `your_api_key`
   - Apply to Production, Preview, and Development

### Option 2: Netlify

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

3. Set environment variable:
   - Go to Site settings → Build & deploy → Environment
   - Add: `VITE_NASA_API_KEY` = `your_api_key`

### Option 3: GitHub Pages

1. Update `vite.config.ts` to set the base path:
   ```typescript
   export default defineConfig({
     base: '/apod-viewer/', // Replace with your repo name
     plugins: [react(), tailwindcss()],
     // ... rest of config
   })
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Use a GitHub Pages deployment action or push dist/ to gh-pages branch
   ```

3. Set environment variable in GitHub:
   - Go to Settings → Secrets and variables → Actions
   - Add: `VITE_NASA_API_KEY` = `your_api_key`

### Option 4: Static Hosting (AWS S3, Google Cloud Storage, etc.)

1. Build the application:
   ```bash
   npm run build
   ```

2. Upload the `dist/` folder contents to your hosting service

3. Configure environment variables in your hosting platform

## 🔒 Security Best Practices

### Client-Side API Key Considerations

⚠️ **Important**: This application makes API calls from the browser, which means the API key will be visible in the client-side code.

**Why this is acceptable:**
- NASA's APOD API is a public API designed for this use case
- Rate limiting protects against abuse (1,000 requests/hour per key)
- No sensitive data is exposed through the API

**For enhanced security (optional):**

Consider creating a backend proxy to hide your API key:

1. Create a simple backend server (Node.js/Express example):
   ```javascript
   const express = require('express');
   const app = express();
   
   app.get('/api/apod', async (req, res) => {
     const { date } = req.query;
     const apiKey = process.env.NASA_API_KEY; // Server-side only
     const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
     const response = await fetch(url);
     const data = await response.json();
     res.json(data);
   });
   ```

2. Update `src/lib/api.ts` to call your backend instead of NASA directly

### HTTPS Configuration

- Always serve your application over HTTPS in production
- Most modern hosting platforms (Vercel, Netlify) provide this automatically

### Content Security Policy (Optional)

Add CSP headers to enhance security. Example for Netlify (`netlify.toml`):

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; img-src 'self' https://apod.nasa.gov https://*.akamaized.net; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
```

## 📊 Monitoring & Maintenance

### After Deployment

1. **Test thoroughly**: Check all features in production
2. **Monitor API usage**: Keep track of your NASA API rate limits
3. **Update dependencies**: Run `npm audit` regularly
4. **Check logs**: Monitor for errors or issues
5. **Backup data**: Although this is a stateless app, backup your configuration

### Updating the Application

```bash
# Pull latest changes
git pull

# Install any new dependencies
npm install

# Test locally
npm run dev

# Build and deploy
npm run build
vercel --prod  # or your deployment method
```

## ⚡ Performance Optimization

### Already Implemented
- ✅ Vite's optimized production build
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Lazy loading where applicable

### Optional Enhancements
- Add a CDN for static assets
- Implement caching strategies
- Use image optimization services
- Add service worker for offline support

## 🐛 Troubleshooting

### Issue: "Failed to fetch APOD"
- Check if your API key is correctly set
- Verify you haven't exceeded rate limits
- Check NASA API status: [https://status.nasa.gov/](https://status.nasa.gov/)

### Issue: Environment variables not working
- Ensure variables are prefixed with `VITE_`
- Rebuild the application after changing env vars
- Check your hosting platform's environment variable settings

### Issue: Blank page after deployment
- Check browser console for errors
- Verify the `base` path in `vite.config.ts`
- Ensure all assets are loading correctly

## 📞 Support

If you encounter issues:
1. Check the [GitHub Issues](https://github.com/denisevalerie/apod-viewer/issues)
2. Review the [NASA API documentation](https://api.nasa.gov/)
3. Create a new issue with detailed information

---

**Ready to Deploy?** ✅

Once you've:
- [ ] Set up your NASA API key in `.env`
- [ ] Tested the build locally with `npm run preview`
- [ ] Chosen a deployment platform
- [ ] Configured environment variables on the platform
- [ ] Tested all features in production

You're good to go! 🚀

