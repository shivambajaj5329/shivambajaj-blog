# Deployment Guide - Vercel (5 minutes)

This guide will get your blog live on shivambajaj.com in under 5 minutes.

## Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial blog setup with PaperMod"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/yourusername/blog.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New" > "Project"
3. Import your blog repository
4. Configure:
   - **Framework Preset**: Hugo
   - **Build Command**: `hugo --gc --minify`
   - **Output Directory**: `public`
   - **Install Command**: (leave default)

5. Add Environment Variable:
   - Name: `HUGO_VERSION`
   - Value: `0.139.3`

6. Click "Deploy"

Wait ~1 minute for build to complete!

## Step 3: Add Custom Domain

1. In Vercel project settings, go to "Domains"
2. Click "Add Domain"
3. Enter: `shivambajaj.com`
4. Vercel will show you DNS settings to configure

## Step 4: Configure DNS

Go to your domain registrar (GoDaddy, Namecheap, etc.) and add:

### Option A: Using Nameservers (Recommended)
Point your nameservers to Vercel:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### Option B: Using A/CNAME Records
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Step 5: Wait for DNS Propagation

DNS changes can take 5 minutes to 48 hours. Check status:
```bash
# Check if DNS has propagated
dig shivambajaj.com
```

## Done! 🎉

Your blog is now live at https://shivambajaj.com

## Updating Your Blog

Just push to GitHub:
```bash
# Make changes to posts
git add .
git commit -m "New post about system design"
git push

# Vercel auto-deploys in ~30 seconds
```

## Common Issues

**Build failing?**
- Check HUGO_VERSION is set to 0.139.3
- Make sure themes/PaperMod exists as a submodule

**404 on homepage?**
- Check baseURL in hugo.toml matches your domain
- Ensure it starts with https://

**Mermaid diagrams not rendering?**
- Clear browser cache
- Check browser console for errors

**Domain not working?**
- DNS can take up to 48 hours
- Verify DNS settings with `dig shivambajaj.com`

## Need Help?

- Hugo Docs: https://gohugo.io/documentation/
- PaperMod Docs: https://github.com/adityatelange/hugo-PaperMod/wiki
- Vercel Support: https://vercel.com/support
