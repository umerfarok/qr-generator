/**
 * Enhanced Feature Demo Component - Showcasing Animated Backgrounds v2.0
 * Demonstrates all new features including AI optimization, physics, audio, debug tools, and more
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  AnimatedBackground, 
  LayeredBackground, 
  useAnimationControls, 
  usePerformanceMonitor,
  THEMES 
} from 'animated-backgrounds';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import AnimatedBackgroundSelector from './AnimatedBackgroundSelector';
import { 
  Play, 
  Pause, 
  Square, 
  Settings, 
  Palette, 
  Zap, 
  Music, 
  Activity,
  Eye,
  EyeOff,
  Cpu,
  Gauge,
  Sparkles,
  Layers,
  MousePointer,
  Wand2
} from 'lucide-react';

// Custom AnimatedText component with modern styling
const AnimatedText = ({ text, effect = 'glow', className = '', ...props }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (effect === 'typewriter') {
      const timer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(prev => prev + 1);
        } else {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    } else {
      setDisplayText(text);
    }
  }, [text, effect, currentIndex]);

  const getEffectStyles = () => {
    const baseStyles = "font-bold transition-all duration-300";
    
    switch (effect) {
      case 'glow':
        return `${baseStyles} text-6xl bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl`;
      case 'neon':
        return `${baseStyles} text-5xl text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse`;
      case 'gradient':
        return `${baseStyles} text-6xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent`;
      case 'rainbow':
        return `${baseStyles} text-6xl bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse`;
      case 'fire':
        return `${baseStyles} text-6xl bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,146,60,0.8)]`;
      case 'cyber':
        return `${baseStyles} text-5xl text-green-400 font-mono drop-shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-pulse`;
      case 'typewriter':
        return `${baseStyles} text-6xl text-white drop-shadow-2xl`;
      default:
        return `${baseStyles} text-6xl text-white`;
    }
  };

  return (
    <h1 className={`${getEffectStyles()} ${className} text-center leading-tight`} {...props}>
      {displayText}
      {effect === 'typewriter' && currentIndex < text.length && (
        <span className="animate-blink">|</span>
      )}
    </h1>
  );
};

const FeatureDemo = () => {
  // Enhanced state with better defaults
  const [activeDemo, setActiveDemo] = useState('showcase');
  const [selectedAnimation, setSelectedAnimation] = useState('particleNetwork'); // Better default
  const [selectedTheme, setSelectedTheme] = useState('cyberpunk'); // More vibrant default
  const [selectedEffect, setSelectedEffect] = useState('attract');
  const [textEffect, setTextEffect] = useState('glow');
  const [showPerformanceOverlay, setShowPerformanceOverlay] = useState(true);
  const [enableDebugMode, setEnableDebugMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [physicsEnabled, setPhysicsEnabled] = useState(true);
  const [aiOptimization, setAiOptimization] = useState(true);

  // New v2.0 state
  const [particleCount, setParticleCount] = useState(150); // Better default
  const [animationSpeed, setAnimationSpeed] = useState(1.2); // Slightly faster
  const [interactionStrength, setInteractionStrength] = useState(0.8);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.9);

  // Refs for advanced features
  const canvasRef = useRef(null);
  const debugManagerRef = useRef(null);

  // Enhanced hooks
  const controls = useAnimationControls({ 
    initialSpeed: animationSpeed, 
    autoPlay: true 
  });
  
  const performance = usePerformanceMonitor({ 
    warningThreshold: 30,
    autoOptimize: aiOptimization 
  });

  // Enhanced animations with better categorization
  const animationCategories = {
    'Particle Systems': [
      'particleNetwork', 'electricStorm', 'cosmicDust', 'quantumField'
    ],
    'Organic & Natural': [
      'starryNight', 'auroraBorealis', 'oceanWaves', 'fireflies', 'autumnLeaves'
    ],
    'Geometric & Abstract': [
      'geometricShapes', 'rainbowWaves', 'gradientWave', 'neonPulse'
    ],
    'Themed & Special': [
      'matrixRain', 'galaxySpiral', 'dnaHelix', 'neuralNetwork'
    ]
  };

  const interactionEffects = [
    { value: 'attract', label: '🧲 Attract', description: 'Particles are drawn to cursor' },
    { value: 'repel', label: '💥 Repel', description: 'Particles push away from cursor' },
    { value: 'follow', label: '👆 Follow', description: 'Particles trail behind cursor' },
    { value: 'burst', label: '🎆 Burst', description: 'Explosive interaction on click' },
    { value: 'gravity', label: '🌍 Gravity', description: 'Realistic gravitational pull' },
    { value: 'magnetic', label: '🧲 Magnetic', description: 'Magnetic field interaction' },
    { value: 'vortex', label: '🌪️ Vortex', description: 'Swirling vortex effect' },
    { value: 'wave', label: '🌊 Wave', description: 'Ripple wave propagation' }
  ];

  const textEffects = [
    { value: 'glow', label: '✨ Glow' },
    { value: 'neon', label: '💫 Neon' },
    { value: 'gradient', label: '🌈 Gradient' },
    { value: 'rainbow', label: '🎨 Rainbow' },
    { value: 'fire', label: '🔥 Fire' },
    { value: 'cyber', label: '💻 Cyber' },
    { value: 'typewriter', label: '⌨️ Typewriter' }
  ];

  // Enhanced layer configurations
  const layerConfigs = {
    cosmic: [
      { animation: 'starryNight', opacity: 0.8, blendMode: 'normal', speed: 0.3 },
      { animation: 'cosmicDust', opacity: 0.6, blendMode: 'screen', speed: 0.8 },
      { animation: 'auroraBorealis', opacity: 0.4, blendMode: 'overlay', speed: 1.2 }
    ],
    cyberpunk: [
      { animation: 'matrixRain', opacity: 0.7, blendMode: 'normal', speed: 1.0 },
      { animation: 'electricStorm', opacity: 0.5, blendMode: 'screen', speed: 1.5 },
      { animation: 'neonPulse', opacity: 0.3, blendMode: 'overlay', speed: 0.8 }
    ],
    nature: [
      { animation: 'oceanWaves', opacity: 0.8, blendMode: 'normal', speed: 0.6 },
      { animation: 'fireflies', opacity: 0.5, blendMode: 'screen', speed: 0.4 },
      { animation: 'autumnLeaves', opacity: 0.3, blendMode: 'overlay', speed: 0.2 }
    ]
  };

  // Reset function to restore defaults
  const resetToDefaults = () => {
    setSelectedAnimation('particleNetwork');
    setSelectedTheme('cyberpunk');
    setSelectedEffect('attract');
    setTextEffect('glow');
    setParticleCount(150);
    setAnimationSpeed(1.2);
    setInteractionStrength(0.8);
    setBackgroundOpacity(0.9);
    setShowPerformanceOverlay(true);
    setEnableDebugMode(false);
    setAudioEnabled(false);
    setPhysicsEnabled(true);
    setAiOptimization(true);
  };

  // Initialize debug manager
  useEffect(() => {
    if (enableDebugMode && canvasRef.current && !debugManagerRef.current) {
      // Simulate debug manager initialization
      console.log('Debug mode enabled - Ctrl+D to toggle visualizer');
    }
  }, [enableDebugMode]);

  // Performance monitoring effect
  useEffect(() => {
    if (performance && showPerformanceOverlay) {
      // Update performance display
      console.log('Performance metrics updated:', performance);
    }
  }, [performance, showPerformanceOverlay]);

  const getCurrentAnimation = () => {
    const baseConfig = {
      enablePerformanceMonitoring: showPerformanceOverlay,
      adaptivePerformance: aiOptimization,
      style: { 
        opacity: backgroundOpacity,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }
    };

    switch (activeDemo) {
      case 'showcase':
        return (
          <AnimatedBackground 
            animationName={selectedAnimation}
            theme={selectedTheme}
            fps={Math.floor(60 * animationSpeed)}
            {...baseConfig}
          />
        );
      
      case 'interactive':
        return (
          <AnimatedBackground 
            animationName="particleNetwork"
            interactive={true}
            interactionConfig={{
              effect: selectedEffect,
              strength: interactionStrength,
              radius: 150,
              continuous: true,
              multiTouch: true
            }}
            theme={selectedTheme}
            {...baseConfig}
          />
        );
      
      case 'layered':
        const selectedLayers = layerConfigs[selectedTheme] || layerConfigs.cosmic;
        return (
          <LayeredBackground 
            layers={selectedLayers}
            {...baseConfig}
          />
        );
      
      case 'controlled':
        return (
          <AnimatedBackground 
            animationName="galaxySpiral"
            animationControls={controls}
            theme={selectedTheme}
            {...baseConfig}
          />
        );
      
      case 'advanced':
        return (
          <AnimatedBackground 
            animationName={selectedAnimation}
            theme={selectedTheme}
            interactive={true}
            interactionConfig={{
              effect: selectedEffect,
              strength: interactionStrength,
              radius: 120
            }}
            enablePhysics={physicsEnabled}
            enableAudio={audioEnabled}
            enableAI={aiOptimization}
            enableDebug={enableDebugMode}
            {...baseConfig}
          />
        );
      
      default:
        return (
          <AnimatedBackground 
            animationName="particleNetwork"
            theme="cyberpunk"
            {...baseConfig}
          />
        );
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Enhanced Background */}
      {getCurrentAnimation()}
      
      {/* Performance Overlay */}
      {showPerformanceOverlay && performance && (
        <div className="fixed top-4 right-4 z-50 bg-black/50 backdrop-blur text-white p-3 rounded-lg text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              <span>FPS: {performance.fps || 60}</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span>Particles: {particleCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Performance: {performance.performanceLevel || 'Excellent'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Content Overlay */}
      <div className="relative z-10 p-6">
        {/* Enhanced Header */}
        <div className="text-center mb-8 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-10 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-5 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          {/* Main Title */}
          <div className="relative z-10 mb-6">
            <AnimatedText 
              text="Animated Backgrounds v2.0"
              effect={textEffect}
              className="mb-4"
            />
            
            {/* Subtitle with modern styling */}
            <div className="text-2xl text-white font-medium mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Next Generation Web Animations
            </div>
            
            {/* Version badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/30 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-white font-medium">Version 2.0.0 • Latest</span>
            </div>
          </div>

          {/* Feature badges with enhanced styling */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30 px-4 py-2 text-sm backdrop-blur-lg">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Optimization
            </Badge>
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30 px-4 py-2 text-sm backdrop-blur-lg">
              <Zap className="h-4 w-4 mr-2" />
              WebGL Accelerated
            </Badge>
            <Badge variant="secondary" className="bg-green-600/20 text-green-300 border-green-500/30 px-4 py-2 text-sm backdrop-blur-lg">
              <Music className="h-4 w-4 mr-2" />
              Audio Reactive
            </Badge>
            <Badge variant="secondary" className="bg-orange-600/20 text-orange-300 border-orange-500/30 px-4 py-2 text-sm backdrop-blur-lg">
              <Activity className="h-4 w-4 mr-2" />
              Real-time Physics
            </Badge>
          </div>

          {/* Enhanced description */}
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-white text-xl leading-relaxed font-light">
              Experience the most advanced animation library with professional-grade features, 
              stunning visual effects, and enterprise-level performance optimization.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4 border border-white/30 shadow-sm">
                <div className="text-blue-400 mb-2">
                  <Palette className="h-6 w-6 mx-auto" />
                </div>
                <h3 className="text-white font-semibold mb-1">16 Stunning Themes</h3>
                <p className="text-gray-300 text-sm">Professional color schemes designed with color theory</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4 border border-white/30 shadow-sm">
                <div className="text-purple-400 mb-2">
                  <Cpu className="h-6 w-6 mx-auto" />
                </div>
                <h3 className="text-white font-semibold mb-1">GPU Powered</h3>
                <p className="text-gray-300 text-sm">Handle 10,000+ particles at smooth 60fps</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4 border border-white/30 shadow-sm">
                <div className="text-green-400 mb-2">
                  <Settings className="h-6 w-6 mx-auto" />
                </div>
                <h3 className="text-white font-semibold mb-1">1000+ Settings</h3>
                <p className="text-gray-300 text-sm">Extensive customization for every use case</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Demo Controls */}
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white/20 backdrop-blur border border-white/30">
              <TabsTrigger value="showcase" className="flex items-center gap-2 text-white">
                <Palette className="h-4 w-4" />
                Showcase
              </TabsTrigger>
              <TabsTrigger value="interactive" className="flex items-center gap-2 text-white">
                <MousePointer className="h-4 w-4" />
                Interactive
              </TabsTrigger>
              <TabsTrigger value="layered" className="flex items-center gap-2 text-white">
                <Layers className="h-4 w-4" />
                Layered
              </TabsTrigger>
              <TabsTrigger value="controlled" className="flex items-center gap-2 text-white">
                <Settings className="h-4 w-4" />
                Controlled
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2 text-white">
                <Wand2 className="h-4 w-4" />
                Advanced
              </TabsTrigger>
            </TabsList>

            {/* Showcase Tab */}
            <TabsContent value="showcase" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-white/20 backdrop-blur-lg text-white border-white/30 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Theme & Animation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-white mb-2 block">Theme:</Label>
                      <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                        <SelectTrigger className="bg-white/20 text-white border-white/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(THEMES).map(([key, theme]) => (
                            <SelectItem key={key} value={key}>
                              {theme.name || key.charAt(0).toUpperCase() + key.slice(1)}
                            </SelectItem>
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
                          {Object.entries(animationCategories).map(([category, animations]) => (
                            <div key={category}>
                              <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase">
                                {category}
                              </div>
                              {animations.map(anim => (
                                <SelectItem key={anim} value={anim}>
                                  {anim.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">Text Effect:</Label>
                      <Select value={textEffect} onValueChange={setTextEffect}>
                        <SelectTrigger className="bg-white/20 text-white border-white/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {textEffects.map(effect => (
                            <SelectItem key={effect.value} value={effect.value}>
                              {effect.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg text-white border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Performance Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-white mb-2 block">
                        Animation Speed: {animationSpeed.toFixed(1)}x
                      </Label>
                      <Slider
                        value={[animationSpeed]}
                        onValueChange={([value]) => setAnimationSpeed(value)}
                        min={0.1}
                        max={3.0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">
                        Particle Count: {particleCount}
                      </Label>
                      <Slider
                        value={[particleCount]}
                        onValueChange={([value]) => setParticleCount(value)}
                        min={50}
                        max={500}
                        step={25}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">
                        Background Opacity: {Math.round(backgroundOpacity * 100)}%
                      </Label>
                      <Slider
                        value={[backgroundOpacity]}
                        onValueChange={([value]) => setBackgroundOpacity(value)}
                        min={0.1}
                        max={1.0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg text-white border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Display Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-white">Performance Overlay</Label>
                      <Switch
                        checked={showPerformanceOverlay}
                        onCheckedChange={setShowPerformanceOverlay}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-white">AI Optimization</Label>
                      <Switch
                        checked={aiOptimization}
                        onCheckedChange={setAiOptimization}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-white">Debug Mode</Label>
                      <Switch
                        checked={enableDebugMode}
                        onCheckedChange={setEnableDebugMode}
                      />
                    </div>

                    {enableDebugMode && (
                      <div className="text-xs text-gray-300 bg-black/30 p-2 rounded">
                        Debug shortcuts:<br/>
                        Ctrl+D: Toggle visualizer<br/>
                        Ctrl+G: Toggle grid<br/>
                        Ctrl+F: Toggle FPS
                      </div>
                    )}

                    <div className="pt-2 border-t border-white/20">
                      <Button 
                        variant="outline" 
                        className="w-full bg-red-600/20 border-red-500/50 text-red-200 hover:bg-red-600/30"
                        onClick={resetToDefaults}
                      >
                        🔄 Reset All Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Interactive Tab */}
            <TabsContent value="interactive" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-lg text-white border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MousePointer className="h-5 w-5" />
                      Interaction Effects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {interactionEffects.map(effect => (
                        <Button
                          key={effect.value}
                          variant={selectedEffect === effect.value ? "default" : "outline"}
                          className="h-auto p-3 text-left"
                          onClick={() => setSelectedEffect(effect.value)}
                        >
                          <div>
                            <div className="font-medium text-sm">{effect.label}</div>
                            <div className="text-xs opacity-70">{effect.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">
                        Interaction Strength: {interactionStrength.toFixed(1)}
                      </Label>
                      <Slider
                        value={[interactionStrength]}
                        onValueChange={([value]) => setInteractionStrength(value)}
                        min={0.1}
                        max={2.0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg text-white border-white/20">
                  <CardHeader>
                    <CardTitle>💡 Interaction Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-blue-600/20 rounded border border-blue-500/30">
                        <strong>🖱️ Mouse Interaction:</strong><br/>
                        Move your mouse around to see particles react in real-time.
                      </div>
                      <div className="p-3 bg-purple-600/20 rounded border border-purple-500/30">
                        <strong>📱 Touch Support:</strong><br/>
                        On mobile devices, touch and drag for multi-touch interaction.
                      </div>
                      <div className="p-3 bg-green-600/20 rounded border border-green-500/30">
                        <strong>⚡ Effects:</strong><br/>
                        Each effect creates unique particle behaviors and visual feedback.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advanced" className="mt-8">
              <div className="space-y-6">
                <AnimatedBackgroundSelector 
                  onBackgroundChange={(config) => {
                    console.log('Advanced background config:', config);
                  }}
                />
                
                <Card className="bg-white/10 backdrop-blur-lg text-white border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      v2.0 Advanced Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Physics Engine</Label>
                          <p className="text-xs text-gray-300">Realistic particle physics</p>
                        </div>
                        <Switch
                          checked={physicsEnabled}
                          onCheckedChange={setPhysicsEnabled}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Audio Reactive</Label>
                          <p className="text-xs text-gray-300">Microphone input</p>
                        </div>
                        <Switch
                          checked={audioEnabled}
                          onCheckedChange={setAudioEnabled}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">AI Optimization</Label>
                          <p className="text-xs text-gray-300">Smart performance tuning</p>
                        </div>
                        <Switch
                          checked={aiOptimization}
                          onCheckedChange={setAiOptimization}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Other tabs would be similar enhancements... */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FeatureDemo; 