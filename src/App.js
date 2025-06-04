import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { 
  AnimatedBackground, 
  LayeredBackground, 
  useAnimationControls, 
  usePerformanceMonitor,
  THEMES 
} from 'animated-backgrounds';
import { QRCode } from 'react-qrcode-logo';
import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Label } from "./components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import FeatureDemo from './components/FeatureDemo';
import './App.css';

function App() {
  // App mode switcher
  const [appMode, setAppMode] = useState('qr-generator'); // 'qr-generator' or 'feature-demo'

  // Available animations and themes - memoized to prevent re-renders
  const animations = useMemo(() => [
    'autumnLeaves', 'oceanWaves', 'neuralNetwork', 'dnaHelix', 'geometricShapes',
    'fallingFoodFiesta', 'starryNight', 'floatingBubbles', 'gradientWave', 
    'particleNetwork', 'galaxySpiral', 'fireflies', 'matrixRain', 'rainbowWaves', 
    'quantumField', 'electricStorm', 'cosmicDust', 'neonPulse', 'auroraBorealis'
  ], []);

  const getRandomAnimation = useCallback((exclude) => {
    let availableAnimations = animations.filter(animation => animation !== exclude);
    const selected = availableAnimations[Math.floor(Math.random() * availableAnimations.length)];
    return selected;
  }, [animations]);

  // State management for QR Generator - Enhanced with better defaults
  const [animationName, setAnimationName] = useState('particleNetwork'); // Better particle design than floatingBubbles
  const [selectedTheme, setSelectedTheme] = useState('cyberpunk'); // More vibrant than gaming
  const [backgroundMode, setBackgroundMode] = useState('themed'); // 'themed', 'interactive', 'layered', 'controlled'
  const [url, setUrl] = useState('https://animated-backgrounds-v2.com'); // Better example URL
  const [qrVisible, setQrVisible] = useState(false);
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrType, setQrType] = useState('URL');
  const [errorCorrection, setErrorCorrection] = useState('H');
  const [qrKey, setQrKey] = useState(0);
  const [showControls, setShowControls] = useState(true);

  // Enhanced v2.0 features state
  const [enhancedMode, setEnhancedMode] = useState(true);
  const [particleCount, setParticleCount] = useState(150); // Better particle count
  const [animationSpeed, setAnimationSpeed] = useState(1.2); // Slightly faster
  const [interactionStrength, setInteractionStrength] = useState(0.8);
  const [enablePhysics, setEnablePhysics] = useState(false);
  const [enableAI, setEnableAI] = useState(true);
  const [showPerformance, setShowPerformance] = useState(false);

  // New v2.0 hooks
  const controls = useAnimationControls({
    initialSpeed: 1,
    autoPlay: true
  });

  // const performance = usePerformanceMonitor({
  //   warningThreshold: 30,
  //   autoOptimize: true
  // });

  // Memoize stable objects to prevent recreation
  const interactionConfig = useMemo(() => ({
    effect: 'attract',
    strength: 0.8,
    radius: 150,
    continuous: true
  }), []);

  const layeredBackgroundLayers = useMemo(() => [
    { animation: 'starryNight', opacity: 0.7, blendMode: 'normal', speed: 0.5 },
    { animation: 'particleNetwork', opacity: 0.3, blendMode: 'screen', speed: 1.2 },
    { animation: 'cosmicDust', opacity: 0.5, blendMode: 'overlay', speed: 0.8 }
  ], []);

  // QR Code state - Enhanced defaults
  const [text, setText] = useState('https://animated-backgrounds-v2.com'); // Better default URL
  const [qrCodeDataURL, setQRCodeDataURL] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // QR Code options - Enhanced defaults
  const [options, setOptions] = useState({
    errorCorrectionLevel: 'M',
    type: 'image/png',
    quality: 0.92,
    margin: 1,
    color: {
      dark: '#1a1a1a', // Slightly softer black
      light: '#FFFFFF'
    },
    width: 300, // Larger default size
    scale: 4
  });

  // Background state - Enhanced defaults
  const [backgroundConfig, setBackgroundConfig] = useState({
    enabled: true,
    type: 'animated', // Start with animated instead of static
    staticColor: '#f8fafc',
    gradientFrom: '#3b82f6',
    gradientTo: '#8b5cf6',
    animatedConfig: null
  });

  // Preview state
  const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [showPreview, setShowPreview] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Refs
  const backgroundCanvasRef = useRef(null);
  const qrDisplayRef = useRef(null);

  const handleGenerateQR = () => {
    if (url.trim() !== '') {
      setQrVisible(true);
      setQrKey(prev => prev + 1);
    } else {
      alert('Please enter a valid URL.');
    }
  };

  const handleDownloadImage = () => {
    const qrElement = document.getElementById('qr-code');
    htmlToImage.toPng(qrElement)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };

  const handleDownloadPDF = () => {
    const qrElement = document.getElementById('qr-code');
    htmlToImage.toPng(qrElement)
      .then((dataUrl) => {
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('qr-code.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  const handleErrorCorrection = (value) => {
    setErrorCorrection(value);
    setQrKey(prev => prev + 1);
  };

  // Render different background modes for QR Generator
  const renderQRBackground = useCallback(() => {
    switch (backgroundMode) {
      case 'interactive':
        return (
          <AnimatedBackground 
            key="interactive-bg"
            animationName="particleNetwork"
            interactive={true}
            interactionConfig={interactionConfig}
            theme={selectedTheme}
            enablePerformanceMonitoring={false}
          />
        );
      
      case 'layered':
        return (
          <LayeredBackground 
            key="layered-bg"
            layers={layeredBackgroundLayers}
            enablePerformanceMonitoring={false}
          />
        );
      
      case 'controlled':
        return (
          <AnimatedBackground 
            key="controlled-bg"
            animationName="galaxySpiral"
            animationControls={controls}
            theme={selectedTheme}
            enablePerformanceMonitoring={false}
          />
        );
      
      default: // 'themed'
        return (
          <AnimatedBackground 
            key="themed-bg"
            animationName={animationName}
            theme={selectedTheme}
            enablePerformanceMonitoring={false}
            adaptivePerformance={true}
          />
        );
    }
  }, [backgroundMode, selectedTheme, animationName, controls, interactionConfig, layeredBackgroundLayers]);

  // Render QR Generator App
  const renderQRGenerator = () => (
    <div>
      {renderQRBackground()}
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* App Mode Toggle */}
        <button
          onClick={() => setAppMode('feature-demo')}
          className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          🎨 Feature Demo
        </button>

        {/* Toggle Controls Button */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="fixed top-4 left-4 z-50 bg-white/20 backdrop-blur-lg text-white px-3 py-2 rounded-lg hover:bg-white/30 transition-colors"
        >
          {showControls ? '🔧 Hide Controls' : '🔧 Show Controls'}
        </button>

        {/* New v2.0 Controls Panel */}
        {showControls && (
          <div className="fixed top-16 left-4 z-40 bg-white/10 backdrop-blur-lg text-white p-4 rounded-lg max-w-sm">
            <h3 className="text-lg font-semibold mb-3">🎨 v2.0 Features</h3>
            
            {/* Background Mode Selector */}
            <div className="mb-3">
              <Label className="text-white">Background Mode:</Label>
              <Select value={backgroundMode} onValueChange={setBackgroundMode}>
                <SelectTrigger className="bg-white/20 text-white border-white/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="themed">🎨 Themed</SelectItem>
                  <SelectItem value="interactive">🎮 Interactive</SelectItem>
                  <SelectItem value="layered">🏗️ Layered</SelectItem>
                  <SelectItem value="controlled">🎛️ Controlled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Theme Selector */}
            {(backgroundMode === 'themed' || backgroundMode === 'controlled') && (
              <div className="mb-3">
                <Label className="text-white">Theme:</Label>
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
            )}

            {/* Animation Selector for Themed Mode */}
            {backgroundMode === 'themed' && (
              <div className="mb-3">
                <Label className="text-white">Animation:</Label>
                <div className="flex gap-2">
                  <Select value={animationName} onValueChange={setAnimationName}>
                    <SelectTrigger className="bg-white/20 text-white border-white/30 flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {animations.map((animation) => (
                        <SelectItem key={animation} value={animation}>
                          {animation.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    onClick={() => setAnimationName(getRandomAnimation(animationName))}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition-colors"
                    title="Random Animation"
                  >
                    🎲
                  </button>
                </div>
              </div>
            )}

            {/* Animation Controls for Controlled Mode */}
            {backgroundMode === 'controlled' && (
              <div className="mb-3">
                <Label className="text-white mb-2 block">Animation Controls:</Label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={controls.play}
                    className={`px-2 py-1 rounded text-xs ${controls.isPlaying ? 'bg-green-500' : 'bg-gray-500'}`}
                  >
                    ▶️
                  </button>
                  <button
                    onClick={controls.pause}
                    className={`px-2 py-1 rounded text-xs ${!controls.isPlaying ? 'bg-red-500' : 'bg-gray-500'}`}
                  >
                    ⏸️
                  </button>
                  <button
                    onClick={controls.reset}
                    className="px-2 py-1 rounded text-xs bg-blue-500"
                  >
                    🔄
                  </button>
                </div>
                <div>
                  <Label className="text-white text-xs">Speed: {controls.speed.toFixed(1)}x</Label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={controls.speed}
                    onChange={(e) => controls.setSpeed(parseFloat(e.target.value))}
                    className="w-full mt-1"
                  />
                </div>
              </div>
            )}

            {/* Performance Monitor */}
            {/* {performance && (
              <div className="mb-3 text-xs">
                <Label className="text-white">📊 Performance:</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>FPS: <span className="text-green-400">{performance.fps}</span></div>
                  <div>Avg: <span className="text-blue-400">{performance.avgFps}</span></div>
                  <div className="col-span-2">
                    Level: <span className={`${
                      performance.performanceLevel === 'excellent' ? 'text-green-400' :
                      performance.performanceLevel === 'good' ? 'text-blue-400' :
                      performance.performanceLevel === 'fair' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {performance.performanceLevel}
                    </span>
                  </div>
                  {performance.warnings.length > 0 && (
                    <div className="col-span-2 text-yellow-400">
                      ⚠️ {performance.warnings[0]}
                    </div>
                  )}
                </div>
              </div>
            )} */}

            {/* Mode Descriptions */}
            <div className="text-xs text-gray-300">
              {backgroundMode === 'interactive' && "🎮 Move mouse to interact with particles"}
              {backgroundMode === 'layered' && "🏗️ Multiple animation layers combined"}
              {backgroundMode === 'controlled' && "🎛️ Full animation control"}
              {backgroundMode === 'themed' && "🎨 Choose from 19 unique themed animations"}
            </div>
          </div>
        )}

        {/* Main QR Code Generator Card */}
        <Card className="w-full max-w-lg bg-white/10 backdrop-blur-lg text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              QR Code Generator 
              <span className="text-sm font-normal block text-gray-300">
                Powered by Animated Backgrounds v2.0
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Enter URL</Label>
                <Input
                  id="url"
                  type="text"
                  placeholder="Enter URL"
                  value={url}
                  className="text-black"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="qrType">QR Code Type</Label>
                <Select value={qrType} onValueChange={setQrType}>
                  <SelectTrigger className="bg-white text-black">
                    <SelectValue placeholder="Select QR Code Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="URL" className="text-black">URL</SelectItem>
                    <SelectItem value="Text" className="text-black">Text</SelectItem>
                    <SelectItem value="Email" className="text-black">Email</SelectItem>
                    <SelectItem value="Phone" className="text-black">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleGenerateQR} className="w-full">
                Generate QR Code
              </Button>

              {qrVisible && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="qrColor">QR Color</Label>
                    <Input
                      id="qrColor"
                      type="color"
                      value={color}
                      onChange={(e) => {
                        setColor(e.target.value);
                        setQrKey(prev => prev + 1);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bgColor">Background Color</Label>
                    <Input
                      id="bgColor"
                      type="color"
                      value={bgColor}
                      onChange={(e) => {
                        setBgColor(e.target.value);
                        setQrKey(prev => prev + 1);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="errorCorrection">Error Correction Level</Label>
                    <TooltipProvider>
                      <Select value={errorCorrection} onValueChange={handleErrorCorrection}>
                        <SelectTrigger className="bg-white text-black">
                          <SelectValue placeholder="Select Error Correction Level" />
                        </SelectTrigger>
                        <SelectContent>
                          {['L', 'M', 'Q', 'H'].map((level) => (
                            <Tooltip key={level}>
                              <TooltipTrigger asChild>
                                <SelectItem
                                  value={level}
                                  className={`text-black ${errorCorrection === level ? 'bg-blue-100' : ''}`}
                                >
                                  {level} - {level === 'L' ? 'Low' : level === 'M' ? 'Medium' : level === 'Q' ? 'Quartile' : 'High'}
                                </SelectItem>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{level === 'L' ? 'Low: Can restore up to 7% of data' :
                                  level === 'M' ? 'Medium: Can restore up to 15% of data' :
                                    level === 'Q' ? 'Quartile: Can restore up to 25% of data' :
                                      'High: Can restore up to 30% of data'}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </SelectContent>
                      </Select>
                    </TooltipProvider>
                  </div>
                  
                  <div className="flex justify-center items-center my-6">
                    <div id="qr-code" key={qrKey} className="bg-white p-4 rounded-md shadow-md">
                      <QRCode value={url} size={200} fgColor={color} bgColor={bgColor} level={errorCorrection} />
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Button onClick={handleDownloadImage} variant="secondary">
                      📥 Download PNG
                    </Button>
                    <Button onClick={handleDownloadPDF} variant="secondary">
                      📄 Download PDF
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Main App Render
  if (appMode === 'feature-demo') {
    return (
      <div>
        <button
          onClick={() => setAppMode('qr-generator')}
          className="fixed top-4 right-4 z-50 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          🎯 QR Generator
        </button>
        <FeatureDemo />
      </div>
    );
  }

  return renderQRGenerator();
}

export default App;
