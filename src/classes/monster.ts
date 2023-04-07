
import { Player } from "./player.ts"
import { IInteractiveObject } from "../interfaces/index.ts"
import { Weapon } from "./takables/weapon.ts"
import { Armor } from "./takables/armor.ts"
import { Room } from "./room.ts"
import { InputType } from "../interfaces/index.ts"

// Sample monster for the first room
export class Monster {
  id: number
  name: string
	currentLP: number
	maxLP: number
	weight: number
	protection: number
	inventory: any[]
	description: string
	inputType: InputType

	constructor(id: number,name: string,  LP: number, weight: number = 0,description: string, inventory = []) {
		this.id = id
    	this.name = name
		this.currentLP = LP
		this.maxLP = LP
		this.weight = weight
		this.inventory = inventory
    	this.description = description
		this.protection = inventory.reduce(
			(acc, obj: Armor) =>
				obj.name === "Arme" ? acc + obj?.protection : acc,
			0,
		)
		this.inputType = InputType.Boolean
	}


	getProtection(): number {
		return this.protection
	}

	setProtection(protection: number) {
		this.protection += protection
	}

	goTo(room: Room) {
		this.currentRoom = room
	}

	examine() {
		return this.name
	}

	setCurrentLP(point: number) {
		this.currentLP = point
	}

	use(character: Player, weapon: Weapon) {
		return "void"
	}

	// Add item to character's inventory
	addItemToInventory(object: IInteractiveObject) {
		this.inventory.push(object)
	}

	// Remove item from character's inventory
	removeItemToInventory(object: IInteractiveObject) {
		this.inventory = this.inventory.filter((obj) => obj.name !== object.name)
	}

	// Get a description of the player's inventory
	getInventoryDescription() {
		let description = "Inventaire :"
		if (this.inventory.length === 0) {
			description += "\n - rien"
		} else {
			for (let obj of this.inventory) {
				description += "\n - " + obj.name
			}
		}
		return description
	}
  
  attack(ennemy: Player, weapon: Weapon) {
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