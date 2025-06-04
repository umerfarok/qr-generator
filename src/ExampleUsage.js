/**
 * Example usage of animated-backgrounds v2.0 features
 * This demonstrates the new capabilities including themes, interactivity, 
 * performance monitoring, and animation controls.
 */

import React, { useState } from 'react';
import { 
  AnimatedBackground, 
  LayeredBackground,
  useAnimationControls, 
  usePerformanceMonitor,
  themeManager,
  THEMES
} from 'animated-backgrounds';

function ExampleUsage() {
  const [currentExample, setCurrentExample] = useState('basic');
  const [selectedTheme, setSelectedTheme] = useState('gaming');
  
  // Animation controls hook
  const controls = useAnimationControls({
    initialSpeed: 1,
    autoPlay: true
  });
  
  // Performance monitoring
  const performance = usePerformanceMonitor({
    warningThreshold: 30,
    autoOptimize: true
  });

  // Example configurations
  const examples = {
    basic: {
      title: 'Basic Animation',
      component: (
        <AnimatedBackground 
          animationName="starryNight"
          blendMode="screen"
        />
      )
    },
    
    themed: {
      title: 'Themed Animation',
      component: (
        <AnimatedBackground 
          animationName="matrixRain"
          theme={selectedTheme}
          enablePerformanceMonitoring={true}
        />
      )
    },
    
    interactive: {
      title: 'Interactive Animation',
      component: (
        <AnimatedBackground 
          animationName="particleNetwork"
          interactive={true}
          interactionConfig={{
            effect: 'attract',
            strength: 0.8,
            radius: 150,
            continuous: true
          }}
          theme="cyberpunk"
        />
      )
    },
    
    controlled: {
      title: 'Controlled Animation',
      component: (
        <AnimatedBackground 
          animationName="galaxySpiral"
          animationControls={controls}
          enablePerformanceMonitoring={true}
        />
      )
    },
    
    layered: {
      title: 'Layered Background',
      component: (
        <LayeredBackground 
          layers={[
            { 
              animation: 'starryNight', 
              opacity: 0.7, 
              blendMode: 'normal',
              speed: 0.5 
            },
            { 
              animation: 'particleNetwork', 
              opacity: 0.3, 
              blendMode: 'screen',
              speed: 1.2 
            },
            { 
              animation: 'cosmicDust', 
              opacity: 0.5, 
              blendMode: 'overlay',
              speed: 0.8 
            }
          ]}
          enablePerformanceMonitoring={true}
        />
      )
    },
    
    adaptive: {
      title: 'Adaptive Performance',
      component: (
        <AnimatedBackground 
          animationName="electricStorm"
          theme="party"
          adaptivePerformance={true}
          enablePerformanceMonitoring={true}
          interactive={true}
          interactionConfig={{
            effect: 'burst',
            strength: 1.0,
            radius: 200
          }}
        />
      )
    }
  };

  const currentConfig = examples[currentExample];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: 'white' }}>
      {/* Render current example */}
      {currentConfig.component}
      
      {/* Control Panel */}
      <div style={{
        position: 'fixed',
        top: 20,
        left: 20,
        background: 'rgba(0,0,0,0.8)',
        padding: '20px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        maxWidth: '350px',
        zIndex: 1000
      }}>
        <h2 style={{ margin: '0 0 15px 0', fontSize: '1.2em' }}>
          🎮 Animation Controls
        </h2>
        
        {/* Example Selector */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>
            Example Type:
          </label>
          <select 
            value={currentExample}
            onChange={(e) => setCurrentExample(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: 'none',
              background: '#333',
              color: 'white'
            }}
          >
            {Object.entries(examples).map(([key, config]) => (
              <option key={key} value={key}>{config.title}</option>
            ))}
          </select>
        </div>

        {/* Theme Selector (for themed example) */}
        {currentExample === 'themed' && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>
              Theme:
            </label>
            <select 
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: 'none',
                background: '#333',
                color: 'white'
              }}
            >
              {Object.keys(THEMES).map(theme => (
                <option key={theme} value={theme}>
                  {THEMES[theme].name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Animation Controls (for controlled example) */}
        {currentExample === 'controlled' && (
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
              <button 
                onClick={controls.play}
                style={{ 
                  flex: 1, 
                  padding: '8px', 
                  border: 'none', 
                  borderRadius: '5px',
                  background: controls.isPlaying ? '#4CAF50' : '#666',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                ▶ Play
              </button>
              <button 
                onClick={controls.pause}
                style={{ 
                  flex: 1, 
                  padding: '8px', 
                  border: 'none', 
                  borderRadius: '5px',
                  background: !controls.isPlaying ? '#f44336' : '#666',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                ⏸ Pause
              </button>
              <button 
                onClick={controls.reset}
                style={{ 
                  flex: 1, 
                  padding: '8px', 
                  border: 'none', 
                  borderRadius: '5px',
                  background: '#2196F3',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                🔄 Reset
              </button>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>
                Speed: {controls.speed.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={controls.speed}
                onChange={(e) => controls.setSpeed(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        )}

        {/* Performance Monitor */}
        {(currentExample === 'controlled' || currentExample === 'adaptive' || currentExample === 'themed') && performance && (
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1em' }}>
              📊 Performance
            </h3>
            <div style={{ fontSize: '0.85em', lineHeight: '1.4' }}>
              <div>FPS: <span style={{ color: '#4CAF50' }}>{performance.fps}</span></div>
              <div>Avg FPS: <span style={{ color: '#2196F3' }}>{performance.avgFps}</span></div>
              <div>Level: <span style={{ 
                color: performance.performanceLevel === 'excellent' ? '#4CAF50' :
                      performance.performanceLevel === 'good' ? '#8BC34A' :
                      performance.performanceLevel === 'fair' ? '#FF9800' : '#f44336'
              }}>
                {performance.performanceLevel}
              </span></div>
              {performance.memoryUsage > 0 && (
                <div>Memory: {performance.memoryUsage}MB</div>
              )}
              {performance.warnings.length > 0 && (
                <div style={{ color: '#ff9800', marginTop: '5px' }}>
                  ⚠️ {performance.warnings[0]}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Usage Instructions */}
        <div style={{ fontSize: '0.8em', color: '#ccc', marginTop: '15px' }}>
          <strong>Instructions:</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            {currentExample === 'interactive' && (
              <li>Move your mouse around to attract particles</li>
            )}
            {currentExample === 'controlled' && (
              <li>Use controls to play/pause and adjust speed</li>
            )}
            {currentExample === 'layered' && (
              <li>Multiple animations composited together</li>
            )}
            {currentExample === 'adaptive' && (
              <li>Click/tap for burst effects, auto-optimizes performance</li>
            )}
            {currentExample === 'themed' && (
              <li>Switch themes to see different color schemes</li>
            )}
            {currentExample === 'basic' && (
              <li>Simple animated background with blend mode</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExampleUsage; 