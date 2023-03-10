import { Room } from "./room"

export class LevelInstance {
	id: number
	room: Room[]
	isTutorial: boolean
	difficulty: number

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
