import { Player } from "."
import { IInteractiveObject, InputType } from "../interfaces"

// Example of a trap for the third room
export class Trap implements IInteractiveObject {
<<<<<<< HEAD
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
=======
  id: number
  name: string
  weight: number
  description: string
  damage: number
  inputType: InputType

  constructor(id: number, description: string, damage: number, weight: number = 0) {
    this.id = id
    this.name = "Piège"
    this.description = description
    this.damage = damage
    this.weight = 0
    this.inputType = InputType.Boolean
  }
>>>>>>> a9fb3d1 (fix: (#14) conflict problems)

<<<<<<< HEAD
	examine() {
		return `Id :  ${this.id} \n Name : ${this.name} : \n Description : ${this.description} \n Damage: ${this.damage} Weight : ${this.weight} !`
	}
=======
  examine() {
    return `Name : ${this.name} \n Description : ${this.description} \n Damage : ${this.damage} Weight : ${this.weight}`
  }
>>>>>>> 2754101 (feat: (6) Update examine room function with examine objects function)

<<<<<<< HEAD
	use(player: Player) {
=======
  use(player: Player) {
>>>>>>> a9fb3d1 (fix: (#14) conflict problems)
		player.inventory
			.filter((obj) => obj.name === "Bouclier")[0]
			.use(player, null) // utilise le bouclier
		return `Le piège vous inflige ${this.damage} dégâts !`
	}
<<<<<<< HEAD
}
=======
}
>>>>>>> a9fb3d1 (fix: (#14) conflict problems)
