class Bubble {
    constructor(x, y, diameter, name) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.name = name;
        this.rollover = false;
        this.targetX = x;
        this.targetY = y;
        this.vx = 0;
        this.vy = 0;
        this.easing = 0.05;
    }

    display(ctx, mouseX, mouseY) {
        // 更新位置
        this.vx = (this.targetX - this.x) * this.easing;
        this.vy = (this.targetY - this.y) * this.easing;
        this.x += this.vx;
        this.y += this.vy;

        // 绘制气泡
        ctx.beginPath();
        ctx.fillStyle = this.rollover ? 'rgba(51, 51, 51, 0.3)' : 'rgba(51, 51, 51, 0.1)';
        ctx.arc(this.x, this.y, this.diameter/2, 0, Math.PI * 2);
        ctx.fill();

        // 如果鼠标悬停，显示文字
        if (this.rollover) {
            ctx.fillStyle = 'rgba(51, 51, 51, 0.8)';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.name, this.x, this.y);
        }
    }

    checkRollover(mouseX, mouseY) {
        let d = Math.sqrt(Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2));
        this.rollover = d < this.diameter/2;
    }

    move(width, height) {
        this.targetX = Math.random() * width;
        this.targetY = Math.random() * height;
    }
}

class HeroAnimation {
    constructor() {
        this.canvas = document.getElementById('heroCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.bubbles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.data = [
            {x: 160, y: 103, diameter: 43, name: "Welcome"},
            {x: 372, y: 137, diameter: 52, name: "Art"},
            {x: 273, y: 235, diameter: 61, name: "Studio"},
            {x: 121, y: 179, diameter: 45, name: "Gallery"},
            {x: 280, y: 150, diameter: 55, name: "Creative"},
            {x: 190, y: 220, diameter: 48, name: "Design"},
            {x: 330, y: 190, diameter: 50, name: "Modern"},
            {x: 220, y: 160, diameter: 46, name: "Traditional"}
        ];
        
        this.init();
    }

    init() {
        this.resize();
        this.loadData();
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('click', () => this.moveBubbles());
        this.animate();

        // 定期移动气泡
        setInterval(() => this.moveBubbles(), 3000);
    }

    loadData() {
        this.bubbles = this.data.map(row => 
            new Bubble(row.x, row.y, row.diameter, row.name)
        );
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx.scale(dpr, dpr);
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }

    moveBubbles() {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;
        this.bubbles.forEach(bubble => bubble.move(width, height));
    }

    draw() {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;

        // 清除画布
        this.ctx.fillStyle = 'rgba(248, 248, 248, 0.3)';
        this.ctx.fillRect(0, 0, width, height);

        // 更新和显示所有气泡
        this.bubbles.forEach(bubble => {
            bubble.checkRollover(this.mouseX, this.mouseY);
            bubble.display(this.ctx, this.mouseX, this.mouseY);
        });
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HeroAnimation();
}); 