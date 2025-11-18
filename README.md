# KLS Tech Solution - Smart Home Automation Website

A modern, responsive website for KLS Tech Solution featuring smart home automation solutions, built with React, Tailwind CSS, GSAP animations, and Spline 3D.

## 🚀 Quick Start Guide

### Prerequisites

Before running this project, make sure you have the following installed on your system:

- **Node.js** (version 14.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

To check if you have them installed, run:
```bash
node --version
npm --version
```

### 📦 Installation Steps

#### Step 1: Copy the Project Files

Copy the entire `klsts` folder to your new system. You need these files and folders:
```
klsts/
├── public/
├── src/
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

**Note:** You do NOT need to copy the `node_modules` folder - it will be installed automatically.

#### Step 2: Navigate to Project Directory

Open your terminal/command prompt and navigate to the project folder:

```bash
cd klsts
```

#### Step 3: Install Dependencies

Install all required packages:

```bash
npm install
```

This will install all dependencies listed in `package.json`. This may take a few minutes.

#### Step 4: Start the Development Server

Run the development server:

```bash
npm start
```

The app will automatically open in your browser at [http://localhost:3000](http://localhost:3000)

If it doesn't open automatically, manually navigate to `http://localhost:3000` in your browser.

---

## 📋 Available Scripts

### `npm start`
Runs the app in development mode. The page will reload automatically when you make changes.

### `npm run build`
Builds the app for production. Creates an optimized `build` folder ready for deployment.

### `npm test`
Launches the test runner in interactive watch mode.

---

## 🛠️ Technologies Used

- **React** - UI library
- **Tailwind CSS** - Styling framework
- **GSAP** - Animation library
- **ScrollTrigger** - Scroll-based animations
- **Lenis** - Smooth scrolling
- **Spline** - 3D interactive elements
- **Lucide React** - Icon library

---

## 📁 Project Structure

```
klsts/
├── public/              # Static files
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Custom styles
│   ├── index.js        # Entry point
│   ├── index.css       # Global styles with Tailwind
│   └── ...
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── README.md           # This file
```

---

## 🔧 Troubleshooting

### Port Already in Use

If port 3000 is already in use, you'll see an error. You can either:
1. Stop the other application using port 3000
2. Use a different port by setting the PORT environment variable:
   ```bash
   PORT=3001 npm start
   ```

### Module Not Found Errors

If you see "Module not found" errors:
1. Delete the `node_modules` folder (if it exists)
2. Delete `package-lock.json`
3. Run `npm install` again

### Spline 3D Not Loading

The Spline 3D scene might take a moment to load. If it doesn't appear:
- Check your internet connection (Spline loads from external URL)
- Check browser console for any errors
- The site will still work without the 3D background

### Build Errors

If you encounter build errors:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🌐 Deployment

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy Options

You can deploy the `build` folder to:
- **Netlify** - Drag and drop the build folder
- **Vercel** - Connect your GitHub repo
- **GitHub Pages** - Use `gh-pages` package
- **Any static hosting service**

---

## 📝 Environment Requirements

- **Node.js**: 14.0.0 or higher
- **npm**: 6.0.0 or higher (or yarn 1.22.0+)
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

---

## 💡 Tips

1. **First Time Setup**: The initial `npm install` may take 5-10 minutes depending on your internet speed.

2. **Hot Reload**: The development server automatically reloads when you save changes to files.

3. **Browser DevTools**: Open browser DevTools (F12) to see any console errors or warnings.

4. **Git**: If using Git, make sure to add `node_modules/` to your `.gitignore` file.

---

## 📞 Support

If you encounter any issues:
1. Check that Node.js and npm are properly installed
2. Ensure all dependencies are installed (`npm install`)
3. Check the browser console for error messages
4. Verify you're in the correct directory (`klsts`)

---

## ✅ Quick Checklist

- [ ] Node.js installed (check with `node --version`)
- [ ] npm installed (check with `npm --version`)
- [ ] Project files copied to new system
- [ ] Navigated to project directory (`cd klsts`)
- [ ] Dependencies installed (`npm install`)
- [ ] Development server started (`npm start`)
- [ ] Browser opened to `http://localhost:3000`

---

**Happy Coding! 🎉**
