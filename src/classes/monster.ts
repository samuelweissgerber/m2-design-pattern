import { Character, Player } from "."
import { IInteractiveObject } from "../interfaces"
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
    return `Id :  ${this.id} \n Name : ${this.name} : \n Description : ${this.description} \n Inventory: ${this.inventory} \n Current life points ${this.currentLP} \n Maximum life points ${this.maxLP} !`
  }
  
  attack(ennemy: Character, weapon: Weapon) {
    if (this.inventory.find(el => el.name === weapon.name)) {
      const playerProtection : number =  ennemy.inventory.find(el => el.name === "Armure")?.protection ?? 0
      const damage: number = playerProtection - weapon.damage
      ennemy.setCurrentLP(ennemy.currentLP - damage ) 
      if (ennemy.currentLP <= 0) {
        ennemy.currentRoom.removeObject(this)
        return `${this.name} vous a vaincu !`
      } else {
        return `${this.name} vous attaque et vous inflige ${damage} dégâts !`
      } 
    } else {
      return ` Vous ne possédez pas de ${weapon.name}`
    }
    
  }
}