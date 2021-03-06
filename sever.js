const express = require("express")();
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = require("express")();
app.use(index);

const server = http.createServer(app);


const io = socketIo(server, {
  cors: {
    origin: "*",
    credentials: true,
    // origin: "http://localhost:3000",
    // methods: ["GET", "POST"]
  },
});

    function check_33(x,  y, board){
	let count3 = 0;
  
	if ((board[xyToIndex(x - 3 , y)] == -1 && board[xyToIndex(x -2 , y)] ==1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x + 1 , y)] == -1) ||
		(board[xyToIndex(x -2 , y)] == -1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x +2 , y)] == -1) ||
		(board[xyToIndex(x - 1 , y)] == -1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x +2 , y)] ==1 && board[xyToIndex(x + 3 , y)] == -1) ||
		(board[xyToIndex(x - 4 , y)] == -1 && board[xyToIndex(x - 3 , y)] ==1 && board[xyToIndex(x -2 , y)] ==1 && board[xyToIndex(x - 1 , y)] == -1 && board[xyToIndex(x + 1 , y)] == -1) ||
		(board[xyToIndex(x + 4 , y)] == -1 && board[xyToIndex(x + 3 , y)] ==1 && board[xyToIndex(x +2 , y)] ==1 && board[xyToIndex(x + 1 , y)] == -1 && board[xyToIndex(x - 1 , y)] == -1) ||
		(board[xyToIndex(x -2 , y)] == -1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x + 1 , y)] == -1 && board[xyToIndex(x +2 , y)] ==1 && board[xyToIndex(x + 3 , y)] == -1) ||
		(board[xyToIndex(x +2 , y)] == -1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x - 1 , y)] == -1 && board[xyToIndex(x -2 , y)] ==1 && board[xyToIndex(x - 3 , y)] == -1))

	if ((board[xyToIndex(x , y - 3)] == -1 && board[xyToIndex(x , y -2)] ==1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y + 1)] == -1) ||
		(board[xyToIndex(x , y -2)] == -1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y +2)] == -1) ||
		(board[xyToIndex(x , y - 1)] == -1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y +2)] ==1 && board[xyToIndex(x , y + 3)] == -1) ||
		(board[xyToIndex(x , y - 4)] == -1 && board[xyToIndex(x , y - 3)] ==1 && board[xyToIndex(x , y -2)] ==1 && board[xyToIndex(x , y - 1)] == -1 && board[xyToIndex(x , y + 1)] == -1) ||
		(board[xyToIndex(x , y + 4)] == -1 && board[xyToIndex(x , y + 3)] ==1 && board[xyToIndex(x , y +2)] ==1 && board[xyToIndex(x , y + 1)] == -1 && board[xyToIndex(x , y - 1)] == -1) ||
		(board[xyToIndex(x , y -2)] == -1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y + 1)] == -1 && board[xyToIndex(x , y +2)] ==1 && board[xyToIndex(x , y + 3)] == -1) ||
		(board[xyToIndex(x , y +2)] == -1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y - 1)] == -1 && board[xyToIndex(x , y -2)] ==1 && board[xyToIndex(x , y - 3)] == -1))
		count3++;

	if ((board[xyToIndex(x - 3 , y - 3)] == -1 && board[xyToIndex(x -2 , y -2)] ==1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x + 1 , y + 1)] == -1) ||
		(board[xyToIndex(x -2 , y -2)] == -1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x +2 , y +2)] == -1) ||
		(board[xyToIndex(x - 1 , y - 1)] == -1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x +2 , y +2)] ==1 && board[xyToIndex(x + 3 , y + 3)] == -1) ||
		(board[xyToIndex(x - 3 , y - 3)] == -1 && board[xyToIndex(x -2 , y -2)] ==1 && board[xyToIndex(x - 1 , y - 1)] == -1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x +2 , y +2)] == -1) ||
		(board[xyToIndex(x + 3 , y + 3)] == -1 && board[xyToIndex(x +2 , y +2)] ==1 && board[xyToIndex(x + 1 , y + 1)] == -1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x -2 , y -2)] == -1) ||
		(board[xyToIndex(x - 4 , y - 4)] == -1 && board[xyToIndex(x - 3 , y - 3)] ==1 && board[xyToIndex(x -2 , y -2)] ==1 && board[xyToIndex(x - 1 , y - 1)] == -1 && board[xyToIndex(x + 1 , y + 1)] == -1) ||
		(board[xyToIndex(x + 4 , y + 4)] == -1 && board[xyToIndex(x + 3 , y + 3)] ==1 && board[xyToIndex(x +2 , y +2)] ==1 && board[xyToIndex(x + 1 , y + 1)] == -1 && board[xyToIndex(x - 1 , y - 1)] == -1))
		count3++;

	if ((board[xyToIndex(x + 3 , y - 3)] == -1 && board[xyToIndex(x +2 , y -2)] ==1 && board[xyToIndex(x + 1 , y - 1)] ==1 && board[xyToIndex(x - 1 , y + 1)] == -1) ||
		(board[xyToIndex(x +2 , y -2)] == -1 && board[xyToIndex(x + 1 , y - 1)] ==1 && board[xyToIndex(x - 1 , y + 1)] ==1 && board[xyToIndex(x -2 , y +2)] == -1) ||
		(board[xyToIndex(x + 1 , y - 1)] == -1 && board[xyToIndex(x - 1 , y + 1)] ==1 && board[xyToIndex(x -2 , y +2)] ==1 && board[xyToIndex(x - 3 , y + 3)] == -1) ||
		(board[xyToIndex(x + 3 , y - 3)] == -1 && board[xyToIndex(x +2 , y -2)] ==1 && board[xyToIndex(x + 1 , y - 1)] == -1 && board[xyToIndex(x - 1 , y + 1)] ==1 && board[xyToIndex(x -2 , y +2)] == -1) ||
		(board[xyToIndex(x - 3 , y + 3)] == -1 && board[xyToIndex(x -2 , y +2)] ==1 && board[xyToIndex(x - 1 , y + 1)] == -1 && board[xyToIndex(x + 1 , y - 1)] ==1 && board[xyToIndex(x +2 , y -2)] == -1) ||
		(board[xyToIndex(x + 4 , y - 4)] == -1 && board[xyToIndex(x + 3 , y - 3)] ==1 && board[xyToIndex(x +2 , y -2)] ==1 && board[xyToIndex(x + 1 , y - 1)] == -1 && board[xyToIndex(x - 1 , y + 1)] == -1) ||
		(board[xyToIndex(x - 4 , y + 4)] == -1 && board[xyToIndex(x - 3 , y + 3)] ==1 && board[xyToIndex(x -2 , y +2)] ==1 && board[xyToIndex(x - 1 , y + 1)] == -1 && board[xyToIndex(x + 1 , y - 1)] == -1))
		count3++;
	if (count3 > 1) return 1;
	else return 0;
}
 
function check_44( x,  y,board)
{
	let count4 = 0;

	if ((board[xyToIndex(x - 4 , y)] == -1 && board[xyToIndex(x - 3 , y)] ==1 && board[xyToIndex(x -2 , y)] ==1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x + 1, y)] == -1) ||
		(board[xyToIndex(x + 4 , y)] == -1 && board[xyToIndex(x + 3 , y)] ==1 && board[xyToIndex(x +2 , y)] ==1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x - 1 , y)] == -1) ||
		(board[xyToIndex(x - 5 , y)] == -1 && board[xyToIndex(x - 4 , y)] ==1 && board[xyToIndex(x - 3 , y)] == -1 && board[xyToIndex(x -2 , y)] ==1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x + 1 , y)] == -1) ||
		(board[xyToIndex(x + 5 , y)] == -1 && board[xyToIndex(x + 4 , y)] ==1 && board[xyToIndex(x + 3 , y)] == -1 && board[xyToIndex(x +2 , y)] ==1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x - 1 , y)] == -1) ||
		(board[xyToIndex(x - 5 , y)] == -1 && board[xyToIndex(x - 4 , y)] ==1 && board[xyToIndex(x - 3 , y)] ==1 && board[xyToIndex(x -2 , y)] == -1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x + 1 , y)] == -1) ||
		(board[xyToIndex(x + 5 , y)] == -1 && board[xyToIndex(x + 4 , y)] ==1 && board[xyToIndex(x + 3 , y)] ==1 && board[xyToIndex(x +2 , y)] == -1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x - 1 , y)] == -1) ||
		(board[xyToIndex(x - 5 , y)] == -1 && board[xyToIndex(x - 4 , y)] ==1 && board[xyToIndex(x - 3 , y)] ==1 && board[xyToIndex(x -2 , y)] ==1 && board[xyToIndex(x - 1 , y)] == -1 && board[xyToIndex(x + 1 , y)] == -1) ||
		(board[xyToIndex(x + 5 , y)] == -1 && board[xyToIndex(x + 4 , y)] ==1 && board[xyToIndex(x + 3 , y)] ==1 && board[xyToIndex(x +2 , y)] ==1 && board[xyToIndex(x + 1 , y)] == -1 && board[xyToIndex(x - 1 , y)] == -1) ||
		(board[xyToIndex(x - 3 , y)] == -1 && board[xyToIndex(x -2 , y)] ==1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x +2 , y)] == -1) ||
		(board[xyToIndex(x + 3 , y)] == -1 && board[xyToIndex(x +2 , y)] ==1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x -2 , y)] == -1) ||
		(board[xyToIndex(x - 4 , y)] == -1 && board[xyToIndex(x - 3 , y)] ==1 && board[xyToIndex(x -2 , y)] ==1 && board[xyToIndex(x - 1 , y)] == -1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x +2 , y)] == -1) ||
		(board[xyToIndex(x + 4 , y)] == -1 && board[xyToIndex(x + 3 , y)] ==1 && board[xyToIndex(x +2 , y)] ==1 && board[xyToIndex(x + 1 , y)] == -1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x -2 , y)] == -1) ||
		(board[xyToIndex(x - 4 , y)] == -1 && board[xyToIndex(x - 3 , y)] ==1 && board[xyToIndex(x -2 , y)] == -1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x +2 , y)] == -1) ||
		(board[xyToIndex(x + 4 , y)] == -1 && board[xyToIndex(x + 3 , y)] ==1 && board[xyToIndex(x +2 , y)] == -1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x -2 , y)] == -1))
		count4++;
 
	if ((board[xyToIndex(x , y - 4)] == -1 && board[xyToIndex(x , y - 3)] ==1 && board[xyToIndex(x , y -2)] ==1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y + 1)] == -1) ||
		(board[xyToIndex(x , y + 4)] == -1 && board[xyToIndex(x , y + 3)] ==1 && board[xyToIndex(x , y +2)] ==1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y - 1)] == -1) ||
		(board[xyToIndex(x , y - 5)] == -1 && board[xyToIndex(x , y - 4)] ==1 && board[xyToIndex(x , y -2)] == -1 && board[xyToIndex(x , y -2)] ==1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y + 1)] == -1) ||
		(board[xyToIndex(x , y + 5)] == -1 && board[xyToIndex(x , y + 4)] ==1 && board[xyToIndex(x , y + 3)] == -1 && board[xyToIndex(x , y +2)] ==1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y - 1)] == -1) ||
		(board[xyToIndex(x , y - 5)] == -1 && board[xyToIndex(x , y - 4)] ==1 && board[xyToIndex(x , y - 3)] ==1 && board[xyToIndex(x , y -2)] == -1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y + 1)] == -1) ||
		(board[xyToIndex(x , y + 5)] == -1 && board[xyToIndex(x , y + 4)] ==1 && board[xyToIndex(x , y + 3)] ==1 && board[xyToIndex(x , y +2)] == -1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y - 1)] == -1) ||
		(board[xyToIndex(x , y - 5)] == -1 && board[xyToIndex(x , y - 4)] ==1 && board[xyToIndex(x , y - 3)] ==1 && board[xyToIndex(x , y -2)] ==1 && board[xyToIndex(x , y - 1)] == -1 && board[xyToIndex(x , y + 1)] == -1) ||
		(board[xyToIndex(x , y + 5)] == -1 && board[xyToIndex(x , y + 4)] ==1 && board[xyToIndex(x , y + 3)] ==1 && board[xyToIndex(x , y +2)] ==1 && board[xyToIndex(x , y + 1)] == -1 && board[xyToIndex(x , y - 1)] == -1) ||
		(board[xyToIndex(x , y - 3)] == -1 && board[xyToIndex(x , y -2)] ==1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y +2)] == -1) ||
		(board[xyToIndex(x , y + 3)] == -1 && board[xyToIndex(x , y +2)] ==1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y -2)] == -1) ||
		(board[xyToIndex(x , y - 4)] == -1 && board[xyToIndex(x , y - 3)] ==1 && board[xyToIndex(x , y -2)] ==1 && board[xyToIndex(x , y - 1)] == -1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y +2)] == -1) ||
		(board[xyToIndex(x , y + 4)] == -1 && board[xyToIndex(x , y + 3)] ==1 && board[xyToIndex(x , y +2)] ==1 && board[xyToIndex(x , y + 1)] == -1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y -2)] == -1) ||
		(board[xyToIndex(x , y - 4)] == -1 && board[xyToIndex(x , y - 3)] ==1 && board[xyToIndex(x , y -2)] == -1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y +2)] == -1) ||
		(board[xyToIndex(x , y + 4)] == -1 && board[xyToIndex(x , y + 3)] ==1 && board[xyToIndex(x , y +2)] == -1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y -2)] == -1))
		count4++;

	if ((board[xyToIndex(x - 4 , y - 4)] == -1 && board[xyToIndex(x - 3 , y - 3)] ==1 && board[xyToIndex(x -2 , y -2)] ==1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x + 1 , y + 1)] == -1) ||
		(board[xyToIndex(x + 4 , y + 4)] == -1 && board[xyToIndex(x + 3 , y + 3)] ==1 && board[xyToIndex(x +2 , y +2)] ==1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x - 1 , y - 1)] == -1) ||
		(board[xyToIndex(x - 5 , y - 5)] == -1 && board[xyToIndex(x - 4 , y - 4)] ==1 && board[xyToIndex(x - 3 , y - 3)] == -1 && board[xyToIndex(x -2 , y -2)] ==1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x + 1 , y + 1)] == -1) ||
		(board[xyToIndex(x + 5 , y + 5)] == -1 && board[xyToIndex(x + 4 , y - 4)] ==1 && board[xyToIndex(x + 3 , y + 3)] == -1 && board[xyToIndex(x +2 , y +2)] ==1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x - 1 , y - 1)] == -1) ||
		(board[xyToIndex(x - 5 , y - 5)] == -1 && board[xyToIndex(x - 4 , y - 4)] ==1 && board[xyToIndex(x - 3 , y - 3)] ==1 && board[xyToIndex(x -2 , y -2)] == -1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x + 1 , y + 1)] == -1) ||
		(board[xyToIndex(x + 5 , y + 5)] == -1 && board[xyToIndex(x + 4 , y + 4)] ==1 && board[xyToIndex(x + 3 , y + 3)] ==1 && board[xyToIndex(x +2 , y +2)] == -1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x - 1 , y - 1)] == -1) ||
		(board[xyToIndex(x - 5 , y - 5)] == -1 && board[xyToIndex(x - 4 , y - 4)] ==1 && board[xyToIndex(x - 3 , y - 3)] ==1 && board[xyToIndex(x -2 , y -2)] ==1 && board[xyToIndex(x - 1 , y - 1)] == -1 && board[xyToIndex(x + 1 , y + 1)] == -1) ||
		(board[xyToIndex(x + 5 , y + 5)] == -1 && board[xyToIndex(x + 4 , y + 4)] ==1 && board[xyToIndex(x + 3 , y + 3)] ==1 && board[xyToIndex(x +2 , y +2)] ==1 && board[xyToIndex(x + 1 , y + 1)] == -1 && board[xyToIndex(x - 1 , y - 1)] == -1) ||
		(board[xyToIndex(x - 3 , y - 3)] == -1 && board[xyToIndex(x -2 , y -2)] ==1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x +2 , y +2)] == -1) ||
		(board[xyToIndex(x + 3 , y + 3)] == -1 && board[xyToIndex(x +2 , y +2)] ==1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x -2 , y -2)] == -1) ||
		(board[xyToIndex(x - 4 , y - 4)] == -1 && board[xyToIndex(x - 3 , y - 3)] ==1 && board[xyToIndex(x -2 , y -2)] ==1 && board[xyToIndex(x - 1 , y - 1)] == -1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x +2 , y +2)] == -1) ||
		(board[xyToIndex(x + 4 , y + 4)] == -1 && board[xyToIndex(x + 3 , y + 3)] ==1 && board[xyToIndex(x +2 , y +2)] ==1 && board[xyToIndex(x + 1 , y + 1)] == -1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x -2 , y -2)] == -1) ||
		(board[xyToIndex(x - 4 , y - 4)] == -1 && board[xyToIndex(x - 3 , y - 3)] ==1 && board[xyToIndex(x -2 , y -2)] == -1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x +2 , y +2)] == -1) ||
		(board[xyToIndex(x + 4 , y + 4)] == -1 && board[xyToIndex(x + 3 , y + 3)] ==1 && board[xyToIndex(x +2 , y +2)] == -1 && board[xyToIndex(x - 1 , y + 1)] ==1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x -2 , y -2)] == -1))
		count4++;
	
	if ((board[xyToIndex(x + 4 , y - 4)] == -1 && board[xyToIndex(x + 3 , y - 3)] ==1 && board[xyToIndex(x +2 , y -2)] ==1 && board[xyToIndex(x + 1 , y - 1)] ==1 && board[xyToIndex(x - 1 , y + 1)] == -1) ||
		(board[xyToIndex(x - 4 , y + 4)] == -1 && board[xyToIndex(x - 3 , y + 3)] ==1 && board[xyToIndex(x -2 , y +2)] ==1 && board[xyToIndex(x - 1 , y + 1)] ==1 && board[xyToIndex(x + 1 , y - 1)] == -1) ||
		(board[xyToIndex(x + 5 , y - 5)] == -1 && board[xyToIndex(x + 4 , y - 4)] ==1 && board[xyToIndex(x + 3 , y - 3)] == -1 && board[xyToIndex(x +2 , y -2)] ==1 && board[xyToIndex(x + 1 , y - 1)] ==1 && board[xyToIndex(x - 1 , y + 1)] == -1) ||
		(board[xyToIndex(x - 5 , y + 5)] == -1 && board[xyToIndex(x - 4 , y + 4)] ==1 && board[xyToIndex(x - 3,  y + 3)] == -1 && board[xyToIndex(x -2 , y +2)] ==1 && board[xyToIndex(x - 1 , y + 1)] ==1 && board[xyToIndex(x + 1 , y - 1)] == -1) ||
		(board[xyToIndex(x + 5 , y - 5)] == -1 && board[xyToIndex(x + 4 , y - 4)] ==1 && board[xyToIndex(x + 3 , y - 3)] ==1 && board[xyToIndex(x +2 , y -2)] == -1 && board[xyToIndex(x + 1 , y - 1)] ==1 && board[xyToIndex(x - 1 , y + 1)] == -1) ||
		(board[xyToIndex(x - 5 , y + 5)] == -1 && board[xyToIndex(x - 4 , y + 4)] ==1 && board[xyToIndex(x - 3 , y + 3)] ==1 && board[xyToIndex(x -2 , y +2)] == -1 && board[xyToIndex(x - 1 , y + 1)] ==1 && board[xyToIndex(x + 1 , y - 1)] == -1) ||
		(board[xyToIndex(x - 5 , y - 5)] == -1 && board[xyToIndex(x + 4 , y - 4)] ==1 && board[xyToIndex(x + 3 , y - 3)] ==1 && board[xyToIndex(x +2 , y -2)] ==1 && board[xyToIndex(x + 1 , y - 1)] == -1 && board[xyToIndex(x - 1 , y + 1)] == -1) ||
		(board[xyToIndex(x + 5 , y + 5)] == -1 && board[xyToIndex(x - 4 , y + 4)] ==1 && board[xyToIndex(x - 3 , y + 3)] ==1 && board[xyToIndex(x -2 , y +2)] ==1 && board[xyToIndex(x - 1 , y + 1)] == -1 && board[xyToIndex(x + 1 , y - 1)] == -1) ||
		(board[xyToIndex(x + 3 , y - 3)] == -1 && board[xyToIndex(x +2 , y -2)] ==1 && board[xyToIndex(x + 1 , y - 1)] ==1 && board[xyToIndex(x - 1 , y + 1)] ==1 && board[xyToIndex(x -2 , y +2)] == -1) ||
		(board[xyToIndex(x - 3 , y + 3)] == -1 && board[xyToIndex(x -2 , y +2)] ==1 && board[xyToIndex(x - 1 , y + 1)] ==1 && board[xyToIndex(x + 1 , y - 1)] ==1 && board[xyToIndex(x +2 , y -2)] == -1) ||
		(board[xyToIndex(x + 4 , y - 4)] == -1 && board[xyToIndex(x + 3 , y - 3)] ==1 && board[xyToIndex(x +2 , y -2)] ==1 && board[xyToIndex(x + 1 , y - 1)] == -1 && board[xyToIndex(x - 1 , y + 1)] ==1 && board[xyToIndex(x -2 , y +2)] == -1) ||
		(board[xyToIndex(x - 4 , y + 4)] == -1 && board[xyToIndex(x - 3 , y + 3)] ==1 && board[xyToIndex(x -2 , y +2)] ==1 && board[xyToIndex(x - 1 , y + 1)] == -1 && board[xyToIndex(x + 1 , y - 1)] ==1 && board[xyToIndex(x +2 , y -2)] == -1) ||
		(board[xyToIndex(x + 4 , y - 4)] == -1 && board[xyToIndex(x + 3 , y - 3)] ==1 && board[xyToIndex(x +2 , y -2)] == -1 && board[xyToIndex(x + 1 , y - 1)] ==1 && board[xyToIndex(x - 1 , y + 1)] ==1 && board[xyToIndex(x -2 , y +2)] == -1) ||
		(board[xyToIndex(x - 4 , y + 4)] == -1 && board[xyToIndex(x - 3 , y + 3)] ==1 && board[xyToIndex(x -2 , y +2)] == -1 && board[xyToIndex(x - 1 , y + 1)] ==1 && board[xyToIndex(x + 1 , y - 1)] ==1 && board[xyToIndex(x +2 , y -2)] == -1))
		count4++;
	if (count4 > 1) return 1;
	else return 0;
}
//????????? socket
const gameRoom = io.of('/game');
let thisgameNum 

// x,y ????????? ????????? index????????? ??????
let xyToIndex = (x, y) => {
  return x + y * 19;
};

let bboard;
let count;
let pointer;

//????????? ???
// function gameRoomCount(gameNum){
//   return gameRoom.adapter.rooms.get(gameNum)?.size
// }

//game??? ??????  
gameRoom.on("connect", async (socket) =>{
  bboard = new Array(Math.pow(19, 2)).fill(-1);
  count = 0;
  pointer= false;
  console.log("??????game ?????? ???????????????");
    console.log("???????????????socket.id",socket.id);

  // socket.onAny((event) =??> {
  //   console.log(`????????? ?????????: ${event}`);

    // ?????? id??? ????????? ??????
    socket.on("nickname", (nickname) => {
      socket["nickname"] = nickname
      console.log("????????? ?????????????",nickname);
      console.log("?????????????????????",socket.nickname);
    });

    //?????? game??? Join 
    socket.on("joinGame", (gameNum) => {
      thisgameNum = gameNum;
      console.log(`?????????????????????:${gameNum}`);
      socket.join(gameNum);
      
    });

    //game??? ??????
    socket.on("chat", (chat) => {
      const data = {name:socket.nickname, chat};
      console.log("????????? ??????data:", chat);
      gameRoom.to(thisgameNum).emit("chat", data, chat.state);
      return () => socket.off("chat");
    });
    //game??? ???????????? 
    socket.on("teachingW", async (chat) => {
      const data = {name:socket.nickname, chat};
      console.log("????????????????????????:",data);
      console.log("????????? data:", data);
      

      //teachingCnt ????????????   
      // await Users.updateOne( {id: socket.nickname}, { $set: {teachingCnt}});
      gameRoom.to(thisgameNum).emit("teachingW", data);  
    });
    socket.on("teachingB", async (chat) => {
      const data = {name:socket.nickname, chat};
      console.log("????????????????????????:",data);
      console.log("????????? data:", data);
      

      //teachingCnt ????????????   
      // await Users.updateOne( {id: socket.nickname}, { $set: {teachingCnt}});
      gameRoom.to(thisgameNum).emit("teachingB", data);  
    });
    //game??? ???????????????
    socket.on("flyingWord", (chat) => {
      const data = {name:socket.nickname, chat};
      console.log("????????????????????? ???????????????:",socket.nickname);
      console.log("????????????????????? data??????:", data);
      gameRoom.to(thisgameNum).emit("flyingWord", data);  
    });

    //game??? ???????????? ????????????
    socket.on("Pointer", (chat) => {
      
      pointer =true;
      const data = {name:socket.nickname, pointer :pointer};
      console.log("Pointer??????:",socket.nickname);
      console.log("Pointer data??????:", data);
      gameRoom.to(thisgameNum).emit("Pointer", data,chat);  
    });
    
    //?????? ??????
    socket.on("omog", (data, state) => {

      if(count % 2 == 0) {
        if(check_33(data.x,data.y,bboard) || check_44(data.x,data.y,bboard)) {
          let bye=0
          console.log("????????????",check_33(data.x,data.y,bboard),check_44(data.x,data.y,bboard)) ;
          gameRoom.to(thisgameNum).emit("omog", data,bye,state);
          return;
        }
        console.log("???????????????",check_33(data.x,data.y,bboard),check_44(data.x,data.y,bboard)) ;
      } 



      if (bboard[xyToIndex(data.x, data.y)] != -1 &&
          bboard[xyToIndex(data.x, data.y)] != 3) {
        console.log("?????????",bboard);
      } else if (
        (state == "playerW" && count % 2 == 0) ||
        (state == "playerB" && count % 2 !== 0)
      ) {
        console.log("?????? ????????? ????????? ?????????");
      } else {
        count % 2 == 0
          ? (bboard[xyToIndex(data.x, data.y)] = 1)
          : (bboard[xyToIndex(data.x, data.y)] = 2);
        data.board = bboard;
        // data.order
        count++;
        data.count = count;
        console.log("????????????",count, state);
        gameRoom.to(thisgameNum).emit("omog", data);
      };
    });
    //Pointer ?????? ??????????????? ???????????? ??????
    socket.on("pointerOmog", (data) => {
      if(pointer){
      if (bboard[xyToIndex(data.x, data.y)] != -1) {
        console.log(" Pointer?????????");
      return;
      }  
      (bboard[xyToIndex(data.x, data.y)] = 3)
        data.board = bboard;
        // data.order
        pointer=false;
        console.log("Pointer ??????",pointer);
       
        gameRoom.to(thisgameNum).emit("pointerOmog", data,count,pointer);
      }
    });
  
    // game??? ??????
    socket.on("disconnecting", async () => {
      //game??? ?????? ?????????
      try {
      gameRoom.to(thisgameNum).emit("bye", socket.id);
      console.log("????????? ?????? ?????? disconnecting");
      console.log("????????? ?????? ?????? room ", socket.rooms)
      console.log("????????? ?????? ?????????????????? ?????? ??????", gameRoom.adapter.rooms)
      console.log('????????? ?????? ?????? id', socket.id)
    } catch(error){
      console.log(error)
    }
    });
  // });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
