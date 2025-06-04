# Troubleshooting Guide - QR Generator with Animated Backgrounds v2.0

## 🚨 Common Issues and Solutions

### 1. "Invalid hook call" Error

**Error Message:**
```
Error: Invalid hook call. Hooks can only be called inside of the body of a function component.
```

**Cause:** Multiple versions of React in the application, typically caused by linked packages having their own React dependencies.

**Solution:**
```bash
# 1. Unlink the animated-backgrounds package
npm unlink animated-backgrounds

# 2. Go to animated-backgrounds directory
cd ../animated-backgrounds

# 3. Remove React dependencies (they should be peer dependencies only)
npm uninstall react react-dom

# 4. Rebuild the package
npm run build

# 5. Link again
npm link

# 6. Return to QR generator and link
cd ../qrcodegen
npm link animated-backgrounds

# 7. Restart development server
npm start
```

### 2. "Module not found" Errors

**Error Message:**
```
Module not found: Error: Can't resolve '../ui/card'
```

**Cause:** Incorrect import paths for UI components.

**Solution:**
Update import paths in `FeatureDemo.js`:
```jsx
// Wrong
import { Card } from "../ui/card";

// Correct  
import { Card } from "./ui/card";
```

### 3. ESLint Warnings

**Warning:**
```
The 'animations' array makes the dependencies of useCallback Hook change on every render
```

**Solution:**
Wrap arrays in `useMemo` to prevent unnecessary re-renders:
```jsx
const animations = useMemo(() => [
  'starryNight', 'particleNetwork', // ... other animations
], []);
```

### 4. Performance Issues

**Symptoms:**
- Low FPS warnings
- Slow animations
- High memory usage

**Solutions:**
1. **Enable Adaptive Performance:**
   ```jsx
   <AnimatedBackground 
     adaptivePerformance={true}
     enablePerformanceMonitoring={true}
   />
   ```

2. **Choose Appropriate Themes:**
   - Use `portfolio` or `presentation` for better performance
   - Avoid `gaming` or `party` themes on slower devices

3. **Monitor Performance Panel:**
   - Check FPS metrics in real-time
   - Watch for memory usage warnings
   - Adjust settings based on performance level

### 5. Touch Interactions Not Working

**Symptoms:**
- Mouse interactions work but touch doesn't
- Mobile gestures not recognized

**Solutions:**
1. **Test on Actual Device:**
   - Touch simulation in browser dev tools isn't always accurate
   - Use real mobile device for testing

2. **Check Browser Support:**
   - Ensure modern browser with touch event support
   - Some older browsers may not support all features

3. **Verify Interactive Mode:**
   ```jsx
   <AnimatedBackground 
     interactive={true}
     interactionConfig={{
       effect: 'attract',
       strength: 0.8,
       radius: 150
     }}
   />
   ```

### 6. Themes Not Applying

**Symptoms:**
- Colors don't change with theme selection
- Animation settings don't adjust

**Solutions:**
1. **Check Theme Name:**
   ```jsx
   // Correct theme names
   const validThemes = [
     'gaming', 'portfolio', 'landing', 'presentation',
     'wellness', 'party', 'cyberpunk', 'retro'
   ];
   ```

2. **Ensure Component Re-renders:**
   - Use state management for theme changes
   - Check that theme prop is properly passed

3. **Console Debugging:**
   ```jsx
   console.log('Applied theme:', selectedTheme);
   ```

### 7. Build Errors

**Error Message:**
```
Cannot use import statement outside a module
```

**Solution:**
Ensure `package.json` has correct module configuration:
```json
{
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.esm.js"
}
```

### 8. Development Server Issues

**Symptoms:**
- Server won't start
- Hot reload not working
- Compilation errors

**Solutions:**
1. **Clear Node Modules:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Port Conflicts:**
   ```bash
   # If port 3000 is busy, use different port
   PORT=3001 npm start
   ```

3. **Update Dependencies:**
   ```bash
   npm update
   ```

## 🔧 Development Best Practices

### 1. Package Linking
- Always use peer dependencies for React packages
- Unlink packages before making major changes
- Rebuild after dependency changes

### 2. Performance Monitoring
- Always enable performance monitoring during development
- Test on various devices and browsers
- Monitor memory usage for memory leaks

### 3. Theme Development
- Test themes with different animations
- Ensure themes work across different screen sizes
- Verify theme colors have sufficient contrast

### 4. Mobile Testing
- Test on actual devices, not just browser simulation
- Check touch interactions thoroughly
- Verify performance on lower-end devices

## 📊 Performance Benchmarks

### Target Performance Levels
- **Desktop**: 60 FPS (excellent)
- **High-end Mobile**: 45+ FPS (good)
- **Mid-range Mobile**: 30+ FPS (fair)
- **Low-end Mobile**: 20+ FPS (acceptable)

### Memory Usage Guidelines
- **Optimal**: < 100MB
- **Warning**: 100-200MB  
- **Critical**: > 200MB

## 🆘 Getting Help

If you're still experiencing issues:

1. **Check Browser Console** for error messages
2. **Enable Performance Monitoring** to see metrics
3. **Test in Incognito Mode** to rule out extensions
4. **Try Different Browsers** to identify browser-specific issues
5. **Check Network Tab** for failed resource loads

## 📝 Reporting Issues

When reporting issues, please include:
- Browser and version
- Device type and OS
- Error messages from console
- Steps to reproduce
- Performance metrics (if available)

---

**Need more help? Check the main README.md for additional resources!** 🚀 