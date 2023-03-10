import { Player } from "../player.ts"
import { Takable } from "./takable.ts"

/**
 * A treasure object that can be picked up and added to a player's inventory.
 * Inherits from the Takable class.
*/
export class Treasure extends Takable {
	inventory: any[]

	constructor(id: number,
		name: string = "Arme",
		description: string,
		weight: number = 0,
		inventory: any [] ){

		super(id,name,description,weight)
		this.inventory = inventory
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
