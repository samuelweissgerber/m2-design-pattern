import { Weapon } from "../classes/takables/weapon.ts"
import { Player } from "../classes/player.ts"
import { Monster } from "../classes/monster.ts"
import { Riddle } from "../classes/riddle.ts"
import { Trap } from "../classes/trap.ts"
import { Treasure } from "../classes/takables/treasure.ts"
import { Room } from "../classes/room.ts"
import { Armor } from "../classes/takables/armor.ts"

import armorsJson from "../data/armor.json"
import weaponsJson from "../data/weapon.json"
import roomsJson from "../data/room.json"
import trapsJson from "../data/trap.json"
import treasuresJson from "../data/treasure.json"
import riddlesJson from "../data/riddle.json"
import playersJson from "../data/player.json"
import monstersJson from "../data/monster.json"

  const armorsData = []
	const riddles = []
	const weaponsData = []
	const rooms = []
	const players = []
 	const monsters = []
	const traps = []
	const treasures = []

	export const getInventory = (object) => {
		switch (object.type) {
			case "weapons": return weaponsData[object.id]
			case "armors": return armorsData[object.id]	
			case "monster": return monsters[object.id]	
			case "trap": return traps[object.id]	
			case "riddle": return riddles[object.id]
			case "treasure": return treasures[object.id]
			case "player": return players[object.id]
 			default: return {}			
		}
	}
  
  // Instantiate Rooms
	
	armorsJson.armor.map(armor => armorsData.push(new Armor(armor.id, armor.name, armor.description, armor.protection, armor.weight)))

	// Instantiate Weapons
	weaponsJson.weapon.map(weapon => weaponsData.push(new Weapon(weapon.id, weapon.name, weapon.description, weapon.damage, weapon.weight)))

	riddlesJson.riddle.map(riddle => riddles.push( new Riddle(riddle.id, riddle.question, riddle.answer, riddle.weight, riddle.reward, riddle.isFirstAnswer)))

	trapsJson.trap.map(trap => traps.push( new Trap(trap.id, trap.description, trap.damage, trap.weight)))
	
	treasuresJson.treasure.map(treasure => treasures.push(new Treasure(treasure.id, treasure.name, treasure.description, treasure.weight, treasure.inventory.map(el => getInventory(el)))))
	
	monstersJson.monster.map(monster => monsters.push(new Monster(monster.id, monster.name, monster.currentLP, monster.weight, monster.description, [...monster.inventory.map(el => getInventory(el))])))
	
	roomsJson.room.map(room => rooms.push(new Room(room.id, room.name, room.description, [...room.objects.map(el => getInventory(el))])))

playersJson.player.map(player => players.push(new Player(player.id, player.type, player.name, rooms[0], player.currentLP, player.weight, [...player.inventory.map(el => getInventory(el))])))
  

export {
  armorsData,
  riddles ,
  weaponsData ,
  rooms ,
  players ,
  monsters ,
  traps ,
  treasures
}