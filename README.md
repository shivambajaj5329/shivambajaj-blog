# Shivam Bajaj's Blog

A clean, minimal blog focused on system design, distributed systems, and software architecture. Built with Hugo and the PaperMod theme.

## 🚀 Quick Start

### Prerequisites
- Hugo Extended (v0.120.0 or higher) - [Install Hugo](https://gohugo.io/installation/)
- Git

### Installation

1. **Clone this repository**
   ```bash
   git clone <your-repo-url>
   cd shivambajaj-blog
   ```

2. **Add the PaperMod theme**
   ```bash
   git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
   git submodule update --init --recursive
   ```

3. **Run locally**
   ```bash
   hugo server -D
   ```
   
   Visit `http://localhost:1313` to see your site!

## 📝 Writing Posts

Create a new post:
```bash
hugo new posts/my-new-post.md
```

Post structure:
```markdown
---
title: "Your Post Title"
date: 2026-01-03T12:00:00-05:00
draft: false
tags: ["system-design", "architecture"]
categories: ["Engineering"]
description: "A brief description"
---

Your content here...
```

### Adding Diagrams with Mermaid

Mermaid is already configured! Just use code blocks:

```markdown
\`\`\`mermaid
graph TB
    A[Client] --> B[Load Balancer]
    B --> C[Server 1]
    B --> D[Server 2]
\`\`\`
```

## 🎨 Customization

### Update Site Info
Edit `hugo.toml`:
- `baseURL`: Your domain
- `title`: Your name
- `description`: Site description
- Social links in `params.socialIcons`

### Profile Photo
Add your photo to `/static/profile.jpg`

### Favicons
Generate favicons and add to `/static/`:
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`

Use [RealFaviconGenerator](https://realfavicongenerator.net/) to create them.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects Hugo, but verify settings:
   - **Build Command**: `hugo --gc --minify`
   - **Output Directory**: `public`
   - **Install Command**: Leave default
6. Add environment variable: `HUGO_VERSION` = `0.139.3`
7. Deploy!

### Deploy to Netlify

1. Push to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Connect to your repo
5. Build settings:
   - **Build command**: `hugo --gc --minify`
   - **Publish directory**: `public`
6. Add environment variable: `HUGO_VERSION` = `0.139.3`
7. Deploy!

### Deploy to GitHub Pages

1. Create `.github/workflows/hugo.yml`:
```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
      
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.139.3'
          extended: true
      
      - name: Build
        run: hugo --gc --minify
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

2. In your repo settings:
   - Go to Settings > Pages
   - Source: GitHub Actions
   - Push to main branch

### Custom Domain

After deploying, add your custom domain:

**Vercel**: Settings > Domains > Add Domain  
**Netlify**: Site settings > Domain management > Add custom domain  
**GitHub Pages**: Settings > Pages > Custom domain

Add these DNS records:
```
A     @     76.76.21.21
CNAME www   your-site.vercel.app (or netlify, etc.)
```

## 📁 Directory Structure

```
shivambajaj-blog/
├── content/
│   ├── posts/           # Blog posts go here
│   ├── about.md         # About page
│   └── search.md        # Search page
├── layouts/
│   └── partials/
│       └── extend_head.html  # Mermaid.js integration
├── static/              # Images, favicons, etc.
├── themes/
│   └── PaperMod/       # Theme (git submodule)
└── hugo.toml           # Site configuration
```

## ✅ Features

- ✨ Clean, minimal design
- 🌙 Dark mode support
- 📊 Mermaid diagram support
- 🔍 Built-in search
- 📱 Fully responsive
- ⚡ Lightning fast
- 🎯 SEO optimized
- 📖 Reading time estimates
- 🏷️ Tags and categories
- 📋 Code copy buttons

## 🤝 Contributing

Found a typo or want to improve something? Feel free to open a PR!

## 📄 License

MIT License - feel free to use this setup for your own blog!

---

Built with [Hugo](https://gohugo.io/) and [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
