import net from "net"
import {createInterface,Interface} from "readline"

const readline = createInterface({
	input:process.stdin,
	output:process.stdout
})

const client = net.createConnection({port:3000}, () =>{
	console.log("connected to chatroom")
})

client.on("data", (data:Buffer) => {
	const string=data.toString()
	console.log(string)
})

client.on("end", ()=>{
	console.log("disconnected from server")
})

async function getInput(){
	while(true){
		let messagePromise = new Promise((resolve,reject)=>{
			readline.question("message: ",(input:string)=>resolve(input))
			
		}).catch(err => {throw err})

		const message = await messagePromise as string

		if(message == "logout") break
		else client.write(message)
	}
}
getInput()
