# Updated Files - Small Avatar on Homepage

I've updated your blog to show:
- Small 80px circular avatar next to intro text
- Blog posts immediately visible on homepage
- No landing page, just content

## Files Changed

1. **hugo.toml** - Updated config to use homeInfoParams instead of profileMode
2. **layouts/_default/list.html** - Custom layout to show avatar + posts

## To See the Changes

```bash
# Copy the new files to your blog directory
# Then restart Hugo:
hugo server -D
```

## Add Your Photo

Put your photo at `static/profile.jpg` - any square image works, it'll be displayed as an 80px circle.

## What You'll See

Homepage now shows:
```
[tiny circular photo]  Hey, I'm Shivam 👋
                       Software Engineer working on distributed systems...

5 Lessons from Processing 50 Million Daily Events
After years of building Dragon - our automated event management...
January 2, 2026 · 4 min · Shivam Bajaj

Designing a Distributed Event Processing System  
How to design a scalable event processing system that handles...
January 3, 2026 · 6 min · Shivam Bajaj
```

Clean, minimal, content-first - but with a subtle human touch.
