
import { Player } from "./player.ts"
import { IInteractiveObject } from "../interfaces/index.ts"
import { Weapon } from "./takables/weapon.ts"
import { Armor } from "./takables/armor.ts"
import { Room } from "./room.ts"
import { InputType } from "../interfaces/index.ts"

// Sample monster for the first room
export class Monster {
  id: number
  name: string
	currentLP: number
	maxLP: number
	weight: number
	protection: number
	inventory: any[]
	description: string
	inputType: InputType

	/**
	 * Creates a new instance of the Monster class.
	 * @param {number} id - The unique identifier for the monster.
	 * @param {string} name - Name of the monster.
	 * @param {number} LP - Life point of the monster.
	 * @param {number} weight - Weight of the monster.
	 * @param {string} description - Description of the monster.
	 * @param {IInteractiveObject} inventory - Inventory of the monster.
	 */
	constructor(id: number,name: string,  LP: number, weight: number = 0,description: string, inventory = []) {
		this.id = id
    	this.name = name
		this.currentLP = LP
		this.maxLP = LP
		this.weight = weight
		this.inventory = inventory
    	this.description = description
		this.protection = inventory.reduce(
			(acc, obj: Armor) =>
				obj.name === "Arme" ? acc + obj?.protection : acc,
			0,
		)
		this.inputType = InputType.Boolean
	}

	/**
	 * Gets the protection provided by the armor worn by the monster.
	 * @returns {number} The protection value.
	 */
	getProtection(): number {
		return this.protection
	}

	/**
	 * Sets the protection provided by the armor worn by the monster.
	 * @param {number} protection - The protection value to set.
	 */
	setProtection(protection: number) {
		this.protection += protection
	}

	/**
	 * Moves the monster to the specified room.
	 * @param {Room} room - The room where the monster should go.
	 */
	goTo(room: Room) {
		this.currentRoom = room
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
	 * @param {number} point - The new life point value.
     */
	setCurrentLP(point: number) {
		this.currentLP = point
	}

	/**
     * Uses a weapon against another character.
     * @param {Player} character - The target character.
     * @param {Weapon} weapon - The weapon to use.
     * @returns "void".
     */
	use(character: Player, weapon: Weapon) {
		return "void"
	}
	
	/**
	 * Add item to character's inventory
	 * @param {IInteractiveObject} object - The inventory
	 */
	addItemToInventory(object: IInteractiveObject) {
		this.inventory.push(object)
	}
 
	/**
	 * Remove item from character's inventory
	 * @param {IInteractiveObject} object - The inventory
	 */
	removeItemToInventory(object: IInteractiveObject) {
		this.inventory = this.inventory.filter((obj) => obj.name !== object.name)
	}

	/**
	 * Get a description of the monster's inventory.
	 * @returns The description
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
     * @param {Player} ennemy - The target character.
     * @param {Weapon} weapon - The weapon to use.
     * @returns A message describing the result of the attack.
     */
	attack(ennemy: Player, weapon: Weapon) {
		if (this.inventory.find(el => el.name === weapon.name)) {
		const playerProtection : number =  ennemy.inventory.find(el => el.name === "Armure")?.protection ?? 0
		const damage: number = playerProtection - weapon.damage
		ennemy.setCurrentLP(ennemy.currentLP - damage ) 
		if (ennemy.currentLP <= 0) {
			ennemy.currentRoom.removeObject(this)
			return `${this.name} vous a vaincu !`
		} else {
			return `${this.name} vous attaque et vous inflige ${damage} dégâts !`
		} 
		} else {
		return ` Vous ne possédez pas de ${weapon.name}`
		}
	}
}