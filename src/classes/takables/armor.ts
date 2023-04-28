import { Player } from "../player.ts"
import { Takable } from "./takable.ts"

/**
 * This class represents an armor object in the game. 
 * It extends the Takable class and implements the IInteractiveObject interface.
*/
export class Armor extends Takable {
	name: string
	protection: number
  
	/**
	 * Creates a new Armor object with the given properties.
	 * @param {number} id - The ID of the object.
	 * @param {string} name - The name of the object.
	 * @param {string} description - A description of the object.
	 * @param {number} weight - The weight of the object.
	 * @param {number} protection - The amount of protection the object have.
	*/
	constructor(
		id: number,
		name: string = "Arme",
		description: string,
		weight: number = 0,
		protection: number) {
		super(id,
			name,
			description,
			weight)
		this.protection = protection
	}

	/**
	 * Returns the amount of protection that the armor provides.
	 * @returns The amount of protection provided by the armor.
	*/
	getProtection() {
		return this.protection
	}

	/**
	 * Applies the armor's protection to the player's character.
	 * @param {Player} player - The player's character object.
	 * @returns A string indicating that the armor has been used and the amount of protection it provides.
	*/
	use(player: Player) {
		player.setProtection(this.protection)
		return `Le piège vous inflige ${this.protection} dégâts !`
	}
}
