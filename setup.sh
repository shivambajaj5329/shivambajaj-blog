#!/bin/bash

echo "🚀 Setting up your Hugo blog..."

# Check if Hugo is installed
if ! command -v hugo &> /dev/null
then
    echo "❌ Hugo is not installed. Please install Hugo first:"
    echo "   https://gohugo.io/installation/"
    exit 1
fi

echo "✅ Hugo is installed"

# Add PaperMod theme as submodule
echo "📦 Adding PaperMod theme..."
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
git submodule update --init --recursive

echo "✅ PaperMod theme added"

# Create a placeholder profile image
echo "📸 Creating placeholder for profile image..."
mkdir -p static
touch static/profile.jpg
echo "   ⚠️  Don't forget to replace static/profile.jpg with your actual photo!"

echo ""
echo "✨ Setup complete! Next steps:"
echo ""
echo "1. Add your profile photo to static/profile.jpg"
echo "2. Update hugo.toml with your info (social links, etc.)"
echo "3. Run 'hugo server -D' to start the dev server"
echo "4. Visit http://localhost:1313 to see your site"
echo "5. Create new posts with 'hugo new posts/my-post.md'"
echo ""
echo "Happy blogging! 🎉"
