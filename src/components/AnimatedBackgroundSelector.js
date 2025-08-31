import React, { useState, useEffect, useRef } from 'react';
import {
  AnimatedBackground,
  useAnimationControls,
  usePerformanceMonitor,
  THEMES
} from 'animated-backgrounds';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Play,
  Pause,
  Square,
  Settings,
  Palette,
  Zap,
  Music,
  Activity,
  Download,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';

const AnimatedBackgroundSelector = ({ onBackgroundChange }) => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Configuration state
  const [config, setConfig] = useState({
    preset: 'gaming',
    animation: 'particleNetwork',
    theme: 'cyberpunk',
    particleCount: 100,
    animationSpeed: 1.0,
    enableAudio: false,
    enablePhysics: false,
    enableAI: true,
    opacity: 0.8
  });

  // Available animations from the package
  const availableAnimations = [
    'particleNetwork', 'matrixRain', 'starryNight', 'floatingBubbles',
    'geometricShapes', 'galaxySpiral', 'fireflies', 'rainbowWaves',
    'quantumField', 'electricStorm', 'cosmicDust', 'neonPulse',
    'auroraBorealis', 'oceanWaves', 'autumnLeaves', 'dnaHelix'
  ];

  // Available themes from the package
  const availableThemes = Object.keys(THEMES);

  // Performance monitor hook
  const performance = usePerformanceMonitor({
    warningThreshold: 30,
    autoOptimize: config.enableAI
  });

  // Animation controls hook
  const controls = useAnimationControls({
    initialSpeed: config.animationSpeed,
    autoPlay: isPlaying
  });

  // Initialize available options
  useEffect(() => {
    // Available presets (these are just configuration presets, not package-provided)
    const presets = {
      gaming: 'High-performance gaming experience',
      portfolio: 'Professional portfolio background',
      party: 'Vibrant and dynamic effects',
      minimal: 'Clean minimal design'
    };

    // Check for browser capabilities
    const capabilities = {
      webgl: !!(window.WebGLRenderingContext),
      audioContext: !!(window.AudioContext || window.webkitAudioContext),
      getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    };

    // Update state with actual package data
    setConfig(prev => ({
      ...prev,
      themes: availableThemes,
      animations: availableAnimations,
      presets,
      capabilities
    }));
  }, []);

  // Update controls when config changes
  useEffect(() => {
    controls.setSpeed(config.animationSpeed);
  }, [config.animationSpeed, controls]);

  // Notify parent component about background changes
  useEffect(() => {
    if (onBackgroundChange) {
      onBackgroundChange({
        type: 'animated',
        config: config,
        element: canvasRef.current,
        controls: controls,
        performance: performance
      });
    }
  }, [config, controls, performance, onBackgroundChange]);

  // Update background when config changes
  useEffect(() => {
    console.log('Updating background with config:', config);
  }, [config]);

  const handlePresetChange = (preset) => {
    const presetConfigs = {
      gaming: {
        animation: 'particleNetwork',
        theme: 'cyberpunk',
        particleCount: 150,
        enableAudio: true,
        enablePhysics: true,
        enableAI: true,
        animationSpeed: 1.2,
        opacity: 0.9
      },
      portfolio: {
        animation: 'geometricShapes',
        theme: 'nature',
        particleCount: 80,
        enableAudio: false,
        enablePhysics: false,
        enableAI: true,
        animationSpeed: 0.8,
        opacity: 0.6
      },
      party: {
        animation: 'neonPulse',
        theme: 'neon',
        particleCount: 200,
        enableAudio: true,
        enablePhysics: true,
        enableAI: true,
        animationSpeed: 1.5,
        opacity: 1.0
      },
      minimal: {
        animation: 'starryNight',
        theme: 'space',
        particleCount: 50,
        enableAudio: false,
        enablePhysics: false,
        enableAI: false,
        animationSpeed: 0.6,
        opacity: 0.5
      }
    };
    
    setConfig(prev => ({
      ...prev,
      preset,
      ...presetConfigs[preset]
    }));
  };

  const handleClearPreset = () => {
    // Reset to default configuration without any preset applied
    setConfig({
      preset: null,
      animation: 'particleNetwork',
      theme: 'cyberpunk',
      particleCount: 100,
      animationSpeed: 1.0,
      enableAudio: false,
      enablePhysics: false,
      enableAI: true,
      opacity: 0.8
    });
  };

  const handlePlay = () => {
    controls.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    controls.pause();
    setIsPlaying(false);
  };

  const handleStop = () => {
    controls.reset();
    setIsPlaying(false);
  };

  const exportConfig = () => {
    const exportData = {
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      config: config,
      metrics: metrics
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `animated-bg-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importConfig = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        if (importData.config) {
          setConfig(importData.config);
        }
      } catch (error) {
        console.error('Failed to import configuration:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Animated Background
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preview and Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={showPreview ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              
              {showPreview && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePlay}
                    disabled={isPlaying}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePause}
                    disabled={!isPlaying}
                  >
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStop}
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportConfig}>
                <Download className="h-4 w-4" />
                Export
              </Button>
              <label>
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="h-4 w-4" />
                    Import
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={importConfig}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          {/* Preview Canvas */}
          {showPreview && (
            <div className="relative">
              <div className="w-full h-48 bg-gray-900 rounded-lg border overflow-hidden">
                <AnimatedBackground
                  animationName={config.animation}
                  theme={config.theme}
                  animationControls={controls}
                  enablePerformanceMonitoring={true}
                  adaptivePerformance={config.enableAI}
                  fps={60}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: config.opacity
                  }}
                />
              </div>

              {/* Performance Metrics Overlay */}
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs p-2 rounded">
                <div>FPS: {performance.fps || 60}</div>
                <div>Particles: {config.particleCount}</div>
                <div>Memory: {performance.memoryUsage || 0}MB</div>
                <div>Level: {performance.performanceLevel || 'good'}</div>
              </div>

              {/* Status Indicator */}
              <div className="absolute top-2 left-2">
                <Badge variant={isPlaying ? "default" : "secondary"}>
                  {isPlaying ? 'Playing' : 'Paused'}
                </Badge>
              </div>

              {/* Loading Indicator */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white">Loading...</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Configuration Tabs */}
        <Tabs defaultValue="presets" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="animation">Animation</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="presets" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Quick Presets</Label>
                {config.preset && (
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-blue-600">
                      Active: {config.preset}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleClearPreset}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      ✕ Clear Preset
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {Object.entries({
                  gaming: 'High-performance gaming experience',
                  portfolio: 'Professional portfolio background',
                  party: 'Vibrant and dynamic effects',
                  minimal: 'Clean minimal design'
                }).map(([key, description]) => (
                  <Button
                    key={key}
                    variant={config.preset === key ? "default" : "outline"}
                    className="h-auto p-3 text-left"
                    onClick={() => handlePresetChange(key)}
                  >
                    <div>
                      <div className="font-medium capitalize">{key}</div>
                      <div className="text-xs text-muted-foreground">{description}</div>
                    </div>
                  </Button>
                ))}
              </div>
              
              {!config.preset && (
                <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-sm text-gray-600">
                    <strong>Custom Configuration</strong><br/>
                    No preset applied - using manual settings
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="animation" className="space-y-4">
            <div className="space-y-2">
              <Label>Animation Type</Label>
              <Select value={config.animation} onValueChange={(value) => 
                setConfig(prev => ({ ...prev, animation: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableAnimations.map((animation) => (
                    <SelectItem key={animation} value={animation}>
                      {animation.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Animation Speed: {config.animationSpeed.toFixed(1)}x</Label>
              <Slider
                value={[config.animationSpeed]}
                onValueChange={([value]) => 
                  setConfig(prev => ({ ...prev, animationSpeed: value }))
                }
                min={0.1}
                max={3.0}
                step={0.1}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Particle Count: {config.particleCount}</Label>
              <Slider
                value={[config.particleCount]}
                onValueChange={([value]) => 
                  setConfig(prev => ({ ...prev, particleCount: value }))
                }
                min={10}
                max={500}
                step={10}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Opacity: {Math.round(config.opacity * 100)}%</Label>
              <Slider
                value={[config.opacity]}
                onValueChange={([value]) => 
                  setConfig(prev => ({ ...prev, opacity: value }))
                }
                min={0.1}
                max={1.0}
                step={0.1}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="theme" className="space-y-4">
                          <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  {availableThemes.map((theme) => (
                    <Button
                      key={theme}
                      variant={config.theme === theme ? "default" : "outline"}
                      className="h-auto p-3"
                      onClick={() => setConfig(prev => ({ ...prev, theme }))}
                    >
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        <span className="capitalize">{theme}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Audio Reactive</Label>
                  <div className="text-sm text-muted-foreground">
                    React to microphone input
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  <Switch
                    checked={config.enableAudio}
                    onCheckedChange={(checked) =>
                      setConfig(prev => ({ ...prev, enableAudio: checked }))
                    }
                    disabled={!(window.AudioContext || window.webkitAudioContext)}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Physics Engine</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable particle physics
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <Switch
                    checked={config.enablePhysics}
                    onCheckedChange={(checked) =>
                      setConfig(prev => ({ ...prev, enablePhysics: checked }))
                    }
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>AI Optimization</Label>
                  <div className="text-sm text-muted-foreground">
                    Automatic performance tuning
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <Switch
                    checked={config.enableAI}
                    onCheckedChange={(checked) =>
                      setConfig(prev => ({ ...prev, enableAI: checked }))
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Performance Warning */}
        {metrics.fps < 30 && showPreview && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-yellow-800">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Performance Warning</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              Low FPS detected. Consider reducing particle count or disabling advanced features.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnimatedBackgroundSelector; 