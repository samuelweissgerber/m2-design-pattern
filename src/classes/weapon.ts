import { Player } from "."
import { IInteractiveObject } from "../interfaces"

// Example of a trap for the third room
export class Weapon implements IInteractiveObject {
  id: number
  name: string
  description: string
  damage: number
  weight: number

  constructor(id: number, name : string =  "Arme" ,description: string, damage: number, weight: number = 0) {
    this.id = id
    this.name = name
    this.description = description
    this.damage = damage
    this.weight = weight
  }

  examine() {
    return `Name : ${this.name} \n Description : ${this.description} \n Damage: ${this.damage} Weight : ${this.weight}`
  }

  use(player : Player) {
    player.inventory.filter(obj => obj.name === this.name)[0].use(player, null) // utilise le bouclier
    return `Le piège vous inflige ${this.damage} dégâts !`
  }
}