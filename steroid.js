var ctx;
function spaceship() {
	this.angle = 0;
	this.x = 320;
    this.y = 240;
	this.speed = 1;
	this.vx = 1;
	this.vy = 0;
	this.ax = 0;
	this.ay = 0;
	this.shipAx = 0;
	this.shipAy = 0;
	this.move = function() {
		this.x += this.vx;
		this.y += this.vy;
		this.vx += this.ax + this.shipAx;
		this.vy += this.ay + this.shipAy;
		var distance = Math.sqrt( this.x * this.x + ( ( this.y - 480 ) * ( this.y - 480 ) ) );
		var force = 10000 / ( distance * distance );
		this.ax = force * ( -this.x / distance );
		this.ay = force * ( ( 480 - this.y ) / distance );
		if ( this.x > 640 ) { this.x -= 640; }
		else if ( this.x < 0 ) { this.x += 640; }
		if ( this.y > 480 ) { this.y -= 480; }
		else if ( this.y < 0 ) { this.y += 480; }
	}
	this.thrust = function( onOff ) {
		if ( onOff ) {
			this.shipAx = Math.cos( this.angle ) * 2;
			this.shipAy = Math.sin( this.angle ) * 2;
		}
		else { 
			this.shipAx = 0;
			this.shipAy = 0;
		}
	}
};
  
function onKeyDown(evt) {
	switch( evt.keyCode ) {
		case 39: // right
			ship.angle += Math.PI / 17;
			break;
			
		case 37: // left
			ship.angle += -Math.PI / 17;
			break;
			
		case 38: // up
		case 32: // space
			ship.thrust( true );
			break;				
			
    }
	
}
  
function onKeyUp(evt) {
	if ( evt.keyCode === 32 || evt.keyCode === 38 ) { ship.thrust( false ); }
}
  
var ship = new spaceship();
window.addEventListener("keydown", onKeyDown, true);
window.addEventListener("keyup", onKeyUp, true);
function init() {

    var canvas = document.getElementById('steroids');  
    canvas.fill = "#000000";
    if (canvas.getContext){  
        ctx = canvas.getContext('2d');  
        setInterval( draw, 100 );
    }
}
  
function draw(){  
	
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,640,480 );
	
	// sun
	ctx.fillStyle = "#FFFF00";
	ctx.beginPath();
	ctx.arc(0,480,30,0,Math.PI / 2,true);
	ctx.closePath();
	ctx.fill();
	
	// triangle/ship
	ctx.save();
	ctx.translate( ship.x, ship.y );
	ctx.rotate( ship.angle );
	ctx.translate( -ship.x, -ship.y );
	ctx.strokeStyle = "#9CFF00";
	ctx.beginPath();  
	ctx.moveTo( ship.x-7, ship.y-5 );
	ctx.lineTo( ship.x-7, ship.y+5 );
	ctx.lineTo( ship.x+14, ship.y );

	ctx.closePath();  
	ctx.stroke();  
	ctx.restore();
	ship.move();
}  
	