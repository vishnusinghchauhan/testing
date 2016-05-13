var winHeight = $(window).height();
var winWidth = $(window).width();
var a = winHeight - (winHeight)/2.77;

var line = {
	x: a,
	y: a,
	length: a,
	angle: 0,
	speed: Math.PI / 360,
	end: {
		x: a,
		y: 0
	}
}

$(document).ready(function(){
	$('#radar').click(function(e){
	var a = $('#radar').height()/2;
	var b = $('#radar').width()/2;
	
	
		x = e.screenX ;
        y = e.screenY ;
		//alert(y);
	//	alert(x)

		ctx.beginPath();
        ctx.moveTo(a,b);
        ctx.lineTo(x, y);
		ctx.lineWidth = 3;       
        ctx.strokeStyle="red";
		ctx.fill="red";
		ctx.stroke(); 
        clicks = 0;
	}) 
})


/*  draw small circle on click 
$(document).ready(function(){
	$('#radar').click(function(e){
		 x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
         y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		 
		 $('.a-pulse').css('left',x);
		 $('.a-pulse').css('top',y);
	}) 
})

*/
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


	var i = Ball.all.length;
	while(i--){
		if (pointToLineDistance(line, line.end, Ball.all[i] ) < 1.
			&& lineDistance(line, Ball.all[i] ) < line.length
			&& lineDistance(line.end, Ball.all[i] ) < line.length){
			new Blip( Ball.all[i].x, Ball.all[i].y, 0.2 );

		}
	}
	ctx.restore();
}


function Ball(x,y,r){
  this.x = x;
  this.y = y;
  this.r = r;
  this.vx = 0;
  this.vy = 0;
  Ball.all.push(this);
}
Ball.all = [];
Ball.prototype = {
  draw: function(){
    ctx.save();
      ctx.translate(this.x,this.y);
      ctx.fillStyle = "#fb0";
      ctx.beginPath();
      ctx.arc(0,0, this.r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    ctx.restore();
  },
  remove: function(){
    Ball.all.splice(Ball.all.indexOf(this), 1);
  }
};
function Blip(x,y,t){
	this.x = x;
	this.y = y;
	this.t = t;
	Blip.all.push(this);
}
Blip.all = [];


function pointToLineDistance(A, B, P){
	var normalLength = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
	return Math.abs((P.x - A.x) * (B.y - A.y) - (P.y - A.y) * (B.x - A.x)) / normalLength;
}
function lineDistance(A, B ){ 
    return Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
}


var canvas = document.getElementById("radar");
var ctx = canvas.getContext('2d');
ctx.fillStyle = "rgba(255, 255, 255, 1)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

/*  draw lines random
var clicks = 0;
var lastClick = [0, 0];
document.getElementById('radar').addEventListener('click', drawLine, false);
function getCursorPosition(e) {
    var x;
    var y;

    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    
    return [x, y];
}

function drawLine(e) {
    ctx = this.getContext('2d');
    x = getCursorPosition(e)[0] - this.offsetLeft;
    y = getCursorPosition(e)[1] - this.offsetTop; 
    if (clicks != 1) {
        clicks++;
    } else {
        ctx.beginPath();
        ctx.moveTo(lastClick[0], lastClick[1]);
        ctx.lineTo(x, y);
		ctx.lineWidth = 3;       
        ctx.strokeStyle="red";
		ctx.fill="red";
		ctx.stroke(); 
        clicks = 0;
    }
    lastClick = [x, y];
};
*/


function main() {
  // Clear display
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, .04)";
    ctx.beginPath();
    ctx.arc(a, a, a, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();


  // Update balls. Add balls if under 200 exist
  if (Ball.all.length < 20){
  
    for(var i = 0; i < 5; i++){
	
      var ball = new Ball(Math.random()*400,Math.random()*400,2);
	  
      ball.vx = Math.random() / 100;
      ball.vy = Math.random() / 100;
	  
	  
    }
  }
  
 var i = Ball.all.length;
  while(i--){
	  // Update ball
	  Ball.all[i].x += Ball.all[i].vx;
	  Ball.all[i].y += Ball.all[i].vy;
	  if (Ball.all[i].x > canvas.width - Ball.all[i].r) {
	    Ball.all[i].x = canvas.width - Ball.all[i].r;
	    Ball.all[i].vx = -Math.abs(Ball.all[i].vx);
	  }
	  else if (Ball.all[i].x < Ball.all[i].r) {
	    Ball.all[i].x = Ball.all[i].r;
	    Ball.all[i].vx = Math.abs(Ball.all[i].vx);
	  }
	  if (Ball.all[i].y > canvas.height - Ball.all[i].r) {
	    Ball.all[i].y = canvas.height - Ball.all[i].r;
	    Ball.all[i].vy = -Math.abs(Ball.all[i].vy);
	  }
	  else if (Ball.all[i].y < Ball.all[i].r) {
	    Ball.all[i].y = Ball.all[i].r;
	    Ball.all[i].vy = Math.abs(Ball.all[i].vy);
	  }
  }

    var i = Blip.all.length;
    //console.log(i + " blips");
    var kill_cutoff = 0.0005;
    var blip_strength_drain = 0.997;
    while(i--){
    	ctx.save();
  	    if (Blip.all[i].t > kill_cutoff){
  	    	Blip.all[i].t *= blip_strength_drain;
  	    	var col = "rgba(25, 255, 25, " + Blip.all[i].t + ")"
		    ctx.fillStyle = col;
		    ctx.beginPath();
		    ctx.arc(Blip.all[i].x, Blip.all[i].y, 2, 0, Math.PI * 2, true);
		    ctx.closePath();
		    ctx.fill();
    	}
    	else if (Blip.all[i].t <= kill_cutoff){
    		Blip.all.splice(i,1);
    	}
    	ctx.restore();
    }


	line.draw();

    ctx.strokeStyle = "rgba(80,80,80, 1)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(a, a, a, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();

    for (var i = 1; i < 10; i++){
	    ctx.strokeStyle = "rgba(30,80,30, 0.5)";
	    ctx.lineWidth = 1;
	    ctx.beginPath();
	    ctx.arc(a, a, 40 * i, 0, Math.PI * 2, true);
	    ctx.closePath();
	    ctx.stroke();

    }
} 
setInterval( main, 1000 / 80);