# AI Chatbot Website - Setup Guide

## 📋 Project Overview

This is a dynamic, responsive web application featuring:
- **AI Chatbot**: Real-time chat powered by Gemini API
- **Top 3 News**: AI-generated trending headlines
- **Fun Facts**: Interesting facts generation
- **Responsive Design**: Works seamlessly on desktop and mobile

## 📁 Project Files

```
Chat_Bot/
├── index.html          # Main HTML structure
├── styles.css          # Responsive CSS styling
├── script.js           # Frontend JavaScript logic
├── chatbot.php         # Backend API handler
└── README.md           # This file
```

## ⚙️ Setup Requirements

### Required:
1. **PHP Server** (5.6 or higher)
2. **cURL Extension** (enabled in PHP)
3. **Internet Connection** (for Gemini API calls)
4. **Gemini API Key** (included in chatbot.php)

### Optional:
- Local PHP server (PHP built-in server)
- XAMPP, WAMP, or LAMP stack for full server setup

## 🚀 How to Run

### Option 1: Using PHP Built-in Server (Easiest)

1. Open Terminal/PowerShell in the Chat_Bot folder
2. Run:
   ```bash
   php -S localhost:8000
   ```
3. Open browser and go to: `http://localhost:8000`

### Option 2: Using XAMPP/WAMP

1. Place the Chat_Bot folder in htdocs (XAMPP) or www (WAMP)
2. Start Apache and PHP services
3. Access via: `http://localhost/Chat_Bot`

### Option 3: Deploy to Web Host

1. Upload all files to your hosting server
2. Ensure PHP version 5.6+ is available
3. Access via your domain

## 💡 Features

### 1. Chatbot
- Real-time messaging with AI responses
- Powered by Gemini API
- Smooth typing indicators
- Auto-scrolling conversation

### 2. Top 3 News
- Click "Generate News" to get latest headlines
- AI-generated realistic news items
- Stylish card layout with hover effects
- Numbered display (1, 2, 3)

### 3. Fun Facts
- Click "Generate Facts" for interesting facts
- Diverse and educational content
- Beautiful card presentation
- Smooth animations

### 4. UI/UX
- Tab-based navigation
- Responsive design (desktop, tablet, mobile)
- Smooth transitions and animations
- Professional gradient styling
- Accessibility-friendly

## 🔧 Configuration

### Change Gemini API Key

Open `chatbot.php` and replace:
```php
$apiKey = "AIzaSyDpHSzoZqnJihOcnB5Eo6LcYkZ4VGi8afw";
```

### Customize Response Length

In `chatbot.php`, adjust `maxOutputTokens`:
```php
"maxOutputTokens" => 1024  // Change this value (default: 1024, max: 2048)
```

### Adjust Temperature (Creativity)

In `chatbot.php`:
```php
"temperature" => 0.7  // 0.0 = factual, 1.0 = creative
```

## 🎨 Styling Customization

Edit `styles.css` to change:

- **Colors**: Root CSS variables at the top
- **Fonts**: Font-family in body selector
- **Sizes**: Adjust font-size values
- **Spacing**: Modify padding and margin values

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers

## ⚠️ Troubleshooting

### "Failed to fetch response"
- Check internet connection
- Verify Gemini API key is correct
- Ensure PHP cURL is enabled

### Blank responses
- Check browser console (F12) for errors
- Verify API key has valid quota
- Try refreshing the page

### Styling issues
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+F5)
- Check all files are in same folder

### Chat not working
- Ensure chatbot.php is in same directory as index.html
- Check PHP is running
- Verify AJAX requests in Network tab (F12)

## 📊 API Information

- **API**: Google Gemini API (Free Tier)
- **Model**: gemini-pro
- **Rate Limits**: Check Google API documentation
- **Cost**: Free for most use cases

## 🔒 Security Notes

- API key is visible in chatbot.php (for demo purposes)
- For production: Store API key in environment variables
- Never commit API key to public repositories
- Use .env files and load via PHP

## 📧 Support

For issues or questions:
1. Check browser console (F12) for errors
2. Verify all files are in the same directory
3. Ensure PHP and cURL are working
4. Check API key validity

## 🎯 Next Steps

1. **Test Chat**: Type a question and verify response
2. **Test News**: Click "Generate News" button
3. **Test Facts**: Click "Generate Facts" button
4. **Mobile**: Test responsiveness on mobile device
5. **Deploy**: Upload to your hosting server

## 📝 License

Free to use and modify for personal or commercial projects.

---

**Enjoy your AI Chatbot! 🎉**
