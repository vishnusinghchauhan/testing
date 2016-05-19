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
	//nos = 5;
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



/****************************************************************** vishnu ***************************************************************/
// draw new balls 
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
	//var td = (r1/nos*1000)/r1;
	dot('yellow',a-r1,a-r1);	
	dot('yellow',a-r1,a+r1);
	dot('yellow',400-r1,270-r1);
}
//finish drawing balls

//track and release function
$(document).ready(function(){
	$('#track').click(function(){
		$('#radar').click(function(e){
			 x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	         y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	         x = x - 22;	
	         y = y - 17;	
	         $('.a-pulse').show();	 
			 $('.a-pulse').css('left',x);
			 $('.a-pulse').css('top',y);
		}); 
	});
	
	$('#releaseTrack').click(function(){
		$('.a-pulse').hide();
	})
})
//finish track and release function

//Stand By and TXn OP Mode function
$(document).ready(function(){
	$('#standBy').click(function(){
		 line['speed'] = Math.PI / 0.1;
	})
	$('#txn').click(function(){
		 line['speed'] = Math.PI / 360.;
	})
	$('#op_mode .toggle-on').click(function(){
		 line['length'] = a;
		 line['angle'] = 4.7;
	})
	$('#op_mode .toggle-off').click(function(){
		 line['length'] = 4.7;
		 setInterval( drawEBLine,0/0);
	})
	 $("#radar").click(function(event){  
	 		corX = event.pageX - $(this).offset().left;    
			corY = event.pageY - $(this).offset().top;
			$('.xcordinate').text(corX);
			$('.ycordinate').text(corY);
	 })
});
//finish Stand By and TXn OP Mode function

// draw EBL functions 
$(document).ready(function(){		
	$('#drawebl').click(function(){ 
		$("#radar").attr("class","drawebl");			
	});
		var total = 0;
		var clicks = 0;
		var lastClick = [0, 0];	
		$(document).on('click', '.drawebl', function(e){ 
		//alert();
		//$('.drawebl').click(function(e){
			 x = getCursorPosition(e)[0] - this.offsetLeft;
		    y = getCursorPosition(e)[1] - this.offsetTop;
		    
		    if (clicks != 1) {
		        clicks++;
		    } else {
		    	if(total < 10){
			        ctx.beginPath();
			        ctx.moveTo(lastClick[0], lastClick[1]);
			        ctx.lineTo(x, y);      
			        ctx.strokeStyle = 'yellow';
			        ctx.fill = 'yellow';
					//ctx.fill = function(){};
			        ctx.lineWidth = 2;
			        ctx.stroke();      
			        clicks = 0;
			        total++;
		   		}
		   		else{
		   			alert("You can not draw more then 10 lines..!");
		   		}
		    }	   
		    lastClick = [x, y];	
		
		})
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
		
	
	
	$('#drawEblOne').click(function(){  
		$("#radar").attr("class","drawEblOne");
	});
	$(document).on('click', '.drawEblOne', function(event){ 
	//alert();
		var center =  $('#radar').width() - ($('#radar').width()/2);        
		bel1X = event.pageX - $(this).offset().left;    
		bel1y = event.pageY - $(this).offset().top;

		ctx.beginPath();
		ctx.moveTo(center, center);
		ctx.lineTo(bel1X, bel1y);      
		ctx.strokeStyle = 'yellow';
		ctx.lineWidth = 2;
		ctx.fill = 'yellow';
		ctx.stroke();      
		clicks = 0;
	});
		
		
	$('#drawEblTwo').click(function(){
		ctx.beginPath();
		ctx.moveTo(230, 230);
		ctx.lineTo(230, 344);
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'yellow';
		ctx.fill = 'yellow';
		ctx.stroke();
	})
	
	$('#deleteBbl').click(function(){
		location.reload(true);
	})
	
});
// finish EBL function


// draw Draw VRM
$(document).ready(function(){

	$('#drawVrmOne').click(function(){       //using center point between center
		$("#radar").attr("class","drawVrmOne");
	});
	$(document).on('click', '.drawVrmOne', function(e){ 
	//$(".drawVrmOne").click(function(event){ 		
		vrmX = event.pageX - $(this).offset().left;    
		vrmy = event.pageY - $(this).offset().top;
		cwx =  $('#radar').width() - ($('#radar').width()/2);
		chy =  $('#radar').height() - ($('#radar').height()/2);

		var dis = Math.sqrt(Math.pow((vrmX - cwx),2)+(Math.pow(vrmy-chy),2));
		$('.distance').text(dis);

		ctx.beginPath();
		ctx.arc(cwx, chy, dis, 0, 2 * Math.PI, false);
		
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'yellow';
		ctx.lineWidth = 2;
		ctx.fill = 'yellow';
		ctx.stroke();
	});
		
	
	$('#drawVrmtwo').click(function(){       // rendom draw at user click
		$("#radar").attr("class","drawVrmtwo");
	});
	$(document).on('click', '.drawVrmtwo', function(e){ 
	//$("#radar").click(function(event){ 
		relX = event.pageX - $(this).offset().left;    
		relY = event.pageY - $(this).offset().top;
		var radius = 50;

		ctx.beginPath();
		ctx.arc(relX, relY, radius, 0, 2 * Math.PI, false);
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'yellow';
		ctx.lineWidth = 2;
		ctx.fill = 'yellow';
		ctx.stroke();
	});
		

	$('#vrmOff').click(function(){
		location.reload(true);
	})
});
// finish Draw VRM
/***************************************************************************************************************************************/
