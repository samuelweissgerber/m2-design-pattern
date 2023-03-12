import logo from "./logo.svg"
import "./App.css"
import Controllers from "./components/Controllers.tsx"
import { Room } from "./classes/room.ts"

function App() {
	const room = new Room()

	return (
		<div className="App">
			<header className="App-header">
				<Controllers room = { rooms[roomIndex] } roomInventory={ rooms[roomIndex].objects.map(el => getInventory(el))} player={players[0]} nextRoom={rooms[roomIndex + 1]} setRoomIndex={incrementRoomIndex}></Controllers>
			</header>
		</div>
	)
}

export default App
