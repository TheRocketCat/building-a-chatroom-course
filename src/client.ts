import net from "net"


const client = net.createConnection({port:3000}, () =>{
	console.log("connected to chatroom")
})

client.on("data", (data:Buffer) => {
	const string=data.toString()

	console.log(string)

	client.end()
})

client.on("end", ()=>{
	console.log("disconnected from server")
})


