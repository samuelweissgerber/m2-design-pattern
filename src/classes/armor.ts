import { IInteractiveObject } from "../interfaces"
import { Player } from "./player"

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
    return `${this.name} : \n Description : ${this.description} \n Protection: ${this.protection} \n Weight ${this.weight} !`
  }

  getName() {
    return this.name
  }

  getDescription() { 
    return this.description
  }

  getProtection() {
    return this.protection
  }

  use(player : Player) {
    player.inventory.filter(obj => obj.name === this.name)[0].use(player, null) // utilise le bouclier
    return `Le piège vous inflige ${this.protection} dégâts !`
  }
}