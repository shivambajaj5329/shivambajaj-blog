# Quick Start Guide

Get your blog running in 3 steps:

## 1. Install Hugo

**macOS**:
```bash
brew install hugo
```

**Windows** (with Chocolatey):
```bash
choco install hugo-extended
```

**Linux**:
```bash
sudo snap install hugo
```

Or download from: https://gohugo.io/installation/

## 2. Setup the Blog

```bash
# Run the setup script
./setup.sh

# Or manually:
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

## 3. Start Writing!

```bash
# Run the dev server
hugo server -D

# Create a new post
hugo new posts/my-first-post.md

# Edit the post in content/posts/my-first-post.md
# Visit http://localhost:1313 to see it live!
```

## Next Steps

- [ ] Add your profile photo to `static/profile.jpg`
- [ ] Update social links in `hugo.toml`
- [ ] Write your first post
- [ ] Follow `DEPLOYMENT.md` to go live

## Writing Tips

### Post Template
```markdown
---
title: "My Post Title"
date: 2026-01-03T12:00:00-05:00
draft: false
tags: ["system-design", "architecture"]
description: "Post description for SEO"
---

Your content here...
```

### Add Mermaid Diagrams
```markdown
\`\`\`mermaid
graph TB
    A[Start] --> B[Process]
    B --> C[End]
\`\`\`
```

### Add Code Blocks
```markdown
\`\`\`python
def hello():
    print("Hello, world!")
\`\`\`
```

## Common Commands

```bash
# Start dev server with drafts
hugo server -D

# Build for production
hugo --gc --minify

# Create new post
hugo new posts/post-name.md

# Check Hugo version
hugo version
```

## Need Help?

Check out:
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deployment guide
- Example posts in `content/posts/`

Happy blogging! 🚀
