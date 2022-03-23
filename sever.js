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
	// ����üũ. 
	if ((board[xyToIndex(x - 3 , y)] == -1 && board[xyToIndex(x -2 , y)] ==1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x + 1 , y)] == -1) ||
		(board[xyToIndex(x -2 , y)] == -1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x +2 , y)] == -1) ||
		(board[xyToIndex(x - 1 , y)] == -1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x +2 , y)] ==1 && board[xyToIndex(x + 3 , y)] == -1) ||
		(board[xyToIndex(x - 4 , y)] == -1 && board[xyToIndex(x - 3 , y)] ==1 && board[xyToIndex(x -2 , y)] ==1 && board[xyToIndex(x - 1 , y)] == -1 && board[xyToIndex(x + 1 , y)] == -1) ||
		(board[xyToIndex(x + 4 , y)] == -1 && board[xyToIndex(x + 3 , y)] ==1 && board[xyToIndex(x +2 , y)] ==1 && board[xyToIndex(x + 1 , y)] == -1 && board[xyToIndex(x - 1 , y)] == -1) ||
		(board[xyToIndex(x -2 , y)] == -1 && board[xyToIndex(x - 1 , y)] ==1 && board[xyToIndex(x + 1 , y)] == -1 && board[xyToIndex(x +2 , y)] ==1 && board[xyToIndex(x + 3 , y)] == -1) ||
		(board[xyToIndex(x +2 , y)] == -1 && board[xyToIndex(x + 1 , y)] ==1 && board[xyToIndex(x - 1 , y)] == -1 && board[xyToIndex(x -2 , y)] ==1 && board[xyToIndex(x - 3 , y)] == -1))
		count3++;
	// ����üũ. 
	if ((board[xyToIndex(x , y - 3)] == -1 && board[xyToIndex(x , y -2)] ==1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y + 1)] == -1) ||
		(board[xyToIndex(x , y -2)] == -1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y +2)] == -1) ||
		(board[xyToIndex(x , y - 1)] == -1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y +2)] ==1 && board[xyToIndex(x , y + 3)] == -1) ||
		(board[xyToIndex(x , y - 4)] == -1 && board[xyToIndex(x , y - 3)] ==1 && board[xyToIndex(x , y -2)] ==1 && board[xyToIndex(x , y - 1)] == -1 && board[xyToIndex(x , y + 1)] == -1) ||
		(board[xyToIndex(x , y + 4)] == -1 && board[xyToIndex(x , y + 3)] ==1 && board[xyToIndex(x , y +2)] ==1 && board[xyToIndex(x , y + 1)] == -1 && board[xyToIndex(x , y - 1)] == -1) ||
		(board[xyToIndex(x , y -2)] == -1 && board[xyToIndex(x , y - 1)] ==1 && board[xyToIndex(x , y + 1)] == -1 && board[xyToIndex(x , y +2)] ==1 && board[xyToIndex(x , y + 3)] == -1) ||
		(board[xyToIndex(x , y +2)] == -1 && board[xyToIndex(x , y + 1)] ==1 && board[xyToIndex(x , y - 1)] == -1 && board[xyToIndex(x , y -2)] ==1 && board[xyToIndex(x , y - 3)] == -1))
		count3++;
	// �밢��üũ. 
	if ((board[xyToIndex(x - 3 , y - 3)] == -1 && board[xyToIndex(x -2 , y -2)] ==1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x + 1 , y + 1)] == -1) ||
		(board[xyToIndex(x -2 , y -2)] == -1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x +2 , y +2)] == -1) ||
		(board[xyToIndex(x - 1 , y - 1)] == -1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x +2 , y +2)] ==1 && board[xyToIndex(x + 3 , y + 3)] == -1) ||
		(board[xyToIndex(x - 3 , y - 3)] == -1 && board[xyToIndex(x -2 , y -2)] ==1 && board[xyToIndex(x - 1 , y - 1)] == -1 && board[xyToIndex(x + 1 , y + 1)] ==1 && board[xyToIndex(x +2 , y +2)] == -1) ||
		(board[xyToIndex(x + 3 , y + 3)] == -1 && board[xyToIndex(x +2 , y +2)] ==1 && board[xyToIndex(x + 1 , y + 1)] == -1 && board[xyToIndex(x - 1 , y - 1)] ==1 && board[xyToIndex(x -2 , y -2)] == -1) ||
		(board[xyToIndex(x - 4 , y - 4)] == -1 && board[xyToIndex(x - 3 , y - 3)] ==1 && board[xyToIndex(x -2 , y -2)] ==1 && board[xyToIndex(x - 1 , y - 1)] == -1 && board[xyToIndex(x + 1 , y + 1)] == -1) ||
		(board[xyToIndex(x + 4 , y + 4)] == -1 && board[xyToIndex(x + 3 , y + 3)] ==1 && board[xyToIndex(x +2 , y +2)] ==1 && board[xyToIndex(x + 1 , y + 1)] == -1 && board[xyToIndex(x - 1 , y - 1)] == -1))
		count3++;
	// �ݴ� �밢��üũ. 
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
	// ����üũ. 
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
	// ����üũ. 
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
	// �밢��üũ. 
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
	// �ݴ� �밢��üũ. 
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
//게임방 socket
const gameRoom = io.of('/game');
let thisgameNum 

// x,y 좌표를 배열의 index값으로 변환
let xyToIndex = (x, y) => {
  return x + y * 19;
};

let bboard;
let count;
let pointer;

//접속자 수
// function gameRoomCount(gameNum){
//   return gameRoom.adapter.rooms.get(gameNum)?.size
// }

//game방 연결  
gameRoom.on("connect", async (socket) =>{
  bboard = new Array(Math.pow(19, 2)).fill(-1);
  count = 0;
  pointer= false;
  console.log("★★game 소켓 연결됨★★");
    console.log("겜방연결후socket.id",socket.id);

  // socket.onAny((event) =??> {
  //   console.log(`게임방 이벤트: ${event}`);

    // 유저 id를 닉네임 설정
    socket.on("nickname", (nickname) => {
      socket["nickname"] = nickname
      console.log("게임방 닉네임은?",nickname);
      console.log("소켓닉네임은???",socket.nickname);
    });

    //개별 game방 Join 
    socket.on("joinGame", (gameNum) => {
      thisgameNum = gameNum;
      console.log(`조인게임방번호:${gameNum}`);
      socket.join(gameNum);
      
    });

    //game방 채팅
    socket.on("chat", (chat) => {
      const data = {name:socket.nickname, chat};
      console.log("게임방 채팅data:", chat);
      gameRoom.to(thisgameNum).emit("chat", data);
      return () => socket.off("chat");
    });
    //game방 훈수채팅 
    socket.on("teachingW", async (chat) => {
      const data = {name:socket.nickname, chat};
      console.log("훈수쳇소켓닉네임:",data);
      console.log("훈수쳇 data:", data);
      

      //teachingCnt 업데이트   
      // await Users.updateOne( {id: socket.nickname}, { $set: {teachingCnt}});
      gameRoom.to(thisgameNum).emit("teachingW", data);  
    });
    socket.on("teachingB", async (chat) => {
      const data = {name:socket.nickname, chat};
      console.log("훈수쳇소켓닉네임:",data);
      console.log("훈수쳇 data:", data);
      

      //teachingCnt 업데이트   
      // await Users.updateOne( {id: socket.nickname}, { $set: {teachingCnt}});
      gameRoom.to(thisgameNum).emit("teachingB", data);  
    });
    //game방 플라잉채팅
    socket.on("flyingWord", (chat) => {
      const data = {name:socket.nickname, chat};
      console.log("플라잉채팅소켓 닉네임♬♪:",socket.nickname);
      console.log("플라잉채팅소켓 data♬♪:", data);
      gameRoom.to(thisgameNum).emit("flyingWord", data);  
    });

    //game방 채팅으로 받는부분
    socket.on("Pointer", (id) => {
      
      pointer =true;
      const data = {name:socket.nickname, pointer :pointer};
      console.log("Pointer♬♪:",socket.nickname);
      console.log("Pointer data♬♪:", data);
      gameRoom.to(thisgameNum).emit("Pointer", data);  
    });
    
    //오목 게임
    socket.on("omog", (data, state) => {

      if(count % 2 == 0) {
        if(check_33(data.x,data.y,bboard) || check_44(data.x,data.y,bboard)) return;
      
        console.log("삼삼하구만",check_33(data.x,data.y,bboard),check_44(data.x,data.y,bboard)) ;
        
      } 



      if (bboard[xyToIndex(data.x, data.y)] != -1 &&
          bboard[xyToIndex(data.x, data.y)] != 3) {
        console.log("돌아가",bboard);
      } else if (
        (state == "playerW" && count % 2 == 0) ||
        (state == "playerB" && count % 2 !== 0)
      ) {
        console.log("너의 순서가 아니다 돌아가");
      } else {
        count % 2 == 0
          ? (bboard[xyToIndex(data.x, data.y)] = 1)
          : (bboard[xyToIndex(data.x, data.y)] = 2);
        data.board = bboard;
        // data.order
        count++;
        data.count = count;
        console.log("오목게임",count, state);
        gameRoom.to(thisgameNum).emit("omog", data);
      };
    });
    //Pointer 훈수 실질적으로 오목두는 부분
    socket.on("pointerOmog", (data) => {
      if(pointer){
      if (bboard[xyToIndex(data.x, data.y)] != -1) {
        console.log(" Pointer돌아가");
      return;
      }  
      (bboard[xyToIndex(data.x, data.y)] = 3)
        data.board = bboard;
        // data.order
        pointer=false;
        console.log("Pointer 훈수",pointer);
       
        gameRoom.to(thisgameNum).emit("pointerOmog", data,count,pointer);
      }
    });
  
    // game방 퇴장
    socket.on("disconnecting", async () => {
      //game방 퇴장 메시지
      try {
      gameRoom.to(thisgameNum).emit("bye", socket.id);
      console.log("게임방 퇴장 소켓 disconnecting");
      console.log("게임방 퇴장 소켓 room ", socket.rooms)
      console.log("게임방 퇴장 네임스페이스 전체 소켓", gameRoom.adapter.rooms)
      console.log('게임방 퇴장 소켓 id', socket.id)
    } catch(error){
      console.log(error)
    }
    });
  // });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
