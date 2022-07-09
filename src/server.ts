import {createServer} from "net"


const server = createServer((s)=>{
	console.log("client connected")

	s.on("end",()=>{
		console.log("client disconnected")
	})

	s.write("HTTP/1.1 200 OK\n\n<h1>hej</h1>")
	s.write("<h2>hej</h2>")
	s.end()


})

server.on("error", err => {throw err})

server.listen(3000,()=>{
	console.log("server running")
})
