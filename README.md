# Anniversary Website 💕

A beautiful, romantic website created to celebrate your special anniversary! This website features a password-protected login and elegant design to showcase your love story.

## Features

- 🔒 **Secure Login**: Password-protected access to keep your memories private
- 📱 **Responsive Design**: Beautiful on all devices (desktop, tablet, mobile)
- 💝 **Photo Gallery**: Showcase your favorite moments together
- 📅 **Love Timeline**: Display your relationship milestones
- ⏰ **Live Counter**: Shows days, hours, and minutes you've been together
- 💌 **Memory Cards**: Share special notes and promises
- ✨ **Smooth Animations**: Elegant transitions and effects
- 🎨 **Modern UI**: Clean, romantic design with beautiful gradients

## Quick Setup

1. **Change the Password**: 
   - Open `script.js`
   - Line 2: Change `"ourlove2025"` to your desired password
   
2. **Update Your Anniversary Date**:
   - Open `script.js`
   - Line 147: Change the date in `new Date('2023-01-15')` to when you started dating

3. **Add Your Photos**:
   - Replace the placeholder divs in `index.html` with your actual photos
   - Look for `<div class="image-placeholder">` sections

4. **Customize Your Story**:
   - Update the timeline events in the Timeline section
   - Modify the memory cards with your own messages
   - Change titles and text to match your relationship

## File Structure

```
anniversary/
├── index.html      # Main HTML structure
├── style.css       # All styling and animations
├── script.js       # Interactive functionality
└── README.md       # This file
```

## How to Use

1. Open `index.html` in a web browser
2. Enter your password (default: "ourlove2025")
3. Navigate through the different sections:
   - **Home**: Anniversary celebration with live counters
   - **Gallery**: Photo collection of your memories
   - **Timeline**: Important milestones in your relationship
   - **Memories**: Love notes and special messages

## Customization Tips

### Adding Real Photos
Replace the placeholder sections with actual images:

```html
<!-- Replace this: -->
<div class="image-placeholder">
    <i class="fas fa-image"></i>
    <p>Photo 1</p>
</div>

<!-- With this: -->
<img src="path/to/your/photo.jpg" alt="Description" style="width: 100%; border-radius: 15px;">
```

### Changing Colors
The main colors are defined in CSS variables. You can change them in `style.css`:
- Primary pink: `#e91e63`
- Light pink: `#f06292`
- Background gradients: Various gradient combinations

### Adding More Sections
You can easily add new sections by:
1. Adding a new nav link in the header
2. Creating a new section with class="section"
3. Adding the navigation logic in `script.js`

## Security Features

- Password protection for access
- Session-based authentication
- Disabled right-click context menu
- Disabled developer tools shortcuts

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support  
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Hosting Options

You can host this website on:
- **GitHub Pages** (free)
- **Netlify** (free)
- **Vercel** (free)
- Any web hosting service

Simply upload all files to your hosting service and share the URL with your partner!

## Anniversary Website Checklist

- [ ] Change the password in `script.js`
- [ ] Update your relationship start date
- [ ] Add your real photos
- [ ] Customize timeline events
- [ ] Update memory card messages
- [ ] Test on mobile devices
- [ ] Share with your partner! 💕

---

**Made with ❤️ for your special day!**

*Remember: The most important thing is not the website itself, but the love and memories you're celebrating together.*
