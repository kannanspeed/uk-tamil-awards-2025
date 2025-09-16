# UK Tamil Awards 2025 Website

A beautiful, modern website for the UK Tamil Awards 2025 event built with HTML, CSS, and JavaScript.

## Features

### 🎨 Design Elements
- **Modern Glassmorphism Header** - Transparent header with blur effects
- **Parallax Scrolling Hero** - Dynamic background with countdown timer
- **Card Hover Effects** - Interactive announcement cards
- **Split Content Layout** - About event section with statistics
- **Circular Profile Cards** - Founder members showcase
- **Interactive Cards** - Co-founder members with flip effects
- **Filterable Grid** - Team members with category filters
- **Pricing Cards** - Ticket selection with hover effects
- **Tiered Packages** - Sponsor rate cards with different tiers
- **Contact Form + Map** - Interactive contact section
- **Interactive Map** - Event hall directions
- **Masonry Grid** - Event gallery with lightbox
- **Logo Carousel** - Auto-scrolling sponsor logos
- **Contact Cards** - Contact information display
- **Multi-column Footer** - Comprehensive footer with newsletter

### ⏰ Countdown Timer
- Real-time countdown showing days, hours, minutes, and seconds
- Set to countdown 15 days from the current date
- Updates every second automatically

### 📱 Mobile-First Design
- **Primary focus on mobile devices** - Optimized primarily for smartphones
- **Touch-friendly interactions** - All buttons and interactive elements sized for touch
- **Mobile-optimized layouts** - Single-column layouts, reduced padding, smaller fonts
- **Touch feedback** - Visual feedback for touch interactions
- **Mobile performance** - Optimized images, reduced animations, lazy loading
- **Responsive scaling** - Adapts beautifully to tablets and desktops
- **Mobile-specific features** - Prevent zoom on double-tap, smooth scrolling, web app capabilities

### 🎯 Interactive Features
- Smooth scrolling navigation
- Filterable content sections
- Image lightbox gallery
- Form validation and submission
- Auto-scrolling carousels
- Hover animations and effects
- Scroll progress indicator

## File Structure

```
uktamilawards/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styling and animations
├── script.js           # JavaScript functionality
├── package.json        # Node.js dependencies and scripts
├── server.js           # Express server for deployment
├── render.yaml         # Render deployment configuration
└── README.md           # This file
```

## How to Use

### Local Development
1. **Open the Website**: Simply open `index.html` in any modern web browser
2. **Run with Node.js**: Use `npm start` to run the Express server locally
3. **Navigation**: Use the header navigation to jump to different sections
4. **Countdown Timer**: The hero section shows a live countdown to the event
5. **Filter Content**: Use filter buttons in Members and Gallery sections
6. **View Gallery**: Click on gallery images to open them in a lightbox
7. **Contact Form**: Fill out the contact form to send inquiries
8. **Ticket Selection**: Click on ticket options to select packages
9. **Sponsor Packages**: Choose from different sponsorship tiers

### Deployment on Render

#### Option 1: Deploy from GitHub Repository
1. **Push to GitHub**: Push this repository to your GitHub account
2. **Connect to Render**: 
   - Go to [render.com](https://render.com)
   - Sign up/Login with your GitHub account
   - Click "New +" and select "Web Service"
3. **Configure Deployment**:
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` configuration
   - The service will be named "uk-tamil-awards-2025"
4. **Deploy**: Click "Create Web Service" and Render will automatically deploy your site

#### Option 2: Manual Configuration
1. **Create New Web Service** on Render
2. **Set Build Command**: `npm install`
3. **Set Start Command**: `npm start`
4. **Set Environment**: Node.js
5. **Deploy**: Your site will be available at a `*.onrender.com` URL

#### Environment Variables
- `NODE_ENV`: Set to `production` (automatically configured in render.yaml)
- `PORT`: Automatically set by Render (no configuration needed)

## Customization

### Changing the Countdown Date
In `script.js`, modify the target date in the `initCountdownTimer()` function:
```javascript
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 15); // Change 15 to desired days
```

### Updating Content
- **Event Information**: Edit the content in `index.html`
- **Images**: Replace placeholder images with actual event photos
- **Contact Information**: Update contact details in the contact sections
- **Sponsor Logos**: Replace placeholder sponsor logos with actual ones

### Styling Changes
- **Colors**: Modify the CSS custom properties in `styles.css`
- **Fonts**: Change the Google Fonts import in `index.html`
- **Layout**: Adjust grid layouts and spacing in `styles.css`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Mobile Performance Features

- **Lazy loading for images** - Faster page load times
- **Optimized animations** - Reduced motion for better performance
- **Touch-optimized scrolling** - Smooth native scrolling
- **Efficient event handling** - Optimized for mobile devices
- **Mobile-optimized interactions** - Touch feedback and gestures
- **Web app capabilities** - Can be installed as a PWA
- **Responsive images** - Automatically optimized for different screen sizes
- **Reduced motion support** - Respects user accessibility preferences

## Contact

For any questions or support regarding this website, please contact the development team.

---

**Built with ❤️ for the UK Tamil Awards 2025**
