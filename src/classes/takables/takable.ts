import { IInteractiveObject, InputType } from "../../interfaces/index.ts"
import { Character } from "../character"
import { Player } from "../player"

// Example of a trap for the third room
export abstract class Takable implements IInteractiveObject {
	id: number
	name: string
	description: string
	weight: number
	inputType: InputType

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

	getName() {
		return this.name
	}

	getDescription() {
		return this.description
	}

	examine() {
		return `Id :  ${this.id} \n Name : ${this.name} : \n Description : ${this.description} \n Damage: ${this.damage} Weight : ${this.weight} !`
	}

	take(player: Player) {
		player.inventory.push(this)
	}

	use(player: Character, ennemy: Character | null) {
		return ""
	}
}
