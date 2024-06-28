import React, { useState, useEffect, useCallback } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Label } from "./components/ui/label";
import { starryNight, floatingBubbles, gradientWave, particleNetwork } from './backgroundAnimations';

function App() {
  const [url, setUrl] = useState('');
  const [qrVisible, setQrVisible] = useState(false);
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrType, setQrType] = useState('URL');
  const [errorCorrection, setErrorCorrection] = useState('L');
  const [animationIndex, setAnimationIndex] = useState(0);
  const [tooltipContent, setTooltipContent] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);


  const handleMouseEnter = (content) => {
    setTooltipContent(content);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const animations = [starryNight, floatingBubbles, gradientWave, particleNetwork];

  const animate = useCallback(() => {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animation = animations[animationIndex](canvas, ctx);
    let animationFrameId;

    const loop = () => {
      animation();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationIndex]);

  useEffect(() => {
    const cleanup = animate();
    return () => cleanup();
  }, [animate]);

  useEffect(() => {
    const storedIndex = localStorage.getItem('backgroundAnimationIndex');
    const newIndex = storedIndex ? (parseInt(storedIndex) + 1) % animations.length : 0;
    setAnimationIndex(newIndex);
    localStorage.setItem('backgroundAnimationIndex', newIndex.toString());
  }, []);

  const handleGenerateQR = () => {
    if (url.trim() !== '') {
      setQrVisible(true);
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
  }

  return (
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
                color="black"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qrType">QR Code Type</Label>
              <Select value={qrType} onValueChange={setQrType}>
                <SelectTrigger>
                  <SelectValue style={{color:'black'}} placeholder="Select QR Code Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="URL" style={{ color: 'black' }}>URL</SelectItem>
                  <SelectItem value="Text" style={{ color: 'black' }}>Text</SelectItem>
                  <SelectItem value="Email" style={{ color: 'black' }}>Email</SelectItem>
                  <SelectItem value="Phone" style={{ color: 'black' }}>Phone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleGenerateQR} className="w-full">Generate</Button>

            {qrVisible && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="qrColor">QR Color</Label>
                  <Input
                    id="qrColor"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bgColor">Background Color</Label>
                  <Input
                    id="bgColor"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  {showTooltip && (
                    <div style={{ position: 'absolute', border: '1px solid #ccc', padding: '10px', backgroundColor: '#f9f9f9', color: 'black' }}>
                      {tooltipContent}
                    </div>
                  )}
                  <Label htmlFor="errorCorrection">Error Correction Level</Label>
                  <Select value={errorCorrection} onValueChange={handleErrorCorrection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Error Correction Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L" title="Low: Can restore up to 7% of data" onMouseEnter={() => handleMouseEnter("Low: Can restore up to 7% of data")} onMouseLeave={handleMouseLeave}><span style={{ color: 'black' }}>L - Low</span></SelectItem>
                      <SelectItem value="M" title="Medium: Can restore up to 15% of data" onMouseEnter={() => handleMouseEnter("Medium: Can restore up to 15% of data")} onMouseLeave={handleMouseLeave}><span style={{ color: 'black' }}>M - Medium</span></SelectItem>
                      <SelectItem value="Q" title="Quartile: Can restore up to 25% of data" onMouseEnter={() => handleMouseEnter("Quartile: Can restore up to 25% of data")} onMouseLeave={handleMouseLeave}><span style={{ color: 'black' }}>Q - Quartile</span></SelectItem>
                      <SelectItem value="H" title="High: Can restore up to 30% of data" onMouseEnter={() => handleMouseEnter("High: Can restore up to 30% of data")} onMouseLeave={handleMouseLeave}><span style={{ color: 'black' }}>H - High</span></SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center items-center my-6">
                  <div id="qr-code" className="bg-white p-4 rounded-md shadow-md">
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
  );
}

export default App;