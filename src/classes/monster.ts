import { Character } from "."
import { IInteractiveObject } from "../interfaces"
import { Weapon } from "./takables/weapon"

/**
 * Represents a monster in the game.
 */
export class Monster extends Character {
	description: string

  /**
   * Creates a new Monster object.
   * @param name - The name of the monster.
   * @param description - The description of the monster.
   * @param LP - The life points of the monster.
   * @param weight - The weight of the monster.
   * @param inventory - The inventory of the monster.
  */
	super(
		name: string,
		description: string,
		LP: number,
		weight: number = 0,
		inventory: IInteractiveObject[] = [],
	) {
		this.name = name
		this.description = description
		this.inventory = inventory
		this.currentLP = LP
		this.maxLP = LP
	}

  /**
   * Returns a string representation of the Monster object.
   * @returns A string representation of the Monster object.
  */
  examine() {
    return `Name : ${this.name} \n Description : ${this.description} \n Inventory: ${this.inventory} \n Current life points ${this.currentLP} \n Maximum life points ${this.maxLP}`
  }
  
  /**
   * Attacks an enemy character with a weapon.
   * @param enemy - The character to attack.
   * @param weapon - The weapon to use.
   * @returns A string indicating the result of the attack.
  */
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
