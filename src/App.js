import React, { useState, useEffect } from 'react';
import { AnimatedBackground } from 'animated-backgrounds';
import { QRCode } from 'react-qrcode-logo';
import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Label } from "./components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";

function App() {
  const animations = ['autumnLeaves', 'oceanWaves', 'neuralNetwork', 'dnaHelix', 'geometricShapes', 'starryNight', 'floatingBubbles', 'gradientWave', 'particleNetwork', 'galaxySpiral', 'fireflies', 'matrixRain', 'rainbowWaves', 'quantumField', 'electricStorm', 'cosmicDust', 'neonPulse', 'auroraBorealis'];

  const getRandomAnimation = (exclude) => {
    let availableAnimations = animations.filter(animation => animation !== exclude);
    return availableAnimations[Math.floor(Math.random() * availableAnimations.length)];
  };

  const [animationName, setAnimationName] = useState(getRandomAnimation(null));
  const [previousAnimation, setPreviousAnimation] = useState(null);
  const [url, setUrl] = useState('');
  const [qrVisible, setQrVisible] = useState(false);
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrType, setQrType] = useState('URL');
  const [errorCorrection, setErrorCorrection] = useState('H');
  const [qrKey, setQrKey] = useState(0);

  useEffect(() => {
    // Automatically change background every 5 seconds
    const intervalId = setInterval(() => {
      const newAnimation = getRandomAnimation(animationName);
      setPreviousAnimation(animationName);
      setAnimationName(newAnimation);
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [animationName]);

  const handleBackgroundChange = () => {
    const newAnimation = getRandomAnimation(animationName);
    setPreviousAnimation(animationName);
    setAnimationName(newAnimation);
  };

  const handleGenerateQR = () => {
    if (url.trim() !== '') {
      setQrVisible(true);
      setQrKey(previousAnimation => previousAnimation + 1);
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
    setQrKey(previousAnimation => previousAnimation + 1);
  };

  return (
    <div>
      <AnimatedBackground animationName={animationName} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <canvas id="background-canvas" className="absolute inset-0" />
        <Card className="w-full max-w-lg bg-white/10 backdrop-blur-lg text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">QR Code Generator</CardTitle>
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
              <Button onClick={handleGenerateQR} className="w-full">Generate</Button>
              <Button onClick={handleBackgroundChange} className="w-full" variant="secondary">Change Background</Button>

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
                        setQrKey(previousAnimation => previousAnimation + 1);
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
                        setQrKey(previousAnimation + 1);
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
                      Download as Image
                    </Button>
                    <Button onClick={handleDownloadPDF} variant="secondary">
                      Download as PDF
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
}

export default App;
