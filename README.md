# Zimaad's Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, mobile-first design, and a cool coding terminal.

## What I Built

This portfolio showcases my journey as a developer through an interactive experience. The main highlight is a clickable terminal that toggles between a shell showing my coding journey and a portfolio object with my details.

### Key Features
- **Interactive Terminal**: Click to switch between shell commands and portfolio data
- **Typing Animations**: Smooth text animations for the hero section
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Scrolling**: Animated sections that reveal as you scroll
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Project Timeline**: Desktop timeline layout with mobile card layout

## What I Learned

### React & TypeScript
- **useState & useEffect**: Managing component state and side effects
- **useRef**: Creating references for DOM manipulation and animations
- **Custom Hooks**: Organizing complex logic into reusable functions
- **TypeScript**: Adding type safety to React components and props

### CSS & Animations
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **CSS Animations**: Creating smooth transitions and keyframe animations
- **CSS Grid & Flexbox**: Modern layout techniques for complex designs

### Performance & UX
- **Intersection Observer**: Triggering animations when elements come into view
- **RequestAnimationFrame**: Smooth animations without blocking the main thread
- **Mobile Optimization**: Touch-friendly interactions and performance tuning
- **Accessibility**: Proper focus states and keyboard navigation

### Development Workflow
- **Vite**: Fast build tool and development server
- **Git**: Version control and collaboration
- **Component Architecture**: Breaking down complex UI into reusable pieces
- **Debugging**: Using browser dev tools and React DevTools

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: CSS Animations, Framer Motion
- **Build Tool**: Vite
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Montserrat, Roboto)

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Zimaad/portfolio
cd my-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## Project Structure

```
src/
├── components/
│   └── ui/
│       └── splash-cursor.tsx    # Interactive background effect
├── App.tsx                      # Main application component
├── main.tsx                     # Application entry point
└── index.css                    # Global styles and Tailwind imports
```

## Customization

### Personal Information
Update the following in `src/App.tsx`:
- Name and title in the hero section
- About me text
- Skills and technologies
- Project details
- Contact information

### Styling
- Colors: Modify the Tailwind classes or add custom colors in `tailwind.config.js`
- Animations: Adjust timing and effects in the CSS sections
- Layout: Update grid layouts and responsive breakpoints

### Adding Projects
1. Add project data to the projects section
2. Include project images in the `public` folder
3. Update the mobile and desktop layouts accordingly

## Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use the `gh-pages` package
- **Firebase Hosting**: Use Firebase CLI

## Mobile Testing

To test the mobile experience on your laptop:
1. Open browser dev tools (F12)
2. Click the mobile device icon (📱)
3. Select different device sizes or set custom dimensions
4. Test touch interactions and responsive behavior

## Key Takeaways

Building this portfolio taught me the importance of:

- **Performance optimization**: Smooth animations require careful attention to performance
- **User experience**: Small details like proper touch targets make a big difference
- **Code organization**: Clean, readable code is essential for maintainability
- **Testing**: Regular testing across different devices and browsers


