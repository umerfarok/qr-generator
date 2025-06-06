# QR Code Generator with Animated Backgrounds v2.0

A modern QR code generator powered by Animated Backgrounds v2.0, featuring dynamic themed animations, interactive particles, and comprehensive performance monitoring.

## 🚀 Features

- **QR Code Generation**: Create QR codes for URLs, text, email, and phone numbers
- **Animated Backgrounds v2.0**: 
  - 🎨 8 Themes (gaming, portfolio, landing, presentation, wellness, party, cyberpunk, retro)
  - 🎮 Interactive animations with mouse/touch support
  - 🏗️ Layered backgrounds with blend modes
  - 🎛️ Full animation controls (play/pause/speed)
  - 📊 Real-time performance monitoring
  - 📱 Mobile optimized with gesture support
- **Export Options**: Download as PNG or PDF
- **Customization**: QR color, background color, error correction levels

## 🛠️ Installation & Setup

### Standard Installation
```bash
npm install
npm start
```

### Local Development with Animated Backgrounds

This project uses a local development version of `animated-backgrounds` v2.0. If you need to modify the animated backgrounds package:

#### Option 1: Using Tarball (Recommended)
```bash
# The package is already installed from tarball in package.json:
# "animated-backgrounds": "file:../animated-backgrounds/animated-backgrounds-2.0.0.tgz"

# To rebuild the package after changes:
cd ../animated-backgrounds
npm run build
npm pack
cd ../qrcodegen
npm install ../animated-backgrounds/animated-backgrounds-2.0.0.tgz
npm start
```

#### Option 2: Using npm link (May cause React conflicts)
```bash
# 1. Link the package
cd ../animated-backgrounds
npm link

# 2. Link in this project
cd ../qrcodegen
npm link animated-backgrounds

# 3. Start development server
npm start

# Note: If you encounter "Invalid hook call" errors, use Option 1 instead
```

#### Troubleshooting React Hook Errors
If you encounter React hook errors during development:

1. **Unlink the package**:
   ```bash
   npm unlink animated-backgrounds
   ```

2. **Clean and rebuild the animated-backgrounds package**:
   ```bash
   cd ../animated-backgrounds
   npm uninstall react react-dom  # Remove React dependencies
   npm run build
   npm pack
   ```

3. **Install from tarball**:
   ```bash
   cd ../qrcodegen
   npm install ../animated-backgrounds/animated-backgrounds-2.0.0.tgz
   npm start
   ```

## 🎮 Usage

### QR Generator Mode
1. Enter a URL in the input field
2. Select QR code type (URL, Text, Email, Phone)
3. Click "Generate QR Code"
4. Customize colors and error correction level
5. Download as PNG or PDF

### Background Controls
- **Background Mode**: Choose between themed, interactive, layered, or controlled
- **Theme Selection**: Pick from 8 predefined themes
- **Animation Control**: Select specific animations or use random selection
- **Performance Monitoring**: View real-time FPS and performance metrics

### Feature Demo Mode
Click "🎨 Feature Demo" to explore all v2.0 features with interactive controls.

## 🎨 Available Animations

### Themed Animations (19 total)
- `autumnLeaves`, `oceanWaves`, `neuralNetwork`, `dnaHelix`, `geometricShapes`
- `fallingFoodFiesta`, `starryNight`, `floatingBubbles`, `gradientWave`
- `particleNetwork`, `galaxySpiral`, `fireflies`, `matrixRain`, `rainbowWaves`
- `quantumField`, `electricStorm`, `cosmicDust`, `neonPulse`, `auroraBorealis`

### Background Modes
- **Themed**: Choose animations with theme-based styling
- **Interactive**: Mouse/touch particle interactions
- **Layered**: Multiple animations with blend modes
- **Controlled**: Full programmatic control

## 📊 Performance Features

- **Real-time FPS monitoring**
- **Memory usage tracking**
- **Adaptive performance optimization**
- **Performance level indicators** (excellent/good/fair/poor)
- **Warning system** for performance issues

## 🛠️ Development

### Project Structure
```
qrcodegen/
├── src/
│   ├── components/
│   │   ├── ui/          # Shadcn UI components
│   │   └── FeatureDemo.js
│   ├── lib/
│   └── App.js           # Main application
├── public/
└── package.json
```

### Dependencies
- **React 18.3.1**: Main framework
- **animated-backgrounds v2.0.0**: Background animations (local tarball)
- **Radix UI**: UI components
- **Tailwind CSS**: Styling
- **jsPDF**: PDF generation
- **html-to-image**: Image export

## 🔧 Troubleshooting

### Common Issues

1. **React Hook Call Errors**
   - Use tarball installation instead of npm link
   - Ensure single React version

2. **Animation Flashing/Remounting**
   - Check console logs for debugging info
   - Verify stable component keys

3. **Build Errors**
   - Clear node_modules and reinstall
   - Rebuild animated-backgrounds package

### Performance Issues
- Enable adaptive performance in settings
- Use performance monitoring to identify bottlenecks
- Consider lighter themes for lower-end devices

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Powered by Animated Backgrounds v2.0** 🎨✨