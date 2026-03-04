import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const AIAtmosphereAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Realistic cloud system
    class CloudSystem {
      clouds: Array<{ x: number; y: number; size: number; opacity: number; speed: number }> = [];
      
      constructor(earthRadius: number, centerX: number, centerY: number) {
        for (let i = 0; i < 150; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * earthRadius * 0.9;
          this.clouds.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance * 0.5,
            size: Math.random() * 4 + 2,
            opacity: Math.random() * 0.6 + 0.2,
            speed: Math.random() * 0.0003 + 0.0001
          });
        }
      }

      update(centerX: number, centerY: number, time: number) {
        this.clouds.forEach(cloud => {
          const angle = Math.atan2(cloud.y - centerY, cloud.x - centerX);
          const dist = Math.sqrt((cloud.x - centerX) ** 2 + (cloud.y - centerY) ** 2);
          const newAngle = angle + cloud.speed;
          cloud.x = centerX + Math.cos(newAngle) * dist;
          cloud.y = centerY + Math.sin(newAngle) * dist;
        });
      }

      draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, earthRadius: number) {
        this.clouds.forEach(cloud => {
          const dist = Math.sqrt((cloud.x - centerX) ** 2 + (cloud.y - centerY) ** 2);
          if (dist < earthRadius) {
            ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
            ctx.beginPath();
            ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }
    }

    // Weather system (storms, hurricanes)
    class WeatherSystem {
      x: number;
      y: number;
      rotation: number;
      intensity: number;
      type: 'hurricane' | 'heatwave';
      lat: number;
      lon: number;

      constructor(centerX: number, centerY: number, earthRadius: number, type: 'hurricane' | 'heatwave') {
        this.lat = (Math.random() - 0.5) * 0.6;
        this.lon = Math.random() * Math.PI * 2;
        this.x = centerX + Math.cos(this.lon) * earthRadius * 0.7;
        this.y = centerY + this.lat * earthRadius * 0.5;
        this.rotation = 0;
        this.intensity = Math.random() * 0.5 + 0.5;
        this.type = type;
      }

      update(centerX: number, centerY: number, earthRadius: number, time: number) {
        this.lon += 0.0003;
        this.rotation += 0.02;
        this.x = centerX + Math.cos(this.lon + time * 0.0001) * earthRadius * 0.7;
        this.y = centerY + this.lat * earthRadius * 0.5;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        if (this.type === 'hurricane') {
          // Realistic hurricane spiral
          const spiralArms = 4;
          for (let arm = 0; arm < spiralArms; arm++) {
            ctx.beginPath();
            for (let t = 0; t < 3; t += 0.05) {
              const angle = (arm * Math.PI * 2 / spiralArms) + t;
              const r = t * 8 * this.intensity;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              if (t === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 25 * this.intensity);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(0.5, 'rgba(200, 200, 200, 0.4)');
            gradient.addColorStop(1, 'rgba(150, 150, 150, 0)');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Eye of the storm
          ctx.beginPath();
          ctx.arc(0, 0, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(40, 40, 60, 0.8)';
          ctx.fill();
        } else {
          // Heat wave visualization
          const radius = 20 * this.intensity;
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
          gradient.addColorStop(0, 'rgba(220, 80, 60, 0.6)');
          gradient.addColorStop(0.5, 'rgba(240, 120, 80, 0.3)');
          gradient.addColorStop(1, 'rgba(255, 160, 100, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Data transmission beams
    class DataBeam {
      angle: number;
      progress: number;
      speed: number;
      active: boolean;

      constructor(index: number, total: number) {
        this.angle = (index / total) * Math.PI * 2;
        this.progress = Math.random();
        this.speed = 0.005 + Math.random() * 0.003;
        this.active = true;
      }

      update() {
        this.progress += this.speed;
        if (this.progress > 1) {
          this.progress = 0;
          this.active = Math.random() > 0.3;
        }
      }

      draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, earthRadius: number) {
        if (!this.active || this.progress < 0.1) return;

        const startR = earthRadius + 5;
        const endR = earthRadius + 60;
        const currentR = startR + (endR - startR) * this.progress;

        const x1 = centerX + Math.cos(this.angle) * startR;
        const y1 = centerY + Math.sin(this.angle) * startR;
        const x2 = centerX + Math.cos(this.angle) * currentR;
        const y2 = centerY + Math.sin(this.angle) * currentR;

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, 'rgba(100, 200, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // End point glow
        ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(x2, y2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const rect = canvas.getBoundingClientRect();
    let centerX = rect.width / 2;
    let centerY = rect.height / 2;
    let earthRadius = Math.min(rect.width, rect.height) * 0.28;

    const cloudSystem = new CloudSystem(earthRadius, centerX, centerY);
    
    const weatherSystems: WeatherSystem[] = [
      new WeatherSystem(centerX, centerY, earthRadius, 'hurricane'),
      new WeatherSystem(centerX, centerY, earthRadius, 'hurricane'),
      new WeatherSystem(centerX, centerY, earthRadius, 'heatwave'),
      new WeatherSystem(centerX, centerY, earthRadius, 'heatwave')
    ];

    const dataBeams: DataBeam[] = [];
    for (let i = 0; i < 16; i++) {
      dataBeams.push(new DataBeam(i, 16));
    }

    let animationFrame: number;
    let time = 0;
    let scanAngle = 0;

    const drawRealisticEarth = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, earthRadius: number, rotation: number) => {
      // Base ocean gradient
      const oceanGradient = ctx.createRadialGradient(
        centerX - earthRadius * 0.4, centerY - earthRadius * 0.4, earthRadius * 0.2,
        centerX, centerY, earthRadius
      );
      oceanGradient.addColorStop(0, '#4A90E2');
      oceanGradient.addColorStop(0.4, '#2E5C8A');
      oceanGradient.addColorStop(0.7, '#1E3A5F');
      oceanGradient.addColorStop(1, '#0D1F3C');
      
      ctx.fillStyle = oceanGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.fill();

      // Simplified continents using noise-like patterns
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      
      const continents = [
        { x: 0.3, y: -0.2, w: 0.4, h: 0.5, angle: 0.2 },
        { x: -0.4, y: 0.1, w: 0.35, h: 0.4, angle: -0.3 },
        { x: 0.2, y: 0.4, w: 0.3, h: 0.3, angle: 0.5 },
        { x: -0.3, y: -0.4, w: 0.25, h: 0.35, angle: -0.2 }
      ];

      continents.forEach(cont => {
        const x = cont.x * earthRadius;
        const y = cont.y * earthRadius;
        const w = cont.w * earthRadius;
        const h = cont.h * earthRadius;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(cont.angle);
        
        const landGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, w);
        landGradient.addColorStop(0, 'rgba(100, 140, 80, 0.7)');
        landGradient.addColorStop(0.5, 'rgba(80, 110, 60, 0.6)');
        landGradient.addColorStop(1, 'rgba(60, 80, 40, 0)');
        
        ctx.fillStyle = landGradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      ctx.restore();

      // Terminator line (day/night)
      const terminatorGradient = ctx.createLinearGradient(
        centerX - earthRadius, centerY,
        centerX + earthRadius, centerY
      );
      terminatorGradient.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
      terminatorGradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.3)');
      terminatorGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
      terminatorGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = terminatorGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.fill();

      // City lights on night side
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.clip();

      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI - Math.PI / 2;
        const dist = Math.random() * earthRadius * 0.8;
        const x = centerX - Math.cos(angle + rotation) * dist;
        const y = centerY + Math.sin(angle + rotation) * dist;
        
        if (x < centerX - earthRadius * 0.2) {
          ctx.fillStyle = `rgba(255, 220, 150, ${Math.random() * 0.4 + 0.3})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.random() * 1 + 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // Atmosphere
      const atmosphereGradient = ctx.createRadialGradient(
        centerX, centerY, earthRadius,
        centerX, centerY, earthRadius + 25
      );
      atmosphereGradient.addColorStop(0, 'rgba(100, 150, 255, 0.15)');
      atmosphereGradient.addColorStop(0.6, 'rgba(80, 130, 255, 0.08)');
      atmosphereGradient.addColorStop(1, 'rgba(60, 110, 255, 0)');
      
      ctx.fillStyle = atmosphereGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius + 25, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      centerX = rect.width / 2;
      centerY = rect.height / 2;
      earthRadius = Math.min(rect.width, rect.height) * 0.28;
      
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Deep space background
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(rect.width, rect.height) / 2
      );
      bgGradient.addColorStop(0, '#0a0e1a');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      for (let i = 0; i < 100; i++) {
        const x = (i * 73) % rect.width;
        const y = (i * 97) % rect.height;
        const size = ((i * 13) % 3) * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Data beams
      dataBeams.forEach(beam => {
        beam.update();
        beam.draw(ctx, centerX, centerY, earthRadius);
      });

      // Draw realistic Earth
      drawRealisticEarth(ctx, centerX, centerY, earthRadius, time * 0.0002);

      // Cloud cover
      cloudSystem.update(centerX, centerY, time);
      cloudSystem.draw(ctx, centerX, centerY, earthRadius);

      // Weather systems
      weatherSystems.forEach(system => {
        system.update(centerX, centerY, earthRadius, time);
        system.draw(ctx);
      });

      // Scanning radar system
      scanAngle += 0.008;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(scanAngle);
      
      const scanGradient = ctx.createLinearGradient(0, 0, earthRadius + 70, 0);
      scanGradient.addColorStop(0, 'rgba(100, 200, 255, 0)');
      scanGradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.15)');
      scanGradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
      
      ctx.fillStyle = scanGradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, earthRadius + 70, -0.25, 0.25);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();

      // Detection grid overlay
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Latitude grid
      for (let lat = -60; lat <= 60; lat += 30) {
        const y = centerY + (lat / 90) * earthRadius * 0.8;
        const width = Math.sqrt(Math.max(0, earthRadius ** 2 - ((lat / 90) * earthRadius * 0.8) ** 2));
        ctx.beginPath();
        ctx.ellipse(centerX, y, width, width * 0.15, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Longitude grid
      for (let lon = 0; lon < 12; lon++) {
        ctx.beginPath();
        ctx.ellipse(
          centerX, centerY,
          earthRadius * 0.2, earthRadius,
          (lon * Math.PI / 12) + time * 0.0002,
          0, Math.PI * 2
        );
        ctx.stroke();
      }

      // HUD corner brackets
      const bracketSize = Math.min(rect.width, rect.height) * 0.65;
      const bracketLen = 25;
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.4)';
      ctx.lineWidth = 1.5;
      
      const corners = [
        { x: centerX - bracketSize/2, y: centerY - bracketSize/2, dx: 1, dy: 1 },
        { x: centerX + bracketSize/2, y: centerY - bracketSize/2, dx: -1, dy: 1 },
        { x: centerX - bracketSize/2, y: centerY + bracketSize/2, dx: 1, dy: -1 },
        { x: centerX + bracketSize/2, y: centerY + bracketSize/2, dx: -1, dy: -1 },
      ];
      
      corners.forEach(c => {
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x + c.dx * bracketLen, c.y);
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x, c.y + c.dy * bracketLen);
        ctx.stroke();
      });

      // Scanning rings
      for (let i = 0; i < 2; i++) {
        const ringR = earthRadius + 35 + i * 20;
        const pulseOpacity = 0.15 + Math.sin(time * 0.02 + i) * 0.05;
        ctx.strokeStyle = `rgba(100, 200, 255, ${pulseOpacity})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      time++;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default AIAtmosphereAnimation;