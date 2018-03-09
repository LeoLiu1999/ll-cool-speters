var pic = document.getElementById("vimage");
var clearButton = document.getElementById("clear");
const initDotRad = 30;
const initDotColor = "red";
var dots = [];

const clear = function(){
    while (pic.firstChild){
	pic.removeChild(pic.firstChild);
    }
}

var makeDot = function(x, y){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", initDotRad);
    c.setAttribute("fill", "red");
    c.setAttribute("stroke", "black");

    return c;
}

class dot {
    constructor(x, y){
	this.xcor = x;
	this.ycor = y;
	this.radius = initDotRad;
	this.dotColor = initDotColor;
    }
    get x(){ //usage: dotObject.x will return xcor of that dotObject
	return this.xcor;
    }
    get y(){
	return this.ycor;
    }
    setX(newX){
	this.xcor = newX;
    }
    setY(newY){
	this.ycor = newY;
    }
    get color(){
	return this.dotColor;
    }
    setColor(newColor){
	this.dotColor = newColor;
    }
    drawDot(){
	var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	c.setAttribute("cx", this.xcor);
	c.setAttribute("cy", this.ycor);
	c.setAttribute("r", this.radius);
	c.setAttribute("fill", this.dotColor);
	c.setAttribute("stroke", "black");
	
	c.addEventListener("click", changeOrDie, true);
	c.addEventListener("click", stop);

	pic.appendChild(c);
    }
}

var newDot = function (e){
    var createdDot = new dot(e.offsetX, e.offsetY);
    createdDot.drawDot();
    dots.push(createdDot);
}

//Shaina, can you make this function actually change the dot object?
//Right now, it is still using non-object stuff to change color
//
var changeOrDie = function(e){ 
    if(this.getAttribute("fill") == "red"){
	this.setAttribute("fill", "blue");
    } else { //teleport
	var x = Math.random() * 500;
	var y = Math.random() * 500;
	drawDot(e, x, y);
	this.remove();
    }
}

var stop = function(ev){
    ev.stopPropagation();
}

clearButton.addEventListener("click", clear);
pic.addEventListener("click", newDot);
