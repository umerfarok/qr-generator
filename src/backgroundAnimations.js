// src/backgroundAnimations.js

export const starryNight = (canvas, ctx) => {
  const stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      vx: Math.floor(Math.random() * 50) - 25,
      vy: Math.floor(Math.random() * 50) - 25,
      twinkle: Math.random()
    });
  }

  return () => {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFF';
    stars.forEach(star => {
      star.twinkle += 0.02;
      const opacity = Math.abs(Math.sin(star.twinkle));
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
      
      star.x += star.vx / 60;
      star.y += star.vy / 60;
      
      if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
      if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;
    });
  };
};

export const floatingBubbles = (canvas, ctx) => {
  const bubbles = [];
  for (let i = 0; i < 75; i++) {
    bubbles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 30 + 5,
      speed: Math.random() * 0.7 + 0.1,
      color: `hsla(${Math.random() * 360}, 70%, 60%, 0.6)`
    });
  }

  return () => {
    ctx.fillStyle = 'rgba(30, 41, 59, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    bubbles.forEach(bubble => {
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fillStyle = bubble.color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.stroke();
      
      bubble.y -= bubble.speed;
      bubble.x += Math.sin(bubble.y * 0.03) * 0.5;
      if (bubble.y + bubble.radius < 0) {
        bubble.y = canvas.height + bubble.radius;
        bubble.x = Math.random() * canvas.width;
      }
    });
  };
};

export const gradientWave = (canvas, ctx) => {
  let time = 0;

  return () => {
    time += 0.01;
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${time * 10 % 360}, 70%, 50%)`);
    gradient.addColorStop(1, `hsl(${(time * 10 + 180) % 360}, 70%, 50%)`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.15 * i + Math.sin(time + i) * 30);
      for (let x = 0; x < canvas.width; x += 10) {
        ctx.lineTo(x, canvas.height * 0.15 * i + Math.sin(time + i + x * 0.01) * 30);
      }
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - i * 0.01})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };
};

export const particleNetwork = (canvas, ctx) => {
  const particles = [];
  const particleCount = 150;
  const maxDistance = 120;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      vx: Math.random() * 1.5 - 0.75,
      vy: Math.random() * 1.5 - 0.75,
      color: `hsl(${Math.random() * 360}, 70%, 70%)`
    });
  }

  return () => {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  };
};

export const galaxySpiral = (canvas, ctx) => {
  const stars = [];
  const starCount = 2000;
  let rotation = 0;

  for (let i = 0; i < starCount; i++) {
    const distance = Math.random() * canvas.width * 0.4;
    const angle = Math.random() * Math.PI * 2;
    stars.push({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      radius: Math.random() * 1.5 + 0.5,
      color: `hsl(${Math.random() * 60 + 200}, 80%, 70%)`,
      angle: angle,
      distance: distance
    });
  }

  return () => {
    ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);
    
    stars.forEach(star => {
      const x = Math.cos(star.angle) * star.distance;
      const y = Math.sin(star.angle) * star.distance;
      
      ctx.beginPath();
      ctx.arc(x, y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.fill();
      
      star.angle += 0.0005 / (star.distance * 0.00001);
    });
    
    ctx.restore();
    rotation += 0.0005;
  };
};