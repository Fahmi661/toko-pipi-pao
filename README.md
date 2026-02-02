<div align="center">

# 🧁 Toko Kue Pipi Pao

### *Sweet Delights, Delivered with Love* 💝

[![React](https://img.shields.io/badge/React-19.2.4-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

*A modern, AI-powered e-commerce bakery platform with real-time Telegram notifications*

[🌐 Live Demo](https://ai.studio/apps/drive/1a14jJeifeZ3hUcvQDDIzA1_rrvBpIRdi) • [📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start)

---

</div>

## ✨ Features

### 🛒 **Complete E-Commerce Experience**
- **Smart Shopping Cart** - Real-time cart management with quantity controls
- **Multiple Payment Methods** - Bank Transfer & Cash on Delivery (COD)
- **Automatic Tax & Shipping** - Intelligent calculation based on location
- **Order History** - Track all your past orders with detailed status

### 🤖 **AI-Powered Assistant**
- **Smart Chatbot** - Intelligent assistant powered by advanced AI
- **Product Recommendations** - Get personalized suggestions
- **Order Assistance** - Help with menu, pricing, and order placement
- **Natural Conversations** - Chat in Bahasa Indonesia or English

### 📱 **Telegram Integration**
- **Real-time Notifications** - Instant order alerts via Telegram
- **Order Details** - Complete order summary sent to configured chat
- **Admin Dashboard** - Manage orders through Telegram messages

### 🎨 **Beautiful User Interface**
- **Cute & Professional Design** - Pink-themed, bakery-optimized aesthetics
- **Responsive Layout** - Perfect on mobile, tablet, and desktop
- **Smooth Animations** - Delightful micro-interactions
- **Custom Scrollbars** - Themed to match the brand

### 🔊 **Enhanced User Experience**
- **Success Sound Effects** - Web Audio API generated celebration sounds
- **Visual Feedback** - Success modals and notifications
- **Loading States** - Clear feedback during operations
- **Error Handling** - Graceful degradation and user-friendly messages

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **API Key** for AI features
- **Telegram Bot Token** (Optional - for notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd toko-kue-pipi-pao
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_KEY=your_api_key_here
   VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
   VITE_TELEGRAM_CHAT_ID=your_chat_id_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

---

## 🏗️ Project Structure

```
toko-kue-pipi-pao/
├── 📄 App.tsx                 # Main application component
├── 📁 components/             # React components
│   ├── Header.tsx            # Navigation header
│   ├── Hero.tsx              # Hero section
│   ├── ProductGrid.tsx       # Product display
│   ├── PaymentModal.tsx      # Checkout modal
│   ├── AiAssistant.tsx       # Gemini chatbot
│   ├── OrderHistoryModal.tsx # Order tracking
│   └── SuccessModal.tsx      # Success feedback
├── 📄 constants.ts            # Products, rates, bank info
├── 📄 types.ts                # TypeScript interfaces
├── 📄 index.html              # HTML entry point
├── 📄 index.tsx               # React entry point
├── 📄 vite.config.ts          # Vite configuration
├── 📄 tsconfig.json           # TypeScript config
└── 📄 package.json            # Dependencies
```

---

## 🛠️ Configuration

### Telegram Setup

1. **Create a Telegram Bot**
   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Send `/newbot` and follow the instructions
   - Copy your bot token

2. **Get Your Chat ID**
   - Message your bot
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your `chat_id` in the response

3. **Update Configuration**
   - Add credentials to `.env.local`
   - Or configure via the Settings modal in the app

### AI Assistant Setup

1. Obtain an API key for the AI features
2. Add to `.env.local` as `VITE_API_KEY`
3. The AI assistant will be available in the chat bubble

---

## 📦 Product Catalog

Current menu includes:

| Product | Category | Price |
|---------|----------|-------|
| Strawberry Cloud Cake | Whole Cake | Rp 150,000 |
| Choco Lava Pao | Pao | Rp 25,000 |
| Matcha Red Bean Roll | Roll Cake | Rp 85,000 |
| Rainbow Macarons (6pcs) | Pastry | Rp 60,000 |
| Classic Cheesecake | Whole Cake | Rp 180,000 |
| Croissant Butter | Pastry | Rp 22,000 |

*Edit `constants.ts` to add or modify products*

---

## 💰 Payment & Shipping

### Payment Methods
- **Bank Transfer** - BCA 8830-1234-5678 (Pipi Pao Bakery)
- **Cash on Delivery** - Pay when your order arrives

### Shipping Rates
- Jakarta: Rp 15,000
- Bandung: Rp 20,000
- Surabaya: Rp 35,000
- Other Cities: Rp 50,000

### Tax
- PPN 11% applied to all orders

---

## 🎨 Customization

### Colors
Modify the Tailwind theme in `index.html`:
```javascript
colors: {
  pao: {
    50: '#fff0f3',   // Light pink background
    100: '#ffc2d1',  // Soft pink
    500: '#ff0040',  // Brand pink
    600: '#e00038',  // Dark pink
  }
}
```

### Fonts
- **Headings**: Fredoka (Playful, rounded)
- **Body**: Quicksand (Clean, modern)

### Products
Edit `constants.ts` to update:
- Product listings
- Prices
- Categories
- Images
- Descriptions

---

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Tech Stack

- **Frontend Framework**: React 19.2.4
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **AI**: Advanced AI Integration
- **Notifications**: Telegram Bot API

---

## 📱 Features in Detail

### Shopping Cart
- Add/remove items with smooth animations
- Quantity adjustment with +/- buttons
- Real-time total calculation
- Persistent across page reloads (localStorage)

### AI Assistant
- Floating chat bubble interface
- Contextual product knowledge
- Order assistance
- Multi-language support
- Conversation history

### Order Management
- Automatic order ID generation
- Status tracking (Confirmed → Baking → Delivered)
- Complete order history
- LocalStorage persistence

### Telegram Notifications
Format includes:
- Order ID and timestamp
- Customer details
- Itemized list with quantities
- Subtotal, tax, shipping breakdown
- Payment method
- Total amount

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized assets.

### Deploy Options

- **Vercel**: Connect GitHub repo, auto-deploy
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` branch
- **AI Studio**: Already hosted at the demo link

### Environment Variables

Remember to set these in your hosting platform:
- `VITE_API_KEY`
- `VITE_TELEGRAM_BOT_TOKEN` (optional)
- `VITE_TELEGRAM_CHAT_ID` (optional)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is available for personal and commercial use.

---

## 👨‍💻 Author

Created with 💖 by the Pipi Pao Team

---

## 🙏 Acknowledgments

- AI technology for intelligent assistance
- Telegram for reliable notifications
- React community for amazing tools
- Lucide for beautiful icons
- Picsum for placeholder images

---

<div align="center">

### 🧁 Made with love and sugar 🍰

**Pipi Pao - Where Every Bite is a Delight!**

⭐ Star this repo if you found it helpful!

</div>
