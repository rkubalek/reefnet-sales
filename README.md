# Reefnet Salmon Sales Landing Page

A professional React-based landing page for capturing sales leads for reefnet salmon. Perfect for restaurants, retailers, and distributors looking to source premium, sustainable salmon.

## 🎯 Features

- **Professional Design**: Modern, responsive landing page with beautiful UI
- **Lead Capture Form**: Comprehensive contact form to capture potential customer information
- **Mobile Responsive**: Works perfectly on all devices
- **Fast Performance**: Optimized React app with minimal bundle size
- **Easy Customization**: Simple to modify content, colors, and branding

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd reefnet-sales
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000) (or the next available port).

## 📝 Customization

### Updating Content
- **Company Information**: Edit contact details in `src/App.js`
- **Product Details**: Modify the features section to match your specific offerings
- **Form Fields**: Add or remove form fields as needed for your business

### Styling
- **Colors**: Update the color scheme in `src/App.css`
- **Layout**: Modify the CSS classes to adjust spacing and layout
- **Typography**: Change fonts and text styling

### Lead Capture Integration
Currently, the form logs data to the console. To integrate with your backend:

1. **Email Service**: Connect to services like SendGrid, Mailgun, or AWS SES
2. **CRM Integration**: Send leads to Salesforce, HubSpot, or other CRM systems
3. **Database**: Store leads in your own database

Example integration in `handleSubmit` function:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      setIsSubmitted(true);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
```

## 🚀 Deployment

### Option 1: Netlify (Recommended)
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Deploy automatically on every push

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the project directory
3. Follow the prompts

### Option 3: AWS S3 + CloudFront
1. Build the app: `npm run build`
2. Upload the `build` folder to S3
3. Configure CloudFront for CDN

### Option 4: Traditional Web Hosting
1. Build the app: `npm run build`
2. Upload the `build` folder to your web server

## 📊 Analytics & SEO

### Google Analytics
Add your Google Analytics tracking code to `public/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### SEO Optimization
- Meta tags are already configured
- Consider adding structured data for local business
- Optimize images and add alt text
- Ensure fast loading times

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## 📱 Mobile Optimization

The app is fully responsive and optimized for:
- Mobile phones
- Tablets
- Desktop computers
- All modern browsers

## 🎨 Design System

### Colors
- Primary Blue: `#1e40af`
- Secondary Blue: `#3b82f6`
- Accent Orange: `#f59e0b`
- Text Dark: `#1e293b`
- Text Light: `#6b7280`

### Typography
- System fonts for optimal performance
- Responsive font sizes
- Clear hierarchy with proper contrast

## 📞 Support

For questions about customizing or deploying this app, consider:
- React documentation
- Create React App documentation
- Your hosting provider's documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for sustainable seafood businesses**
