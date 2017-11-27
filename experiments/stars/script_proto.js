var pointProto = {
	x: 0,
	y: 0,
	
	moveTo: function (x, y) {
		this.x = x;
		this.y = y;
		return this;
	},
	
	translate: function (dx, dy) {
		this.x += dx;
		this.y += dy;
	}
};

var makePoint = function(x, y) {
	return Object.create(pointProto).moveTo(x, y);
};

var starProto = (function () {
	
	function computeStarPoints(rotation, pointSize) {
		rotation = rotation || 0;
		pointSize = pointSize || 0.45;
		var starPoints = [];
		
		for (var i = 0; i < 10; i++) {
			var angle = i * 2 * Math.PI / 10;
			var x = Math.cos(angle);
			var y = Math.sin(angle);
			
			if (i % 2 == 0) {
				starPoints.push(Object.create(pointProto).moveTo(x, y));
			} else {
				starPoints.push([x * pointSize, y * pointSize]);
			}
		}
		
		return starPoints;
	}
	
	
	return {
		position: Object
		
	};
	
})();


document.addEventListener("DOMContentLoaded", function () {
	var canvas = document.getElementById("canvas");
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	// document.write("hi");
	
	var ctx = canvas.getContext("2d");
	
	ctx.fillStyle = "black";
	
	var points = computeStarPoints();
	var rotationMatrix = makeRotationMatrix(20 / 180 * Math.PI);
	points.forEach( point => applyTransform(point, rotationMatrix) );
	
	ctx.beginPath();
	for (var i = 0; i < points.length; i++) {
		var point = points[i];
		
		var x = point[0] * 50 + 50;
		var y = point[1] * 50 + 50;
		ctx.lineTo(x, y);
	}
	ctx.closePath();
	ctx.stroke();
	
	ctx.fillRect(100, 100, 100, 100);
	
});




function makeRotationMatrix(angle) {
	var cos = Math.cos(angle),
	    sin = Math.sin(angle);
	
 	return [[cos, -sin],
	        [sin,  cos]];
}

function applyTransform(point, matrix) {
	var newX = matrix[0][0] * point[0] + matrix[0][1] * point[1];
	var newY = matrix[1][0] * point[0] + matrix[1][1] * point[1];
	point[0] = newX;
	point[1] = newY;
}