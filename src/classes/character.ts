import { IInteractiveObject } from "../interfaces"
import { Room } from "./room"
import { Weapon } from "./weapon"

// Class to represent the player in the game
export abstract class Character implements IInteractiveObject {
  name: string
  currentRoom: Room
  currentLP: number
  maxLP: number
  weight: number
  inventory: IInteractiveObject[]

  constructor(startingRoom: Room, LP: number, weight: number = 0, inventory: IInteractiveObject[] = []) {
    this.currentRoom = startingRoom
    this.inventory = inventory
    this.currentLP = LP
    this.maxLP = LP
    this.weight = weight
  }

  examine() {
    return this.name
  }

  use(character: Character, weapon: Weapon) {
    return 'void'
  }

  // Add item to player's inventory
  addItemToInventory(object: IInteractiveObject) {
    this.inventory.push(object)
  }
  
  removeItemToInventory(object: IInteractiveObject) {
    this.inventory = this.inventory.filter(obj => obj.name != object.name)
  }

  // Get a description of the player's inventory
  getInventoryDescription() {
    let description = "Vous avez dans votre inventaire :"
    if (this.inventory.length === 0) {
      description += "\n - rien"
    } else {
      for (let obj of this.inventory) {
        description += "\n - " + obj.name
      }
    }
    return description
  }

}