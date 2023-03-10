import { IInteractiveObject } from "../../interfaces"
import { Player } from "../player"
import { Takable } from "./takable"

/**
 * A treasure object that can be picked up and added to a player's inventory.
 * Inherits from the Takable class.
*/
export class Treasure extends Takable {
	id: number
	name: string
	description: string
	weight: number
	inventory: any[]

	super() {
		this.name = "Trésor"
	}

	/**
	 * Adds the treasure's inventory items to the player's inventory and returns a message.
	 * @param player The player using the treasure.
	 * @returns A string describing the result of using the treasure.
   	*/
	use(player: Player) {
		this.inventory.map((el) => player.addItemToInventory(el))
		return `Vous avez ajouter ${this.name} à votre inventaire`
	}
}
