import "./App.css"
import Controllers from "./components/Controllers.tsx"
import { Room } from "./classes/room.ts"
import { Armor } from "./classes/takables/armor.ts"
import { Weapon } from "./classes/takables/weapon.ts"
import { Player } from "./classes/player.ts"
import armorsJson from "./data/armor.json"
import weaponsJson from "./data/weapon.json"
import roomsJson from "./data/room.json"
import trapsJson from "./data/trap.json"
import treasuresJson from "./data/treasure.json"
import riddlesJson from "./data/riddle.json"
import playersJson from "./data/player.json"
import monstersJson from "./data/monster.json"
import { Monster } from "./classes/monster.ts"
import { Riddle } from "./classes/riddle.ts"
import { Trap } from "./classes/trap.ts"
import { Treasure } from "./classes/takables/treasure.ts"
import { useState } from "react"

function App() {

	const [roomIndex, setRoomIndex] = useState(0)
	const incrementRoomIndex = () => setRoomIndex( el => ++el)

	// Instantiate Rooms
	const armorsData = [];
	armorsJson.armor.map(armor => armorsData.push(new Armor(armor.id, armor.name, armor.description, armor.protection, armor.weight)));


	// Instantiate Weapons
	const weaponsData = [];
	weaponsJson.weapon.map(weapon => weaponsData.push(new Weapon(weapon.id, weapon.name, weapon.description, weapon.damage, weapon.weight)));

	const rooms = [];
	roomsJson.room.map(room => rooms.push( new Room(room.id, room.name, room.description, room.objects)))

	const getInventory = (object) => {
		switch (object.type) {
			case "weapons":
				return weaponsData[object.id]
				break;
			case "armors":
				return armorsData[object.id]
				break;
			case "monster":
				return monsters[object.id]
				break
			case "trap":
				return traps[object.id]
				break
			case "riddle":
				return riddles[object.id]
				break
			case "treasure":
				return treasures[object.id]
				break
			default:
				return {}
				break;
		}
	}

	const players = [];
	playersJson.player.map(player => players.push( new Player(player.id, rooms[0], player.currentLP, player.weight, [...player.inventory.map(el => getInventory(el))])))
	
 	const monsters = [];
	 monstersJson.monster.map(monster => monsters.push( new Monster(monster.id,monster.name, monster.currentLP, monster.weight, monster.description, [...monster.inventory.map(el => getInventory(el))])))
	 

	const riddles = [];
	riddlesJson.riddle.map(riddle => riddles.push( new Riddle(riddle.id, riddle.question, riddle.answer, riddle.weight, riddle.reward)))

	const traps = [];
	trapsJson.trap.map(trap => traps.push( new Trap(trap.id, trap.description, trap.damage, trap.weight)))
	
	const treasures = [];
	treasuresJson.treasure.map(treasure => treasures.push( new Treasure(treasure.id, treasure.name, treasure.description, treasure.weight, treasure.inventory.map(el => getInventory(el)))))

	return (
		<div className="App">
			<header className="App-header">
				<Controllers room = { rooms[roomIndex] } roomInventory={ rooms[roomIndex].objects.map(el => getInventory(el))} player={players[0]} nextRoom={rooms[roomIndex + 1]} setRoomIndex={incrementRoomIndex}></Controllers>
			</header>
		</div>
	)
}

export default App
