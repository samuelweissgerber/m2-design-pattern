import logo from "./logo.svg"
import "./App.css"
import Controllers from "./components/Controllers.tsx"
import { Room } from "./classes/room.ts"
import { Armor } from "./classes/armor.ts"
import { Weapon } from "./classes/weapon.ts"
import armorsJson from "./data/armor.json"

function App() {
	const room = new Room()

	// Instantiate Rooms
	let armorsData = [];
	armorsJson.armor.forEach(armor => {
		armorsData[armor.id] = new Armor(armor.id, armor.name, armor.description, armor.protection, armor.weight);
	});
	armorsData.join();

	// Instantiate Weapons
	let weaponsData = [];
	armorsJson.armor.forEach(armor => {
		weaponsData[armor.id] = new Armor(armor.id, armor.name, armor.description, armor.protection, armor.weight);
	});
	armorsData.join();

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
