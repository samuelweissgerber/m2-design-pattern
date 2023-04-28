import { Player } from "."
import { IInteractiveObject, InputType } from "../interfaces/index.ts"

/**
 * Represents a trap that can be found in a room.
 */
export class Trap implements IInteractiveObject {
	id: number
	name: string
	weight: number
	description: string
	damage: number
	inputType: InputType

  	/**
     * Creates a new instance of the Trap class.
     * @param id - The unique identifier of the trap.
     * @param description - The description of the trap.
     * @param damage - The amount of damage the trap can inflict.
     * @param weight - The weight of the trap (default is 0).
  	 */
	constructor(
		id: number,
		description: string,
		damage: number,
		weight: number = 0,
	) {
		this.id = id
		this.name = "Piège"
		this.description = description
		this.damage = damage
		this.weight = weight
		this.inputType = InputType.Boolean
	}

   
	/**
     * Returns a string representation of the trap's properties.
     * @returns A string that includes the name, description, damage, and weight of the trap.
	 */
	examine() {
		return `Name : ${this.name} \n Description : ${this.description} \n Damage : ${this.damage} Weight : ${this.weight}`
	}

  	/**
     * Uses the trap, which will cause damage to the player and reduce their health.
     * @param player - The player that will be affected by the trap.
     * @returns A message that indicates the amount of damage the player has taken from the trap.
  	 */
	use(player: Player) {
		player.inventory
			.filter((obj) => obj.name === "Bouclier")[0]
			.use(player, null) // use shield
		return `Le piège vous inflige ${this.damage} dégâts !`
	}
}
