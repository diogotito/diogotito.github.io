'use strict';

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
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
		
		return starPoints;
	}
	
	constructor(x, y, vx, vy, vr, radius) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.vr = vr / 180 * Math.PI;
		this.radius = radius;
		
		this.rotation = 0;		
		this.starPoints = Star.computeStarPoints(0, 0.45);
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.rotation += this.vr;
	}
	
	draw(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);
		ctx.beginPath();
		
		for (var point of this.starPoints)
			ctx.lineTo(point.x * this.radius, point.y * this.radius);
		
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
}


var ctx;
var stars;


function createStars(radius, width, height) {
	var stars = [];
	
	for (var x = radius; x < width; x += radius*2)
		for (var y = radius; y < height; y += radius*2)
			stars.push( new Star(x, y, 0, 0, Math.random()*10-5, radius) );
	
	return stars;
}


function animate() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.fillStyle = "black";
	
	for (var star of stars) {
		star.update();
		star.draw(ctx);
	}
	
	window.requestAnimationFrame(animate);
}


document.addEventListener("DOMContentLoaded", function () {
	var canvas = document.getElementById("canvas");
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	
	ctx = canvas.getContext("2d");
	stars = createStars(10, canvas.width, canvas.height);
	
	window.requestAnimationFrame(animate);
});

