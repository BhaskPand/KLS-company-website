# Deployment Guide for KLS Solutions Website

## Option 1: Vercel (Recommended - Easiest)

### Steps:
1. **Install Vercel CLI** (optional, or use web interface):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Web Interface** (Easiest):
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect React settings
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   vercel
   ```
   Follow the prompts. For production:
   ```bash
   vercel --prod
   ```

**Build Settings** (auto-detected):
- Framework Preset: Create React App
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

**Benefits:**
- ✅ Free tier with custom domain
- ✅ Automatic HTTPS
- ✅ Automatic deployments on git push
- ✅ Global CDN
- ✅ Zero configuration needed

---

## Option 2: Netlify

### Steps:
1. **Install Netlify CLI** (optional):
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy via Web Interface**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"

3. **Deploy via CLI**:
   ```bash
   npm run build
   netlify deploy --prod --dir=build
   ```

**Benefits:**
- ✅ Free tier
- ✅ Automatic HTTPS
- ✅ Continuous deployment
- ✅ Form handling
- ✅ Easy custom domain setup

---

## Option 3: GitHub Pages

### Steps:
1. **Install gh-pages package**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   Add homepage and deploy script:
   ```json
   {
     "homepage": "https://yourusername.github.io/kls-company-website",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

**Note:** Replace `yourusername` with your GitHub username and `kls-company-website` with your repo name.

**Benefits:**
- ✅ Free
- ✅ Integrated with GitHub
- ⚠️ Requires repository to be public (or GitHub Pro for private)

---

## Option 4: AWS Amplify

### Steps:
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click "New app" → "Host web app"
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `build`
5. Click "Save and deploy"

**Benefits:**
- ✅ Free tier available
- ✅ AWS infrastructure
- ✅ Custom domain support
- ⚠️ Requires AWS account

---

## Option 5: Traditional Web Hosting (cPanel, etc.)

### Steps:
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload files**:
   - Upload the entire `build` folder contents to your web hosting's `public_html` or `www` directory
   - Use FTP, cPanel File Manager, or SSH

3. **Configure server**:
   - For Apache, create/update `.htaccess` in the build folder:
   ```apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QR,L]
   ```

**Benefits:**
- ✅ Full control
- ✅ Can use existing hosting
- ⚠️ Manual deployment process

---

## Before Deploying - Important Checks

1. **Test the build locally**:
   ```bash
   npm run build
   npm install -g serve
   serve -s build
   ```
   Visit `http://localhost:3000` to test

2. **Environment Variables** (if needed):
   - Create `.env` file for local development
   - Add environment variables in your hosting platform's dashboard

3. **Update public URLs**:
   - Check that all image paths and assets use relative paths or correct absolute paths

4. **Custom Domain** (optional):
   - Most platforms allow custom domain setup
   - Update DNS records as instructed by your hosting provider

---

## Quick Deploy Commands Summary

### Vercel:
```bash
npm install -g vercel
vercel --prod
```

### Netlify:
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build
```

### GitHub Pages:
```bash
npm install --save-dev gh-pages
# Update package.json with homepage and deploy script
npm run deploy
```

---

## Recommended: Vercel
For a React app like this, **Vercel is the easiest and most reliable option**. It's specifically optimized for React and Next.js apps, and the deployment process is seamless.


