import { IInteractiveObject } from "../interfaces"
import { Player } from "./player"

// Exemple de trésor pour la quatrième salle
export class Treasure implements IInteractiveObject {
  name: string
  description: string
  weight: number
  inventory: IInteractiveObject[]

  constructor(description: string, weight: number = 0 , inventory: IInteractiveObject[] = [] ) {
    this.name = "Trésor"
    this.description = description
    this.inventory = inventory
    this.weight = weight
  }

  examine() {
    return this.description
  }

  use(player : Player) {
   // player.addItemToInventory({name: "Épée"})
    return "Vous avez trouvé une épée !"
  }
}