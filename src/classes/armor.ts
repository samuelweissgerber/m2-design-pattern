import { IInteractiveObject } from "../interfaces"
import { Player } from "./player"

// Exemple de piège pour la troisième salle
export class Armor implements IInteractiveObject {
  name: string
  description: string
  protection: number
  weight: number

  constructor(name : string =  "Armure" ,description: string, protection: number, weight: number = 0) {
    this.name = name
    this.description = description
    this.protection = protection
    this.weight = weight
  }

  examine() {
    return this.description
  }

  use(player : Player) {
    player.inventory.filter(obj => obj.name === this.name)[0].use(player, null) // utilise le bouclier
    return `Le piège vous inflige ${this.protection} dégâts !`
  }
}