import { IInteractiveObject } from "../../interfaces"
import { Player } from "../player"
import { Takable } from "./takable"

/**
 * This class represents an armor object in the game. 
 * It extends the Takable class and implements the IInteractiveObject interface.
*/
export class Armor extends Takable {
	protection: number

	/**
	 * Creates an instance of Armor.
	 * @param name The name of the armor. Default value is "Armure".
	 * @param protection The amount of protection that the armor provides.
	*/
	super(name: string = "Armure", protection: number) {
		this.name = name
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
	 * @param player The player's character object.
	 * @returns A string indicating that the armor has been used and the amount of protection it provides.
	*/
	use(player: Player) {
		player.setProtection(this.protection)
		return `Le piège vous inflige ${this.protection} dégâts !`
	}
}
