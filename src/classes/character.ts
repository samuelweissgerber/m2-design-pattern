import { IInteractiveObject } from "../interfaces"
import { Room } from "./room"
import { Weapon } from "./takables/weapon"

/**
 * Represents a character in the game, which can interact with other objects and characters.
 */
export abstract class Character implements IInteractiveObject {
	id: number
	name: string
	currentRoom: Room
	currentLP: number
	maxLP: number
	weight: number
	inventory: any[]

	 /**
     * Creates a new character with the specified parameters.
     * @param id The ID of the character.
     * @param startingRoom The starting room of the character.
     * @param LP The starting life points of the character.
     * @param weight The weight of the character.
     * @param inventory The initial inventory of the character.
    */
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

	 /**
     * Returns the name of the character.
     * @returns The name of the character.
    */
	examine() {
		return this.name
	}
	 
	/**
     * Sets the current life points of the character.
     * @param point The new life point value.
    */
	setCurrentLP(point: number) {
		this.currentLP = point
	}

	
    /**
     * Uses a weapon against another character.
     * @param character The target character.
     * @param weapon The weapon to use.
     * @returns "void".
    */
	use(character: Character, weapon: Weapon) {
		return "void"
	}

	 /**
     * Adds an item to the character's inventory.
     * @param object The item to add.
    */
	addItemToInventory(object: IInteractiveObject) {
		this.inventory.push(object)
	}

	/**
     * Removes an item from the character's inventory.
     * @param object The item to remove.
    */
	removeItemToInventory(object: IInteractiveObject) {
		this.inventory = this.inventory.filter((obj) => obj.name !== object.name)
	}

	/**
     * Gets a description of the character's inventory.
     * @returns A description of the character's inventory.
    */
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

	 /**
     * Attacks another character with a weapon.
     * @param ennemy The target character.
     * @param weapon The weapon to use.
     * @returns A message describing the result of the attack.
    */
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
