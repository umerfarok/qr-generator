/**
 * Feature Demo Component - Showcasing Animated Backgrounds v2.0
 * Demonstrates all new features including themes, interactions, controls, and performance monitoring
 */

import React, { useState } from 'react';
import { 
  AnimatedBackground, 
  LayeredBackground, 
  AnimatedText,
  useAnimationControls, 
  usePerformanceMonitor,
  THEMES
} from 'animated-backgrounds';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";

const FeatureDemo = () => {
  const [activeDemo, setActiveDemo] = useState('themes');
  const [selectedAnimation, setSelectedAnimation] = useState('particleNetwork');
  const [selectedTheme, setSelectedTheme] = useState('gaming');
  const [selectedEffect, setSelectedEffect] = useState('attract');
  const [textEffect, setTextEffect] = useState('typewriter');

  // Hooks for different features
  const controls = useAnimationControls({ initialSpeed: 1, autoPlay: true });
  const performance = usePerformanceMonitor({ warningThreshold: 30 });

  const animations = [
    'particleNetwork', 'starryNight', 'matrixRain', 'galaxySpiral', 
    'electricStorm', 'neonPulse', 'cosmicDust', 'auroraBorealis',
    'oceanWaves', 'fireflies', 'geometricShapes', 'rainbowWaves'
  ];

  const interactionEffects = ['attract', 'repel', 'follow', 'burst', 'gravity'];
  const textEffects = ['typewriter', 'fadeIn', 'bounce', 'glitch', 'rainbow'];

  const layerConfigs = [
    { animation: 'starryNight', opacity: 0.8, blendMode: 'normal', speed: 0.5 },
    { animation: 'particleNetwork', opacity: 0.4, blendMode: 'screen', speed: 1.0 },
    { animation: 'cosmicDust', opacity: 0.6, blendMode: 'overlay', speed: 0.7 }
  ];

  const renderBackground = () => {
    switch (activeDemo) {
      case 'themes':
        return (
          <AnimatedBackground 
            animationName={selectedAnimation}
            theme={selectedTheme}
            enablePerformanceMonitoring={true}
            adaptivePerformance={true}
          />
        );
      
      case 'interactive':
        return (
          <AnimatedBackground 
            animationName="particleNetwork"
            interactive={true}
            interactionConfig={{
              effect: selectedEffect,
              strength: 0.8,
              radius: 150,
              continuous: true
            }}
            theme="cyberpunk"
            enablePerformanceMonitoring={true}
          />
        );
      
      case 'layered':
        return (
          <LayeredBackground 
            layers={layerConfigs}
            enablePerformanceMonitoring={true}
          />
        );
      
      case 'controlled':
        return (
          <AnimatedBackground 
            animationName="galaxySpiral"
            animationControls={controls}
            theme="space"
            enablePerformanceMonitoring={true}
          />
        );
      
      default:
        return (
          <AnimatedBackground 
            animationName="geometricShapes"
            theme="portfolio"
          />
        );
    }
  };

  return (
    <div className="min-h-screen relative">
      {renderBackground()}
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <AnimatedText 
            text="Animated Backgrounds v2.0"
            effect={textEffect}
            styles={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}
            config={{ speed: 100, loop: false }}
          />
          <p className="text-white/80 text-xl mt-4">
            Interactive • Themed • Performance-Optimized • Feature-Rich
          </p>
        </div>

        {/* Demo Controls */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Demo Selector */}
          <Card className="bg-white/10 backdrop-blur-lg text-white border-white/20">
            <CardHeader>
              <CardTitle className="text-xl">🎮 Demo Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={activeDemo} onValueChange={setActiveDemo}>
                <SelectTrigger className="bg-white/20 text-white border-white/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="themes">🎨 Theme System</SelectItem>
                  <SelectItem value="interactive">🎮 Interactive Mode</SelectItem>
                  <SelectItem value="layered">🏗️ Layered Backgrounds</SelectItem>
                  <SelectItem value="controlled">🎛️ Animation Controls</SelectItem>
                </SelectContent>
              </Select>

              {/* Text Effect Selector */}
              <div>
                <Label className="text-white mb-2 block">Text Animation:</Label>
                <Select value={textEffect} onValueChange={setTextEffect}>
                  <SelectTrigger className="bg-white/20 text-white border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {textEffects.map(effect => (
                      <SelectItem key={effect} value={effect}>
                        {effect.charAt(0).toUpperCase() + effect.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Feature-Specific Controls */}
          <Card className="bg-white/10 backdrop-blur-lg text-white border-white/20">
            <CardHeader>
              <CardTitle className="text-xl">
                {activeDemo === 'themes' && '🎨 Themes'}
                {activeDemo === 'interactive' && '🎮 Interactions'}
                {activeDemo === 'layered' && '🏗️ Layers'}
                {activeDemo === 'controlled' && '🎛️ Controls'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {activeDemo === 'themes' && (
                <>
                  <div>
                    <Label className="text-white mb-2 block">Theme:</Label>
                    <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                      <SelectTrigger className="bg-white/20 text-white border-white/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(THEMES).map(([key, theme]) => (
                          <SelectItem key={key} value={key}>{theme.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Animation:</Label>
                    <Select value={selectedAnimation} onValueChange={setSelectedAnimation}>
                      <SelectTrigger className="bg-white/20 text-white border-white/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {animations.map(anim => (
                          <SelectItem key={anim} value={anim}>
                            {anim.charAt(0).toUpperCase() + anim.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {activeDemo === 'interactive' && (
                <div>
                  <Label className="text-white mb-2 block">Interaction Effect:</Label>
                  <Select value={selectedEffect} onValueChange={setSelectedEffect}>
                    <SelectTrigger className="bg-white/20 text-white border-white/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {interactionEffects.map(effect => (
                        <SelectItem key={effect} value={effect}>
                          {effect.charAt(0).toUpperCase() + effect.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-white/70 mt-2">
                    🖱️ Move your mouse around the screen to interact with particles
                  </p>
                </div>
              )}

              {activeDemo === 'layered' && (
                <div className="space-y-2">
                  <p className="text-sm text-white/80">Active Layers:</p>
                  {layerConfigs.map((layer, index) => (
                    <div key={index} className="text-xs bg-white/10 p-2 rounded">
                      <div className="font-medium">{layer.animation}</div>
                      <div>Opacity: {layer.opacity} | Blend: {layer.blendMode} | Speed: {layer.speed}x</div>
                    </div>
                  ))}
                </div>
              )}

              {activeDemo === 'controlled' && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button
                      onClick={controls.play}
                      className={`flex-1 ${controls.isPlaying ? 'bg-green-600' : 'bg-gray-600'}`}
                      size="sm"
                    >
                      ▶️ Play
                    </Button>
                    <Button
                      onClick={controls.pause}
                      className={`flex-1 ${!controls.isPlaying ? 'bg-red-600' : 'bg-gray-600'}`}
                      size="sm"
                    >
                      ⏸️ Pause
                    </Button>
                    <Button
                      onClick={controls.reset}
                      className="flex-1 bg-blue-600"
                      size="sm"
                    >
                      🔄 Reset
                    </Button>
                  </div>
                  
                  <div>
                    <Label className="text-white text-sm">Speed: {controls.speed.toFixed(1)}x</Label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={controls.speed}
                      onChange={(e) => controls.setSpeed(parseFloat(e.target.value))}
                      className="w-full mt-2"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Monitor */}
          <Card className="bg-white/10 backdrop-blur-lg text-white border-white/20">
            <CardHeader>
              <CardTitle className="text-xl">📊 Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {performance && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 p-3 rounded">
                      <div className="text-2xl font-bold text-green-400">{performance.fps}</div>
                      <div className="text-xs text-white/70">Current FPS</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded">
                      <div className="text-2xl font-bold text-blue-400">{performance.avgFps}</div>
                      <div className="text-xs text-white/70">Average FPS</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 p-3 rounded">
                    <div className="text-sm font-medium mb-1">Performance Level</div>
                    <div className={`text-lg font-bold ${
                      performance.performanceLevel === 'excellent' ? 'text-green-400' :
                      performance.performanceLevel === 'good' ? 'text-blue-400' :
                      performance.performanceLevel === 'fair' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {performance.performanceLevel.toUpperCase()}
                    </div>
                  </div>

                  {performance.memoryUsage > 0 && (
                    <div className="bg-white/10 p-3 rounded">
                      <div className="text-sm font-medium">Memory Usage</div>
                      <div className="text-lg font-bold">{performance.memoryUsage}MB</div>
                    </div>
                  )}

                  {performance.warnings.length > 0 && (
                    <div className="bg-yellow-500/20 border border-yellow-500/50 p-3 rounded">
                      <div className="text-yellow-400 text-sm font-medium mb-1">⚠️ Warning</div>
                      <div className="text-xs text-white/80">{performance.warnings[0]}</div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Feature Information */}
        <Card className="max-w-4xl mx-auto mt-8 bg-white/5 backdrop-blur-lg text-white border-white/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-400">🌟 What's New in v2.0</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• 🎨 <strong>Theme System</strong> - 8 predefined themes with custom color schemes</li>
                  <li>• 🎮 <strong>Interactive Animations</strong> - Mouse/touch interactions with 5 effect types</li>
                  <li>• 🏗️ <strong>Layered Backgrounds</strong> - Combine multiple animations with blend modes</li>
                  <li>• 🎛️ <strong>Animation Controls</strong> - Play/pause/speed control with custom hooks</li>
                  <li>• 📊 <strong>Performance Monitoring</strong> - Real-time FPS tracking and optimization</li>
                  <li>• 📱 <strong>Mobile Optimized</strong> - Touch gestures and adaptive performance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-400">🚀 Usage Examples</h3>
                <div className="text-sm text-white/80 space-y-2">
                  <div className="bg-black/30 p-2 rounded font-mono text-xs">
                    {`<AnimatedBackground 
  animationName="particleNetwork"
  theme="gaming"
  interactive={true}
  enablePerformanceMonitoring={true}
/>`}
                  </div>
                  <div className="bg-black/30 p-2 rounded font-mono text-xs">
                    {`const controls = useAnimationControls();
<AnimatedBackground 
  animationControls={controls}
/>`}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeatureDemo; 