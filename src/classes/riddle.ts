import { Player, Room } from "."
import { IInteractiveObject, InputType } from "../interfaces/index.ts"

/**
 * Represents a riddle in the game
 */
export class Riddle implements IInteractiveObject {
	id: number
	name: string
	type: string
	question: string
	weight: number
	answer: string
	reward: IInteractiveObject[] | string | Room
	inputType: InputType
	isFirstAnswer: Boolean

  	/**
	 * Creates a new instance of the Riddle class.
	 * @param id - The unique identifier for the riddle.
	 * @param question - The question asked by the riddle.
	 * @param answer - The answer to the riddle.
	 * @param weight - The weight of the riddle (default 0).
	 * @param reward - The reward for solving the riddle.
	 */
	constructor(
		id: number,
		question: string,
		answer: string,
		weight: number = 0,
		reward,
		type: string
	) {
		this.id = id
		this.name = "Énigme"
		this.question = question
		this.answer = answer
		this.weight = weight
		this.reward = reward
		this.inputType = InputType.Prompt
		this.isFirstAnswer = true
		this.type = type
	}

  	/**
	 * Returns a string with information about the riddle.
	 * @returns A string with information about the riddle.
	 */
	examine() {
		return `Name : ${this.name} \n Question : ${this.question} \n Answer : ${this.answer} \n Reward ${this.reward}`
	}

  	/**
	 * Solves the riddle and say if the answer is correct.
	 * @param reponse - The player attempting to solve the riddle.
	 * @returns if the answer is correct.
	 */
	use(response: String): boolean {
		this.isFirstAnswer = false
		return response === this.answer
	}
}
