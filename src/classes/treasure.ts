import { IInteractiveObject } from "../interfaces"
import { Player } from "./player"

// Exemple de trésor pour la quatrième salle
export class Treasure implements IInteractiveObject {
  id: number
  name: string
  description: string
  weight: number
  inventory: any[]

  constructor(id: number, description: string, weight: number = 0 , inventory: IInteractiveObject[] = [] ) {
    this.id = id
    this.name = "Trésor"
    this.description = description
    this.inventory = inventory
    this.weight = weight
  }

  examine() {
    return `Name : ${this.name} \n Description : ${this.description} \n Inventory: ${this.inventory} Weight : ${this.weight}`
  }

  use(player : Player) {
    this.inventory.map(el => player.addItemToInventory(el) )
    return "Vous avez trouvé une épée !"
  }
}