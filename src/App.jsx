import logo from "./logo.svg"
import "./App.css"
import Controllers from "./components/Controllers.tsx"
import { Room } from "./classes/room.ts"

function App() {
	const room = new Room()

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Controllers room={room}></Controllers>
				<p>Site de staging React</p>
			</header>
		</div>
	)
}

export default App
