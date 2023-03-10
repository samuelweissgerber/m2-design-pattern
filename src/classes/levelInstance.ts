import { Room } from "./room"

/**
 * Represents an instance of a level in a game, including its ID, rooms, tutorial status, and difficulty.
 */
export class LevelInstance {
	id: number
	room: Room[]
	isTutorial: boolean
	difficulty: number

	/**
     * Creates a new instance of a level with the specified parameters.
     * @param id The ID of the level instance.
     * @param room An array of rooms in the level instance.
     * @param isTutorial Whether the level instance is a tutorial or not.
     * @param difficulty The difficulty level of the level instance.
    */
	constructor(
		id: number,
		room: Room[],
		isTutorial: boolean,
		difficulty: number,
	) {
		this.id = id
		this.room = room
		this.isTutorial = isTutorial
		this.difficulty = difficulty
	}
}
