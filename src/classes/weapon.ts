import { IInteractiveObject } from "../interfaces"
import { Player } from "./player"

// Example of a trap for the third room
export class Weapon implements IInteractiveObject {
  name: string
  description: string
  damage: number
  weight: number

  constructor(name : string =  "Arme" ,description: string, damage: number, weight: number = 0) {
    this.name = name
    this.description = description
    this.damage = damage
    this.weight = weight
  }

  examine() {
    return this.description
  }

  use(player : Player) {
    player.inventory.filter(obj => obj.name === this.name)[0].use(player, null) // utilise le bouclier
    return `Le piège vous inflige ${this.damage} dégâts !`
  }
}