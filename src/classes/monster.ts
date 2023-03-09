import { IInteractiveObject } from "../interfaces"
import { Player } from "./player"

// Exemple de monstre pour la première salle
export class Monster implements IInteractiveObject {

  name: string
  description: string
  weight: number
  maxLP: number
  currentLP: number
  inventory: IInteractiveObject[]

  constructor(name: string, description: string, LP: number, weight: number = 0, inventory: IInteractiveObject[] = [] ) {
    this.name = name
    this.description = description
    this.inventory = inventory
    this.currentLP = LP
    this.maxLP = LP
  }

  examine() {
    return this.description
  }

  use(player: Player, object: IInteractiveObject) {
    this.currentLP -= player.inventory.filter(obj => obj.name === "Épée").length * 5 // 5 est le dégât infligé par une épée
    if (this.currentLP <= 0) {
      //player.currentRoom.objects.splice(player.currentRoom.objects.indexOf(this), 1)
      return `Vous avez vaincu ${this.name} !`
    } else {
      player.inventory.filter(obj => obj.name === "Bouclier")[0].use(player, null) // utilise le bouclier
      return `${this.name} vous attaque et vous inflige ${this} dégâts !`
    } 
  }
}