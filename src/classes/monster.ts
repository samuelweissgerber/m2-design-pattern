import { IInteractiveObject } from "../interfaces"
import { Character } from "./character"
import { Player } from "./player"
import { Weapon } from "./weapon"

// Sample monster for the first room
export class Monster extends Character {
  description: string

  super(name: string, description: string, LP: number, weight: number = 0, inventory: IInteractiveObject[] = [] ) {
    this.name = name
    this.description = description
    this.inventory = inventory
    this.currentLP = LP
    this.maxLP = LP
  }

  examine() {
    return this.description
  }

  use(player: Player, weapon: Weapon) {
    this.currentLP -= player.inventory.filter(obj => obj.name === weapon.name).length * weapon.damage  // 5 est le dégât infligé par une épée
    if (this.currentLP <= 0) {
      // to-do
      player.currentRoom.removeObject(this)
      return `Vous avez vaincu ${this.name} !`
    } else {
      // to-do
      player.inventory.filter(obj => obj.name === "Armor")[0].use(this, null) // utilise le bouclier
      return `${this.name} vous attaque et vous inflige ${this} dégâts !`
    } 
  }
}