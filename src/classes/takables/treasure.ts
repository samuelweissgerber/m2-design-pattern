import { Player } from "../player.ts"
import { Takable } from "./takable.ts"

/**
 * A treasure object that can be picked up and added to a player's inventory.
 * Inherits from the Takable class.
*/
export class Treasure extends Takable {
	inventory: any[]

	/**
	 * Creates a new Treasure object with the given properties.
	 * @param {number} id - The ID of the object.
	 * @param {string} name - The name of the object.
	 * @param {string} description - A description of the object.
	 * @param {number} weight - The weight of the object.
	 * @param {IInteractiveObject} inventory - The inventory where the item will be added.
	*/
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
	 * @param {Player} player - The player using the treasure.
	 * @returns A string describing the result of using the treasure.
   	*/
	use(player: Player) {
		this.inventory.map((el) => player.addItemToInventory(el))
		return `Vous avez ajouter ${this.name} à votre inventaire`
	}
}
