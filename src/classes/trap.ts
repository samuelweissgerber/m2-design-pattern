import { IInteractiveObject } from "../interfaces"
import { Player } from "./player"

// Exemple de piège pour la troisième salle
export class Trap implements IInteractiveObject {
  name: string
  weight: number
  description: string
  damage: number

  constructor(description: string, damage: number, weight: number = 0) {
    this.name = "Piège"
    this.description = description
    this.damage = damage
    this.weight = 0
  }

  examine() {
    return this.description
  }

  use(player : Player) {
    player.inventory.filter(obj => obj.name === "Bouclier")[0].use(player, null) // utilise le bouclier
    return `Le piège vous inflige ${this.damage} dégâts !`
  }
}