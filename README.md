# Nishant Kumar - Portfolio Website 🚀

A modern, vibrant, and interactive portfolio website showcasing my skills as a Software & Cloud Engineer. Built with pure HTML, CSS, and JavaScript.

## ✨ Features

- **Responsive Design** - Fully responsive across all devices (mobile, tablet, desktop)
- **Dark/Light Mode** - Auto-detects system preference with manual toggle
- **Smooth Animations** - Intersection Observer for scroll-triggered animations
- **Interactive Components** - Typewriter effect, animated skill bars, 3D card tilts
- **Modular Architecture** - Clean, maintainable ES6 module structure
- **Vibrant Theme** - Sunset gradient color palette (coral → magenta → purple)

## 🎨 Design

- **Color Palette**: Coral (#FF6B6B), Magenta (#C44569), Purple (#6C5CE7), Lime Accent (#00D9A5)
- **Typography**: Modern sans-serif with gradient text effects
- **Effects**: Glassmorphism, floating shapes, hover animations

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6)** - Modules, classes, async/await
- **No Frameworks** - Pure vanilla JavaScript

## 📁 Project Structure

```
Portfolio Website/
├── index.html              # Main HTML file
├── css/
│   ├── variables.css      # CSS custom properties & color palette
│   ├── styles.css         # Core styling
│   ├── animations.css     # Keyframe animations
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js           # Entry point
│   ├── theme.js          # Theme manager
│   ├── navigation.js     # Navigation & smooth scroll
│   ├── animations.js     # Scroll animations
│   └── components/
│       ├── skillBars.js     # Animated skill bars
│       ├── projectCards.js  # Project filtering & cards
│       └── typewriter.js    # Typing animation effect
├── data/
│   └── content.json      # All content data
└── assets/
    ├── images/           # Project & profile images
    └── icons/            # Icons & favicons
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/nishantdeploys/Portfolio.git
   cd Portfolio
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```

3. **Or use a local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

## 🐳 Docker

Build the image:
```bash
docker build -t portfolio:latest .
```

Run the container:
```bash
docker run --rm -p 8080:80 portfolio:latest
```

Open http://localhost:8080

## ☸️ Kubernetes (Generic)

Apply manifests:
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

Port-forward to access locally:
```bash
kubectl port-forward svc/portfolio 8080:80
```

Open http://localhost:8080

## 📝 Customization

All content is centralized in `data/content.json`. Update this file to customize:
- Skills & proficiency levels
- Projects & descriptions
- Experience timeline
- Education history
- Achievements & certifications
- Contact information

## 🌐 Deployment

Deploy easily to:
- **GitHub Pages** - Push to `gh-pages` branch
- **Vercel** - Connect GitHub repo
- **Netlify** - Drag & drop or GitHub integration

## 📧 Contact

- **Email**: nishant098097@gmail.com
- **Phone**: +91 7480985252
- **GitHub**: [@nishantdeploys](https://github.com/nishantdeploys)
- **LinkedIn**: [Nishant Kumar](https://www.linkedin.com/in/nishxnt/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using HTML, CSS, and JavaScript**
