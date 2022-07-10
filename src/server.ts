import {createInterface,Interface} from "readline"
import {createServer,Socket} from "net"

const readline = createInterface({
	input:process.stdin,
	output:process.stdout
})

const server = createServer(async (s:Socket)=>{
	console.log("client connected")



	s.on("end",()=>{
		console.log("client disconnected")
	})

	s.on("data",(data:Buffer)=>{
		const string=data.toString()
		console.log(string)
	})


	while(true){
		let messagePromise = new Promise((resolve,reject)=>{
			readline.question("message: ",(input:string)=>resolve(input))
			
		}).catch(err => {throw err})

		const message = await messagePromise as string

		if(message == "logout") break
		else s.write(message)
	}
})

server.on("error", err => {throw err})

server.listen(3000,()=>{
	console.log("server running")
})

