import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  AnimatedBackground,
  LayeredBackground,
  useAnimationControls,
  usePerformanceMonitor,
  THEMES
} from 'animated-backgrounds';
import ErrorBoundary from './components/ErrorBoundary';
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

  // Available animations from package - memoized to prevent re-renders
  const animations = useMemo(() => [
    'starryNight', 'floatingBubbles', 'gradientWave', 'particleNetwork',
    'galaxySpiral', 'rainbowWaves', 'geometricShapes', 'fireflies',
    'matrixRain', 'quantumField', 'electricStorm', 'cosmicDust',
    'neonPulse', 'auroraBorealis', 'oceanWaves', 'autumnLeaves', 'dnaHelix'
  ], []);

  const getRandomAnimation = useCallback((exclude) => {
    let availableAnimations = animations.filter(animation => animation !== exclude);
    const selected = availableAnimations[Math.floor(Math.random() * availableAnimations.length)];
    return selected;
  }, [animations]);

  // State management for QR Generator - Enhanced with better defaults
  const [animationName, setAnimationName] = useState('particleNetwork'); // Better particle design than floatingBubbles
  const [selectedTheme, setSelectedTheme] = useState('cyberpunk'); // Available theme from package
  const [backgroundMode, setBackgroundMode] = useState('themed'); // 'themed', 'interactive', 'layered', 'controlled'
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);
  const [url, setUrl] = useState('https://animated-backgrounds-v2.com'); // Better example URL
  const [qrVisible, setQrVisible] = useState(false);
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrType, setQrType] = useState('URL');
  const [errorCorrection, setErrorCorrection] = useState('H');
  const [qrKey, setQrKey] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Enhanced v2.0 features state - keeping only what's actually used
  const [interactionStrength, setInteractionStrength] = useState(0.8);

  // New v2.0 hooks
  const controls = useAnimationControls({
    initialSpeed: 1,
    autoPlay: true
  });

  const performance = usePerformanceMonitor({
    warningThreshold: 30,
    autoOptimize: true
  });

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

  // QR Code state - keeping only what's used
  const [qrCodeDataURL, setQRCodeDataURL] = useState('');
  
  // QR Code options - keeping only what's used
  const [options, setOptions] = useState({
    errorCorrectionLevel: 'M',
    type: 'image/png',
    quality: 0.92,
    margin: 1,
    color: {
      dark: '#1a1a1a',
      light: '#FFFFFF'
    },
    width: 300,
    scale: 4
  });

  // Background state is handled by backgroundMode, no need for separate config

  // Refs - keeping only what's used
  const qrDisplayRef = useRef(null);

  // Handle loading states for animation changes
  useEffect(() => {
    setIsLoadingAnimation(true);
    const timer = setTimeout(() => {
      setIsLoadingAnimation(false);
    }, 500); // Show loading for 500ms to ensure smooth transition
    return () => clearTimeout(timer);
  }, [animationName, selectedTheme, backgroundMode]);

  const handleGenerateQR = () => {
    if (url.trim() === '') {
      setErrorMessage('Please enter a valid URL to generate a QR code.');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setErrorMessage('URL must start with http:// or https://');
      return;
    }

    setErrorMessage(''); // Clear any previous errors
    setQrVisible(true);
    setQrKey(prev => prev + 1);
  };

  const handleDownloadImage = () => {
    const qrElement = document.getElementById('qr-code');
    if (!qrElement) {
      setErrorMessage('QR code not found. Please generate a QR code first.');
      return;
    }

    htmlToImage.toPng(qrElement)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = dataUrl;
        link.click();
        setErrorMessage(''); // Clear any previous errors
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
        setErrorMessage('Failed to download QR code image. Please try again.');
      });
  };

  const handleDownloadPDF = () => {
    const qrElement = document.getElementById('qr-code');
    if (!qrElement) {
      setErrorMessage('QR code not found. Please generate a QR code first.');
      return;
    }

    htmlToImage.toPng(qrElement)
      .then((dataUrl) => {
        try {
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('qr-code.pdf');
          setErrorMessage(''); // Clear any previous errors
        } catch (pdfError) {
          console.error('Error creating PDF:', pdfError);
          setErrorMessage('Failed to create PDF. Please try the PNG download instead.');
        }
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
        setErrorMessage('Failed to process QR code for PDF. Please try the PNG download instead.');
      });
  };

  const handleErrorCorrection = (value) => {
    setErrorCorrection(value);
    setQrKey(prev => prev + 1);
  };

  // Render different background modes for QR Generator
  const renderQRBackground = useCallback(() => {
    const getFallbackMessage = (mode) => {
      switch (mode) {
        case 'interactive':
          return "Failed to load interactive particle animation. Try selecting a different theme or animation.";
        case 'layered':
          return "Failed to load layered background animation. Try a simpler animation mode.";
        case 'controlled':
          return "Failed to load controlled animation. Try a different animation or theme.";
        default:
          return "Failed to load themed animation. Try selecting a different animation or theme.";
      }
    };

    return (
      <ErrorBoundary fallbackMessage={getFallbackMessage(backgroundMode)}>
        {(() => {
          switch (backgroundMode) {
            case 'interactive':
              return (
                <AnimatedBackground
                  key="interactive-bg"
                  animationName="particleNetwork"
                  interactive={true}
                  interactionConfig={interactionConfig}
                  theme={selectedTheme}
                  enablePerformanceMonitoring={true}
                  adaptivePerformance={true}
                />
              );

            case 'layered':
              return (
                <LayeredBackground
                  key="layered-bg"
                  layers={layeredBackgroundLayers}
                  enablePerformanceMonitoring={true}
                />
              );

            case 'controlled':
              return (
                <AnimatedBackground
                  key="controlled-bg"
                  animationName="galaxySpiral"
                  animationControls={controls}
                  theme={selectedTheme}
                  enablePerformanceMonitoring={true}
                  adaptivePerformance={true}
                />
              );

            default: // 'themed'
              return (
                <AnimatedBackground
                  key="themed-bg"
                  animationName={animationName}
                  theme={selectedTheme}
                  enablePerformanceMonitoring={true}
                  adaptivePerformance={true}
                />
              );
          }
        })()}
      </ErrorBoundary>
    );
  }, [backgroundMode, selectedTheme, animationName, controls, interactionConfig, layeredBackgroundLayers]);

  // Render QR Generator App
  const renderQRGenerator = () => (
    <div>
      {renderQRBackground()}

      {/* Loading Overlay */}
      {isLoadingAnimation && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-sm">Loading animation...</p>
          </div>
        </div>
      )}

      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* App Mode Toggle */}
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button
            onClick={() => setAppMode('qr-generator')}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              appMode === 'qr-generator'
                ? 'bg-blue-600 text-white'
                : 'bg-white/20 backdrop-blur text-white hover:bg-white/30'
            }`}
          >
            🎯 QR Generator
          </button>
          <button
            onClick={() => setAppMode('feature-demo')}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              appMode === 'feature-demo'
                ? 'bg-purple-600 text-white'
                : 'bg-white/20 backdrop-blur text-white hover:bg-white/30'
            }`}
          >
            🎨 Feature Demo
          </button>
        </div>

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
            {performance && (
              <div className="mb-3 text-xs">
                <Label className="text-white">📊 Performance:</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>FPS: <span className="text-green-400">{performance.fps || 60}</span></div>
                  <div>Avg: <span className="text-blue-400">{performance.avgFps || 60}</span></div>
                  <div className="col-span-2">
                    Level: <span className={`
                      ${performance.performanceLevel === 'excellent' ? 'text-green-400' :
                        performance.performanceLevel === 'good' ? 'text-blue-400' :
                        performance.performanceLevel === 'fair' ? 'text-yellow-400' : 'text-red-400'}
                    `}>
                      {performance.performanceLevel || 'good'}
                    </span>
                  </div>
                  {performance.warnings && performance.warnings.length > 0 && (
                    <div className="col-span-2 text-yellow-400">
                      ⚠️ {performance.warnings[0]}
                    </div>
                  )}
                </div>
              </div>
            )}

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
