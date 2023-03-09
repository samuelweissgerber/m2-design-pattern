import { Character } from "./character"
import { Room } from "./room"
import { Weapon } from "./weapon"

// Classe pour représenter le joueur dans le jeu
export class Player  extends Character {
  currentRoom: Room
  currentLP: number
  maxLP: number
  weight: number
  inventory: any[]

  super(startingRoom: Room, LP: number, weight: number = 0, inventory = []) {
    this.currentRoom = startingRoom
    this.inventory = inventory
    this.currentLP = LP
    this.maxLP = LP
    this.weight = weight
  }

  goTo(room : Room) {
		this.currentRoom = room
	}

  attack(ennemy: Character, weapon: Weapon) {
    if (this.inventory.find(el => el.name === weapon.name)) {
      const ennemyProtection : number =  ennemy.inventory.find(el => el.name === "Armure")?.protection ?? 0
      const damage: number = ennemyProtection - weapon.damage
      ennemy.setCurrentLP(ennemy.currentLP - damage ) 
      if (ennemy.currentLP <= 0) {
        this.currentRoom.removeObject(ennemy)
        return `vous avez vaincu ${ennemy.name}!`
      } else {
        return `vous avez infligé ${damage} dégâts à ${ennemy.name}!`
      }
    } else {
      return ` Vous ne possédez pas de ${weapon.name}`
    }
    
  }
}