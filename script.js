var canvas = document.getElementById("radar");
canvas.width = $(window).width() - ($(window).width()/2) - 100 ;
canvas.height = $(window).width() - ($(window).width()/2) - 100 ;

var canvas = document.getElementById("radar");
var ctx = canvas.getContext('2d');
ctx.fillStyle = "rgba(34, 34, 34, 1)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var a =  $('#radar').width() - ($('#radar').width()/2);     // radius for whole circle
var b = a; var c = b; var d = c ;
var line = {
	x: a,
	y: a,
	length: a,
	angle: 4.7,  /* starting point of niddle */
	speed: Math.PI / 360,
	end: {
		x: a,
		y: 0
	}
}
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.heigh);
}
line.draw = function(){
	this.angle += this.speed;
    this.end.x = this.x + this.length * Math.cos(this.angle);
	this.end.y = this.y + this.length * Math.sin(this.angle);
	ctx.save();
	ctx.strokeStyle = "#383";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(this.x,this.y);
	ctx.lineTo(this.end.x,this.end.y);
	ctx.stroke();
	ctx.restore(); /* remove all dot and create new dot  using restore function*/
}

function main() {
    ctx.fillStyle = "rgba(0, 0, 0, .04)";
    ctx.arc(a, b, c, d, Math.PI * 2, true);
    ctx.fill();
	line.draw();
    ctx.lineWidth = 2;
  	/* number of circles  10 */
    for (var i = 1; i < nos; i++){
	    ctx.strokeStyle = "rgba(30,80,30, 0.5)";
	    ctx.lineWidth = 1;
	    ctx.beginPath();
	    ctx.arc(a, b, (a/nos) * i , 0, Math.PI * 2, true);
	    ctx.closePath();
	    ctx.stroke();
    }
} 
setInterval( main, 1000 / 80);  // control speed of niddle

setInterval(newBall, 1000/60);

function dot(color,x,y){
ctx.beginPath();
ctx.fillStyle = color;
ctx.arc(x, y, 2, 0, Math.PI * 2, true);
ctx.fill();
ctx.closePath();
};

function newBall(){
	nos = document.getElementById("rangeScal").value;	
    var r1 = a/nos;
	
	dot('red',a-r1,a-r1);	
	dot('red',250-r1,250-r1);
}


