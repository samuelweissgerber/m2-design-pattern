import { Script } from "vm"
import { IInteractiveObject } from "../interfaces"
import { Character } from "./character.ts"
import { Room } from "./room"
import { Armor, Takable } from "./takables.ts"
import { Weapon } from "./takables/weapon.ts"


// Classe pour représenter le joueur dans le jeu
export class Player {
	id: number
	type: string
	name: string
	currentRoom: Room
	currentLP: number
	maxLP: number
	weight: number
	protection: number
	inventory: any[]

	constructor(id: number,type: string, name: string, startingRoom: Room, LP: number, weight: number = 0, inventory = []) {
		this.id = id
		this.type = type
		this.name = name
		this.currentRoom = startingRoom
		this.currentLP = LP
		this.maxLP = LP
		this.weight = weight
		this.inventory = inventory
		this.protection = inventory.reduce(
			(acc, obj: Armor) =>
				obj.name === "armure" ? acc + obj?.protection : acc,
			0,
		)
	}

	/**
	 * Gets the protection provided by the armor worn by the player.
	 *
	 * @returns {number} The protection value.
	 */
	getProtection(): number {
		return this.protection
	}

	/**
	 * Sets the protection provided by the armor worn by the player.
	 *
	 * @param {number} protection - The protection value to set.
	 */
	setProtection(protection: number) {
		this.protection += protection
	}

	/**
	 * Moves the player to the specified room.
	 *
	 * @param {Room} room - The room where the player should go.
	 */
	goTo(room: Room) {
		this.currentRoom = room
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
