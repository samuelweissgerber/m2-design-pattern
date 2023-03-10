import { Player } from "../player.ts"
import { Takable } from "./takable.ts"

// Exemple de trésor pour la quatrième salle
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

	use(player: Player) {
		this.inventory.map((el) => player.addItemToInventory(el))
		return `Vous avez ajouter ${this.name} à votre inventaire`
	}
}
