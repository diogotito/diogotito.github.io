'use strict';

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	translate(dx, dy) {
		this.x += dx;
		this.y += dy;
	}
	
	applyTransform([[a, b], [c, d]]) {
		var newX = a*this.x + b*this.y;
		var newY = c*this.x + d*this.y;
		this.x = newX;
		this.y = newY;
	}
	
	toString() {
		return `(${this.x}, ${this.y})`;
	}
}


class Star {
	static computeStarPoints(rotation, pointSize) {
		var starPoints = [];
		
		for (var i = 0; i < 10; i++) {
			var angle = i * 2 * Math.PI / 10;
			var x = Math.cos(angle);
			var y = Math.sin(angle);
			
			if (i % 2 == 0) {
				starPoints.push(new Point(x, y));
			} else {
				starPoints.push(new Point(x * pointSize, y * pointSize));
			}
		}
		
		console.log(starPoints);
		return starPoints;
	}
	
	static computeRotationMatrix(degrees) {
		var radians = degrees / 180 * Math.PI;
		var sin = Math.sin(radians);
		var cos = Math.cos(radians);
		
		return [[cos, -sin],
		        [sin,  cos]];
	}
	
	constructor(x, y, vx, vy, radius, rotVelocity) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.radius = radius;
		
		this.starPoints = Star.computeStarPoints(0, 0.45);
		console.log("POINTS: %s", this.starPoints.join(", "));
		this.rotationMatrix = Star.computeRotationMatrix(rotVelocity);
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.starPoints.forEach( point => {
			point.applyTransform(this.rotationMatrix)
		});
	}
	
	draw(ctx) {
		ctx.beginPath();
		
		for (var point of this.starPoints)
			ctx.lineTo( point.x * this.radius + this.x,
			            point.y * this.radius + this.y );
		
		ctx.closePath();
		ctx.stroke();
	}
}


document.addEventListener("DOMContentLoaded", function () {
	var canvas = document.getElementById("canvas");
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	// document.write("hi");
	
	var ctx = canvas.getContext("2d");
	
	ctx.fillStyle = /* ES6 is the new */ "black";
	
	
	// ALERTA: PÉSSIMAS IDEIAS!
	
	// Bem, nós certamente queremos limpar a canvas neste frame antes do browser
	// exibir a nossa obra de arte...
	
	requestAnimationFrame( function raf() {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    requestAnimationFrame(raf);
	    // Ou tirávamos o `raf` depois do `function`, e aqui escrevíamos
	    // `arguments.callee` - se não estivéssemos em "strict mode".
	});
	
	// Aqui, se mudares os 3 lets para vars, este código deixa de funcionar!
	// Block scoping FTW!
	for (let x = 10; x < canvas.width; x += 20) {
		for (let y = 10; y < canvas.height; y += 20) {
			let star = new Star(x, y, 0, 0, 10, Math.random()*20-10);
			
			requestAnimationFrame( function raf() {
				star.update();
				star.draw(ctx);
				requestAnimationFrame(raf);
			});
			
			// Olha! Não precisei duma Array para armazenar estas 5000 estrelas!
			// Se um game developer lesse este código certamente me iria esfolar
		}
	}
	
	// End of ALERTA: PÉSSIMAS IDEIAS!
	
});

