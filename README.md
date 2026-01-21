# 🐧 Pengu - Virtual Pet v1.0

A delightful pixel-art virtual pet game built with vanilla HTML, CSS, and JavaScript. Take care of your adorable pet Pengu with interactive gameplay, customization options, and achievement system!

## ✨ Features

### 🎮 Core Gameplay
- **6 Interactive Actions**: Feed, Play, Sleep, Wash, Pet, and Train your Pengu
- **5 Dynamic Stats**: Hunger, Happiness, Energy, Health, and Level progression
- **Real-time Mood System**: Pengu's appearance changes based on current stats
- **Experience & Leveling**: Gain XP through interactions and level up your pet

### 🎯 Minigame
- **Catch the Ball**: Interactive paddle game with mouse/touch controls
- **Score-based Rewards**: Higher scores = more happiness and experience
- **Mobile Optimized**: Touch controls for mobile devices

### 💬 AI Chat System
- **Interactive Conversations**: Chat with Pengu in real-time
- **Mood-based Responses**: Pengu responds differently based on current state
- **Joke System**: Ask for jokes and get pet-themed humor
- **Keyword Recognition**: Responds to greetings, questions, and commands

### 🎨 Customization
- **5 Pet Colors**: Choose from various color schemes
- **3 Size Options**: Small, Medium, and Large pet sizes
- **5 Background Themes**: Default, Space, Forest, Ocean, and Sunset
- **Beautiful Imagery**: High-quality background images from Unsplash

### 🏆 Achievement System
- **Level Master**: Reach level 5
- **Caretaker**: Complete 50+ interactions
- **Perfect Pet**: Achieve 100% in all stats
- **Elder**: Raise your pet to 100+ days old
- **Visual Rewards**: Golden achievement badges with animations

### 💾 Data Persistence
- **Save/Load System**: Your progress is automatically saved
- **Local Storage**: Data persists between browser sessions
- **Reset Option**: Start fresh with confirmation dialog
- **Complete Backup**: All stats, achievements, and customizations saved

### 📱 Mobile Responsive
- **Touch Controls**: Full touch support for mobile devices
- **Responsive Layout**: Adapts to different screen sizes
- **Mobile-first Design**: Optimized for both desktop and mobile

## 🚀 Getting Started

### Quick Start
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start caring for your Pengu!

### GitHub Pages Deployment
1. Fork this repository
2. Go to Settings > Pages
3. Select "Deploy from a branch" and choose `main`
4. Your Pengu will be live at `https://yourusername.github.io/pengu`

## 🎯 How to Play

### Basic Care
- **🍎 Feed**: Increases hunger and health
- **🎾 Play**: Starts minigame, increases happiness
- **💤 Sleep**: Restores energy and health
- **🛁 Wash**: Improves health and happiness
- **❤️ Pet**: Shows affection, boosts happiness and health
- **🏃 Train**: Intensive exercise for maximum experience

### Chat Interaction
- Type messages to chat with Pengu
- Ask for jokes by typing "joke", "funny", or "laugh"
- Pengu responds based on current mood and keywords
- Use greetings like "hi", "hello", or "hey"

### Achievements
- Complete various milestones to unlock achievements
- Achievements are displayed as golden badges
- Each achievement triggers a special message from Pengu
- Progress is automatically saved

## 🛠️ Technical Details

### Built With
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with animations and responsive design
- **Vanilla JavaScript**: No frameworks, pure ES6+ code
- **Local Storage API**: Data persistence
- **Unsplash API**: Beautiful background images

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Lightweight: ~50KB total size
- Fast loading: No external dependencies
- Smooth animations: 60fps CSS animations
- Efficient: Minimal DOM manipulation

## 📁 Project Structure

```
Pengu/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Game logic and interactions
└── README.md           # This file
```

## 🎨 Design Philosophy

- **Pixel Art Aesthetic**: Retro gaming inspired design
- **Soft Pastel Colors**: Calming and cozy atmosphere
- **Glass Morphism**: Modern transparent UI elements
- **Minimal Interface**: Clean, uncluttered design
- **Accessibility**: High contrast and readable fonts

## 🔧 Customization

### Adding New Backgrounds
1. Find a high-quality image URL (1200x800 recommended)
2. Add CSS class in `style.css`:
```css
.bg-newtheme {
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('your-image-url') !important;
    background-size: cover;
    background-position: center;
}
```
3. Add button in HTML and update JavaScript

### Adding New Achievements
1. Add achievement logic in `checkAchievements()` function
2. Define achievement conditions and rewards
3. Achievement automatically displays when earned

## 🐛 Known Issues

- Background images require internet connection
- Data is stored locally (not synced across devices)
- Some older browsers may not support all CSS features

## 🚀 Future Enhancements (v2.0)

- Multiple pet types and breeds
- Online multiplayer features
- More minigames and activities
- Seasonal events and themes
- Pet evolution system
- Social sharing features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Background images provided by [Unsplash](https://unsplash.com)
- Pixel font: Press Start 2P from Google Fonts
- Inspired by classic Tamagotchi and virtual pet games

---

**Made with ❤️ for pet lovers everywhere!**

*Take good care of your Pengu! 🐧*