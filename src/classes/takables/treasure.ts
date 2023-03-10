import { IInteractiveObject } from "../../interfaces"
import { Player } from "../player"
import { Takable } from "./takable"

// Exemple de trésor pour la quatrième salle
export class Treasure extends Takable {
	id: number
	name: string
	description: string
	weight: number
	inventory: any[]

	super() {
		this.name = "Trésor"
	}

	use(player: Player) {
		this.inventory.map((el) => player.addItemToInventory(el))
		return `Vous avez ajouter ${this.name} à votre inventaire`
	}
}
