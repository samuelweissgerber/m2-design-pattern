import { IInteractiveObject, InputType } from "../../interfaces/index.ts"
import { Character } from "../character"
import { Player } from "../player"

/**
 * An abstract class for objects that can be taken and used by a player.
 * Implements the IInteractiveObject interface.
 */
export abstract class Takable implements IInteractiveObject {
	id: number
	name: string
	description: string
	weight: number
	inputType: InputType

	/**
	 * Creates a new Takable object with the given properties.
	 * @param {number} id - The ID of the object.
	 * @param {string} name - The name of the object.
	 * @param {string} description - A description of the object.
	 * @param {number} damage - The amount of damage the object can inflict.
	 * @param {number} weight - The weight of the object.
	*/
	constructor(
		id: number,
		name: string = "Arme",
		description: string,
		weight: number = 0,
	) {
		this.id = id
		this.name = name
		this.description = description
		this.weight = weight
		this.inputType = InputType.Boolean
	}

	/**
	 * Returns the name of the object.
	 * @returns The name of the object.
	*/
	getName() {
		return this.name
	}

	/**
	 * Returns the description of the object.
	 * @returns The description of the object.
	*/
	getDescription() {
		return this.description
	}

	/**
	 * Returns a string describing the object's properties.
	 * @returns A string describing the object's ID, name, description, damage, and weight.
	*/
	examine() {
		return `Id :  ${this.id} \n Name : ${this.name} : \n Description : ${this.description} \n Damage: ${this.damage} Weight : ${this.weight} !`
	}

	 /**
	 * Adds the object to the player's inventory.
	 * @param player The player taking the object.
	*/
	take(player: Player) {
		player.inventory.push(this)
	}

	/**
	 * Uses the object to inflict damage on an enemy character.
	 * @param player The player using the object.
	 * @param enemy The enemy being attacked.
	 * @returns An empty string, since the method is abstract and must be implemented in a subclass.
   	*/
	use(player: Character, ennemy: Character | null) {
		return ""
	}
}
