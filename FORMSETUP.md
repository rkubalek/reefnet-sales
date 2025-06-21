# Form Setup Guide - Reefnet Salmon

## 🎯 **Where Form Responses Go (Current Options)**

### **Option 1: Formspree (Recommended - Easiest)**

**Step 1: Create Formspree Account**
1. Go to [formspree.io](https://formspree.io)
2. Sign up for free account
3. Create a new form
4. Copy your form ID (looks like: `xrgjabrg`)

**Step 2: Update Your Code**
Replace `YOUR_FORM_ID` in `src/App.js` with your actual form ID:
```javascript
const response = await fetch('https://formspree.io/f/xrgjabrg', {
```

**Step 3: What You Get**
- ✅ Email notifications for every form submission
- ✅ Dashboard to view all submissions
- ✅ Export data to CSV
- ✅ Spam protection
- ✅ Free tier: 50 submissions/month

---

### **Option 2: Netlify Forms (If Deploying to Netlify)**

**Step 1: Add form attributes**
```html
<form className="contact-form" onSubmit={handleSubmit} data-netlify="true" name="reefnet-salmon-inquiries">
```

**Step 2: What You Get**
- ✅ Built into Netlify dashboard
- ✅ Email notifications
- ✅ Spam filtering
- ✅ Free tier: 100 submissions/month

---

### **Option 3: Google Sheets Integration**

**Step 1: Create Google Sheet**
1. Create new Google Sheet
2. Set up columns: Name, Email, Phone, Company, Quantity, Message, Timestamp

**Step 2: Use Google Apps Script**
- More complex setup but free
- Responses go directly to your spreadsheet

---

## 📧 **Current Setup (Console Only)**

Right now, form submissions only log to browser console. To see them:

1. **Open browser developer tools** (F12)
2. **Go to Console tab**
3. **Submit the form**
4. **Look for**: `Lead captured: {name: "...", email: "..."}`

---

## 🚀 **Recommended Next Steps**

1. **Set up Formspree** (easiest option)
2. **Test the form** with your email
3. **Deploy to live website**
4. **Monitor submissions** in Formspree dashboard

---

## 📊 **What You'll See in Formspree Dashboard**

- **Real-time submissions**
- **Contact details**
- **Quantity requirements**
- **Custom messages**
- **Timestamp of inquiry**
- **Export to CSV/Excel**

---

## 🔧 **Alternative: EmailJS (Direct Email)**

If you prefer direct email notifications:

```javascript
// Install: npm install emailjs-com
import emailjs from 'emailjs-com';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        quantity: formData.quantity,
        message: formData.message,
      },
      'YOUR_USER_ID'
    );
    
    setIsSubmitted(true);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

**Need help setting up any of these options? Let me know which one you prefer!** 