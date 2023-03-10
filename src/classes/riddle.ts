import { Player, Room } from "."
import { IInteractiveObject } from "../interfaces"

// Example of interactive object for the second room
export class Riddle implements IInteractiveObject {
  id: number
  name: string
  question: string
  weight: number
  answer: string 
  reward: IInteractiveObject[] | string | Room

  constructor(id: number, question: string, answer: string, weight: number = 0, reward) {
    this.id = id
    this.name = "Énigme"
    this.question = question
    this.answer = answer
    this.reward = reward
  }

  examine() {
    return `Name : ${this.name} \n Question : ${this.question} \n Answer : ${this.answer} \n Reward ${this.reward}`
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