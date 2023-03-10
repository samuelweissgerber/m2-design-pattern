import { Player, Room } from "."
import { IInteractiveObject, InputType } from "../interfaces"

// Example of interactive object for the second room
export class Riddle implements IInteractiveObject {
<<<<<<< HEAD
	id: number
=======
  id: number
>>>>>>> a9fb3d1 (fix: (#14) conflict problems)
	name: string
	question: string
	weight: number
	answer: string
	reward: IInteractiveObject[] | string | Room
	inputType: InputType

<<<<<<< HEAD
	constructor(
		id: number,
		question: string,
		answer: string,
		weight: number = 0,
		reward,
	) {
		this.id = id
		this.name = "Énigme"
		this.question = question
		this.answer = answer
		this.reward = reward
		this.inputType = InputType.Prompt
	}
=======
  constructor(id: number, question: string, answer: string, weight: number = 0, reward) {
    this.id = id
    this.name = "Énigme"
    this.question = question
    this.answer = answer
    this.reward = reward
    this.inputType = InputType.Prompt
  }
>>>>>>> a9fb3d1 (fix: (#14) conflict problems)

<<<<<<< HEAD
	examine() {
		return `Id :  ${this.id} \n Name : ${this.name} : \n Question : ${this.question} \n Answer: ${this.answer} \n Reward ${this.reward} !`
	}
=======
  examine() {
    return `Name : ${this.name} \n Question : ${this.question} \n Answer : ${this.answer} \n Reward ${this.reward}`
  }
>>>>>>> 2754101 (feat: (6) Update examine room function with examine objects function)

<<<<<<< HEAD
	use(player: Player) {
=======

  use(player: Player) {
>>>>>>> a9fb3d1 (fix: (#14) conflict problems)
		const input = prompt(this.question)
		if (input === this.answer) {
			player.addItemToInventory(this)
			return "Bravo, vous avez résolu l'énigme et avez reçu une clé en récompense !"
		} else {
			return "Désolé, ce n'est pas la bonne réponse..."
		}
	}
<<<<<<< HEAD
}
=======
}
>>>>>>> a9fb3d1 (fix: (#14) conflict problems)
