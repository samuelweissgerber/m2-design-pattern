import { Player } from "./player"
import { getRoom } from "../helpers/index.ts"

/**
 * Represents an instance of a level in a game, including its ID, rooms, tutorial status, and difficulty.
 */
export class GameInstance {
	player: Player
	pastRooms: number[]
	difficulty: number

	/**
	 * Creates a new instance of a level with the specified parameters.
	 * @param player The current player.
	 * @param difficulty The difficulty level of the level instance.
	*/
	constructor(
		player: Player,
		difficulty: number = 1
	) {
		this.player = player
		this.difficulty = difficulty
		this.pastRooms = []
	}


	setDifficulty(difficulty: number) {
	  this.difficulty = difficulty
	}

	setPlayer(player: Player) {
		this.player = player
	}

	setPastRooms(id: number) {
		this.pastRooms.push(id)
	}

	nextRoom() {
		const pre = Math.floor(Math.random() * 20)
		if (this.pastRooms.includes(pre)) {
			this.nextRoom()
		} else {
			return getRoom(pre)
		}
	}

}
