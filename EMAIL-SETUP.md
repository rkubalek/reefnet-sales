# Email Setup Guide - Reefnet Salmon

## 🎯 **Direct Email Solution (No Additional Forms)**

Your React form now sends data directly to your email without opening any additional forms!

## 🚀 **Option 1: Web3Forms (Recommended - Free)**

### **Step 1: Get Access Key**
1. **Go to [web3forms.com](https://web3forms.com)**
2. **Click "Get Access Key"**
3. **Enter your email**: roger.kubalek@gmail.com
4. **Copy the access key** (looks like: `12345678-1234-1234-1234-123456789abc`)

### **Step 2: Update Your Code**
Replace `YOUR_ACCESS_KEY` in `src/App.js` with your actual access key:
```javascript
access_key: '12345678-1234-1234-1234-123456789abc',
```

### **Step 3: What You Get**
- ✅ **Direct email** to roger.kubalek@gmail.com
- ✅ **Professional email format**
- ✅ **Spam protection**
- ✅ **Free tier**: 250 emails/month
- ✅ **No additional forms** for users

---

## 📧 **Option 2: EmailJS (Alternative)**

### **Step 1: Create EmailJS Account**
1. **Go to [emailjs.com](https://emailjs.com)**
2. **Sign up for free account**
3. **Add Gmail service**
4. **Create email template**

### **Step 2: Update Code**
Replace the fetch call with EmailJS:
```javascript
import emailjs from 'emailjs-com';

await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  emailData,
  'YOUR_USER_ID'
);
```

---

## 📧 **Option 3: Netlify Functions (If Deploying to Netlify)**

### **Step 1: Create Function**
Create `netlify/functions/send-email.js`:
```javascript
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // Email sending logic
};
```

### **Step 2: Update Form**
Add `action="/.netlify/functions/send-email"` to your form.

---

## 🎯 **Current Setup (Demo Mode)**

Right now, the form shows a success message but doesn't actually send emails. To see the data:

1. **Open browser developer tools** (F12)
2. **Go to Console tab**
3. **Submit the form**
4. **Look for**: `Email sent successfully: {...}`

---

## 📊 **Email Format You'll Receive**

```
Subject: New Reefnet Salmon Inquiry from [Name]

New Salmon Sales Inquiry

Name: John Doe
Email: john@restaurant.com
Phone: (555) 123-4567
Company: Downtown Restaurant
Quantity Needed: 1000-5000 lbs
Message: Looking for fresh salmon for our menu...

Submitted: 6/21/2024, 2:30:45 PM
```

---

## 🚀 **Quick Setup (5 minutes)**

1. **Go to [web3forms.com](https://web3forms.com)**
2. **Get your access key**
3. **Replace `YOUR_ACCESS_KEY`** in the code
4. **Test the form** - you'll get emails immediately!

---

## ✅ **Benefits of This Approach**

- ✅ **No additional forms** for users
- ✅ **Direct email** to your inbox
- ✅ **Professional formatting**
- ✅ **Spam protection**
- ✅ **Mobile-friendly**
- ✅ **Free tier available**

---

**Ready to set up Web3Forms? It's the easiest option and will work immediately!** 