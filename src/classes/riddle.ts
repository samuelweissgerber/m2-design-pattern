import { Player, Room } from "."
import { IInteractiveObject } from "../interfaces"

// Example of interactive object for the second room
export class Riddle implements IInteractiveObject {
  name: string
  question: string
  weight: number
  answer: string 
  reward: IInteractiveObject[] | string | Room

  constructor(question: string, answer: string, weight: number = 0, reward) {
    this.name = "Énigme"
    this.question = question
    this.answer = answer
    this.reward = reward
  }

  examine() {
    return this.question
  }

  use(player : Player) {
    const input = prompt(this.question)
    if (input === this.answer) {
      player.addItemToInventory(this)
      return "Bravo, vous avez résolu l'énigme et avez reçu une clé en récompense !"
    } else {
      return "Désolé, ce n'est pas la bonne réponse..."
    }
  }
}