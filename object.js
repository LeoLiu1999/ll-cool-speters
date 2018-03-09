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
	this.object = null;
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
    getcolor(){
	return this.dotColor;
    }
    setColor(newColor){
    this.object.setAttribute("fill", newColor);
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

	c.setAttribute("place", dots.length);

	pic.appendChild(c);
	this.object=c;
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
	var place = this.getAttribute("place")//So we can fetch the right object
    if(dots[place].getcolor() == "red"){
		dots[place].setColor("blue");
    } else { //teleport
	var x = Math.random() * 500;
	var y = Math.random() * 500;
	this.remove();
	var createdDot = new dot(x, y);
	createdDot.drawDot();
	dots.push(createdDot);
    }
}

var stop = function(ev){
    ev.stopPropagation();
}

clearButton.addEventListener("click", clear);
pic.addEventListener("click", newDot);
