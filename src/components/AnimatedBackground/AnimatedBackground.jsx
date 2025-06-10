import { useEffect, useRef } from 'react'
import './AnimatedBackground.css'

class GridWorm {  constructor(point, interval, pointsList, screenWidth, screenHeight) {
    this.radius = 2;
    this.xCoord = point.x;
    this.yCoord = point.y;
    this.interval = interval;
    this.speed = 2; // Reduced speed
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.pointsList = pointsList;
    this.velocity = this.getVelocity();    this.junctionMemory = [{
      point: { x: point.x, y: point.y },
      velocity: this.velocity,
      age: 0
    }];
    this.junctionMemoryLength = 8;
    this.lastPoint = { x: point.x, y: point.y };
    this.colorIndex = Math.random() * 4;
    this.colorTransitionSpeed = 0.0005;
    this.nextColorIndex = Math.floor(Math.random() * 4);
    this.color = this.getColor();
    this.timeSinceLastDirectionChange = 0; // Time tracker for forced direction changes
    this.directionChangeInterval = 100; // Change direction every 100 frames
  }  getColor() {
    const colors = [
      { r: 100, g: 108, b: 255 }, // Blue
      { r: 255, g: 100, b: 108 }, // Pink
      { r: 108, g: 255, b: 100 }, // Green
      { r: 255, g: 180, b: 100 }  // Orange
    ];
    
    const c1 = colors[Math.floor(this.colorIndex) % colors.length];
    const c2 = colors[this.nextColorIndex];
    
    const progress = (this.colorIndex % 1);
    const r = Math.floor(c1.r * (1 - progress) + c2.r * progress);
    const g = Math.floor(c1.g * (1 - progress) + c2.g * progress);
    const b = Math.floor(c1.b * (1 - progress) + c2.b * progress);
    
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  }  getVelocity() {
    // Add inertia by sometimes keeping the current velocity (20% chance)
    if (this.velocity && Math.random() < 0.2) {
      return { ...this.velocity };
    }

    // Make diagonal movement rare (5% chance)
    if (Math.random() < 0.05) {
      return {
        x: Math.random() > 0.5 ? -this.speed : this.speed,
        y: Math.random() > 0.5 ? -this.speed : this.speed
      };
    }
    
    // Most of the time, move either horizontally or vertically
    if (Math.random() > 0.5) {
      return {
        x: Math.random() > 0.5 ? -this.speed : this.speed,
        y: 0
      };
    } else {
      return {
        x: 0,
        y: Math.random() > 0.5 ? -this.speed : this.speed
      };
    }
  }
  draw(ctx) {
    // Update ages of trail segments
    this.junctionMemory = this.junctionMemory.map(junction => ({
      ...junction,
      age: (junction.age || 0) + 1
    })).filter(junction => junction.age < 120); // Remove after 2 seconds

    // Draw the trail with fading effect
    if (this.junctionMemory.length > 1) {
      for (let i = 0; i < this.junctionMemory.length - 1; i++) {
        const current = this.junctionMemory[i];
        const next = this.junctionMemory[i + 1];
        const opacity = Math.max(0, 0.6 * (1 - current.age / 120));
        
        ctx.beginPath();
        ctx.moveTo(next.point.x, next.point.y);
        ctx.lineTo(current.point.x, current.point.y);
        
        const [r, g, b] = this.color.match(/\d+/g);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.lineWidth = this.radius * 2;
        ctx.stroke();
      }
    }

    // Draw the head
    ctx.beginPath();
    ctx.arc(this.xCoord, this.yCoord, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }  update() {
    // Move based on current velocity
    this.xCoord += this.velocity.x;
    this.yCoord += this.velocity.y;
    
    // Increment time since last direction change
    this.timeSinceLastDirectionChange++;
    
    // Force direction change if too much time has passed, but only at grid points
    const currentPoint = this.getNearestGridPoint();
    const isAtGridPoint = currentPoint !== null;
    
    if (isAtGridPoint && this.timeSinceLastDirectionChange >= this.directionChangeInterval) {
      this.velocity = this.getVelocity();
      this.timeSinceLastDirectionChange = 0;
      
      // Snap to grid point for precise movement
      this.xCoord = currentPoint.x;
      this.yCoord = currentPoint.y;
      
      // Add to junction memory
      this.junctionMemory.push({
        point: { ...currentPoint },
        velocity: { ...this.velocity },
        age: 0
      });
    }

    // Track position in memory when moving significantly
    if (Math.abs(this.xCoord - this.lastPoint.x) > this.interval / 3 ||
        Math.abs(this.yCoord - this.lastPoint.y) > this.interval / 3) {
      this.junctionMemory.push({
        point: { x: this.xCoord, y: this.yCoord },
        velocity: { ...this.velocity },
        age: 0
      });
      if (this.junctionMemory.length > this.junctionMemoryLength) {
        this.junctionMemory.shift();
      }
      this.lastPoint = { x: this.xCoord, y: this.yCoord };
    }
    
    // Smooth color transitions
    this.colorIndex += this.colorTransitionSpeed;
    if (this.colorIndex % 1 > 0.99) {
      this.colorIndex = Math.floor(this.colorIndex);
      this.nextColorIndex = Math.floor(Math.random() * 4);
    }
    this.color = this.getColor();

    // Boundary checks with smooth transitions
    if (this.xCoord <= this.interval) {
      this.xCoord = this.interval;
      if (this.velocity.x < 0) {
        const newVelocity = this.getVelocity();
        this.velocity = {
          x: Math.abs(newVelocity.x),
          y: newVelocity.y
        };
      }
    }
    if (this.xCoord >= this.screenWidth - this.interval) {
      this.xCoord = this.screenWidth - this.interval;
      if (this.velocity.x > 0) {
        const newVelocity = this.getVelocity();
        this.velocity = {
          x: -Math.abs(newVelocity.x),
          y: newVelocity.y
        };
      }
    }
    if (this.yCoord <= this.interval) {
      this.yCoord = this.interval;
      if (this.velocity.y < 0) {
        const newVelocity = this.getVelocity();
        this.velocity = {
          x: newVelocity.x,
          y: Math.abs(newVelocity.y)
        };
      }
    }
    if (this.yCoord >= this.screenHeight - this.interval) {
      this.yCoord = this.screenHeight - this.interval;
      if (this.velocity.y > 0) {
        const newVelocity = this.getVelocity();
        this.velocity = {
          x: newVelocity.x,
          y: -Math.abs(newVelocity.y)
        };
      }
    }
    
    // If at a grid point, occasionally change direction
    if (isAtGridPoint && Math.random() < 0.2) {
      this.velocity = this.getVelocity();
      this.timeSinceLastDirectionChange = 0;
    }
  }
  getNearestGridPoint() {
    const gridX = Math.round(this.xCoord / this.interval) * this.interval;
    const gridY = Math.round(this.yCoord / this.interval) * this.interval;
    
    // Check if we're close enough to a grid point
    const distance = Math.sqrt(
      Math.pow(this.xCoord - gridX, 2) + 
      Math.pow(this.yCoord - gridY, 2)
    );
    
    if (distance < this.radius * 2) {
      const point = this.pointsList.find(p => p.x === gridX && p.y === gridY);
      if (point) {
        return point;
      }
    }
    return null;
  }
}

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let worms = [];
    let points = [];
    const interval = 40;
    let animationFrameId;

    const createPoints = (width, height) => {
      const points = [];
      for (let y = interval; y < height; y += interval) {
        for (let x = interval; x < width; x += interval) {
          points.push({ x, y });
        }
      }
      return points;
    };

    const initialize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      points = createPoints(canvas.width, canvas.height);
      worms = [];
      
      // Create worms
      for (let i = 0; i < 30; i++) {
        const randomPoint = points[Math.floor(Math.random() * points.length)];
        worms.push(new GridWorm(randomPoint, interval, points, canvas.width, canvas.height));
      }
    };    
    
    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      worms.forEach(worm => {
        worm.update();
        worm.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initialize();
    animate();

    const handleResize = () => {
      initialize();
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('click', initialize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', initialize);
    };
  }, []);

  return (
    <div className="animated-background">
      <canvas ref={canvasRef} className="worm-canvas" />
    </div>
  );
};

export default AnimatedBackground
