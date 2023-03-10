import { Player } from "."
import { IInteractiveObject, InputType } from "../interfaces"

// Example of a trap for the third room
export class Trap implements IInteractiveObject {
	id: number
	name: string
	weight: number
	description: string
	damage: number
	inputType: InputType

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
		this.weight = 0
		this.inputType = InputType.Boolean
	}

  examine() {
    return `Name : ${this.name} \n Description : ${this.description} \n Damage : ${this.damage} Weight : ${this.weight}`
  }

	use(player: Player) {
		player.inventory
			.filter((obj) => obj.name === "Bouclier")[0]
			.use(player, null) // utilise le bouclier
		return `Le piège vous inflige ${this.damage} dégâts !`
	}
}
