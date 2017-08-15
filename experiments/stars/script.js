'use strict';

class Point {
	// Powered by Álgebra Linear
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	applyTransform( [[a, b], [c, d]] ) {
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
		this.rotationMatrix = Star.computeRotationMatrix(rotVelocity);
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.starPoints.forEach( point => {
			point.applyTransform( this.rotationMatrix)
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


var ctx;
var stars;


function createStars(radius, width, height) {
	var stars = [];
	
	for (var x = radius; x < width; x += radius*2)
		for (var y = radius; y < height; y += radius*2)
			stars.push( new Star(x, y, 0, 0, radius, Math.random()*10-5) );
	
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

