/*
    # Mohamed Elshorbagy
    # 10 / 07 / 2017
    # Maze Generator
    # Wiki Page : 
    # Method used : Recursive Backtracker

 */


// Global Varaibles

var cols;
var rows;
var grid = [];
var w = 20;
var current;
var stack = [];


function setup() {
createCanvas(400 , 400);

cols = floor(width / w);
rows = floor(height / w);


for(var j = 0 ; j < rows;j++) {
    for(var i = 0 ; i < cols ;i++) {
        var cell = new Cell(i , j);
        grid.push(cell);


    }

}


current = grid[floor(random(0 , grid.length))];



}


function draw(){
background(51);


for(var i = 0 ; i < grid.length ; i++) {
    grid[i].show();


}

current.visited = true;
current.colored();

var nextSpot = current.checkNeighbours();

if(nextSpot) {
    // Step 1
    nextSpot.visited = true;
    
    // Step 2
    stack.push(current);
    // Step 3 
    removeWalls(current , nextSpot);
    
    
    // Step 4 
    current = nextSpot;

} else if(stack.length > 0) {

    current = stack.pop();

}


}




function indexInGrid(a , b) {

    if( a < 0 || b < 0 || a > cols - 1 || b > rows - 1) {
        return -1;
     } 

       return a + (b * cols);
}

// Cell Object 
function Cell(i , j) {

/*
    // top ---
  // left  | | // right
           ---  // bottom

 */ 


this.i = i; // Row
this.j = j; // Col
this.walls = [true , true , true , true]; // [top , right , bottom , left];
this.visited = false;

// Grid Illustration
this.show = function() {
    noFill();
    stroke(255);

    var x = this.i * w;
    var y = this.j * w;

    if(this.walls[0]) {
        line(x , y , x + w , y);
    }
    if(this.walls[1]) {
        line(x + w , y , x + w , y + w);
    }
    if(this.walls[2]) {
        line(x + w ,y + w , x ,y + w);
    }
    if(this.walls[3]) {
        line(x , y + w , x , y);
    }

    if(this.visited) {
        fill(255 , 0 , 255 , 100);
        noStroke();
        rect(x , y , w, w);

    }


}


// Color Current Cells

this.colored = function() {
    var x = this.i * w;
    var y = this.j * w;
    // rgb(231, 76, 60)
    noStroke();
    fill(231,76,60);
    rect(x , y , w ,w);1

    


}



// Check Neighbours
this.checkNeighbours = function() {

var neighbours = [];

var top = grid[indexInGrid(i , j - 1)];
var right = grid[indexInGrid(i + 1 ,j)];
var bottom = grid[indexInGrid(i,j + 1)];
var left = grid[indexInGrid(i - 1 , j)];


if( top && !top.visited) {
neighbours.push(top);

}

if(right && !right.visited) {
neighbours.push(right);
    
}

if(bottom &&!bottom.visited) {
neighbours.push(bottom);
    
}

if(left &&!left.visited) {
neighbours.push(left);
    
}

if(neighbours.length > 0) {
    var randomSpot = floor(random(0 , neighbours.length));
    return neighbours[randomSpot];
} else {
    return undefined;

}









}



}



function removeWalls(cellA , cellB) {


var x = cellA.i - cellB.i;
var y = cellA.j - cellB.j;


// Remove left && right

if(x == 1) {

    cellA.walls[3] = false;
    cellB.walls[1] = false;

}

// Remove right && left
if(x == -1) {
    cellA.walls[1] = false;
    cellB.walls[3] = false;

}



// Remove top && bottom 
if(y == 1) {
    cellA.walls[0] = false;
    cellB.walls[2] = false;

}


// Remove bottom && top 


if( y == -1) {
    cellA.walls[2] = false;
    cellB.walls[0] = false;

}







}

