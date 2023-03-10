import { IInteractiveObject } from "../interfaces"
import { Room } from "./room"
import { Weapon } from "./takables/weapon"

// Class to represent the player in the game
export abstract class Character implements IInteractiveObject {
	id: number
	name: string
	currentRoom: Room
	currentLP: number
	maxLP: number
	weight: number
	inventory: any[]

	constructor(
		id: number,
		startingRoom: Room,
		LP: number,
		weight: number = 0,
		inventory: any[] = [],
	) {
		this.id = id
		this.currentRoom = startingRoom
		this.inventory = inventory
		this.currentLP = LP
		this.maxLP = LP
		this.weight = weight
	}

	examine() {
		return this.name
	}

	setCurrentLP(point: number) {
		this.currentLP = point
	}

	use(character: Character, weapon: Weapon) {
		return "void"
	}

	// Add item to character's inventory
	addItemToInventory(object: IInteractiveObject) {
		this.inventory.push(object)
	}

	// Remove item from character's inventory
	removeItemToInventory(object: IInteractiveObject) {
		this.inventory = this.inventory.filter((obj) => obj.name !== object.name)
	}

	// Get a description of the player's inventory
	getInventoryDescription() {
		let description = "Inventaire :"
		if (this.inventory.length === 0) {
			description += "\n - rien"
		} else {
			for (let obj of this.inventory) {
				description += "\n - " + obj.name
			}
		}
		return description
	}

	attack(ennemy: Character, weapon: Weapon) {
		if (this.inventory.find((el) => el.name === weapon.name)) {
			const ennemyProtection: number =
				ennemy.inventory.find((el) => el.name === "Armure")?.protection ?? 0
			const damage: number = ennemyProtection - weapon.damage
			ennemy.setCurrentLP(ennemy.currentLP - damage)
			if (ennemy.currentLP <= 0) {
				this.currentRoom.removeObject(ennemy)
				return `${this.name} a vaincu ${ennemy.name}!`
			} else {
				return `${this.name} a infligé ${damage} dégâts à ${ennemy.name}!`
			}
		} else {
			return ` ${this.name} ne possédez pas de ${weapon.name}`
		}
	}
}
