import { Player, Room } from "."
import { IInteractiveObject, InputType } from "../interfaces/index.ts"

/**
 * Represents a riddle in the game
 */
export class Riddle implements IInteractiveObject {
	id: number
	name: string
	question: string
	weight: number
	answer: string
	reward: IInteractiveObject[] | string | Room
	inputType: InputType

  /**
	 * Creates a new riddle
	 * @param id - The unique identifier for the riddle
	 * @param question - The question asked by the riddle
	 * @param answer - The answer to the riddle
	 * @param weight - The weight of the riddle (default 0)
	 * @param reward - The reward for solving the riddle
	 */
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
		this.weight = weight
		this.reward = reward
		this.inputType = InputType.Prompt
	}

  /**
	 * Returns a string with information about the riddle
	 * @returns A string with information about the riddle
	*/
  examine() {
    return `Name : ${this.name} \n Question : ${this.question} \n Answer : ${this.answer} \n Reward ${this.reward}`
  }

  /**
	 * Solves the riddle and gives the player a reward if the answer is correct
	 * @param player - The player attempting to solve the riddle
	 * @returns A message indicating whether the answer was correct and if a reward was given
	*/
	use(player: Player) {
		const input = prompt(this.question)
		if (input === this.answer) {
			player.addItemToInventory(this)
			return "Bravo, vous avez résolu l'énigme et avez reçu une clé en récompense !"
		} else {
			return "Désolé, ce n'est pas la bonne réponse..."
		}
	}
}
