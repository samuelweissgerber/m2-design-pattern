import { IInteractiveObject } from "../interfaces"
import { Player } from "./player"

// Exemple de trésor pour la quatrième salle
export class Treasure implements IInteractiveObject {
  id: number
  name: string
  description: string
  weight: number
  inventory: IInteractiveObject[]

  constructor(id: number, description: string, weight: number = 0 , inventory: IInteractiveObject[] = [] ) {
    this.id = id
    this.name = "Trésor"
    this.description = description
    this.inventory = inventory
    this.weight = weight
  }

  examine() {
    return `Id :  ${this.id} \n Name : ${this.name} : \n Description : ${this.description} \n Inventory: ${this.inventory} Weight : ${this.weight} !`
  }

  use(player : Player) {
   // player.addItemToInventory({name: "Épée"})
    return "Vous avez trouvé une épée !"
  }
}