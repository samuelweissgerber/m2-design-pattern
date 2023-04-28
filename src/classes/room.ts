import { IInteractiveObject } from "../interfaces"

/**
 * Represents a room in the game that can contain interactive objects.
 */
export class Room {
	id: number
	name: string
	description: string
	objects: any[]

  	/**
     * Creates a new instance of the Room class.
     * @param id - The unique identifier of the room.
     * @param name - The name of the room.
     * @param description - The description of the room.
     * @param objects - An array of interactive objects that can be found in the room (default is an empty array).
  	 */
	constructor(
		id: number,
		name: string,
		description: string,
		objects: IInteractiveObject[] = [],
	) {
		this.id = id
		this.name = name
		this.description = description
		this.objects = objects
	}

  	/**
     * Returns a string representation of the room's name, description, and list of interactive objects (excluding traps).
     * @returns A string that includes the name, description, and list of interactive objects (excluding traps) in the room.
  	 */
	examine() {
		// If it's not a trap we don't display the object description
		let descRoomAndObjects: string = ""

		this.objects.forEach((object) => {
			if (object.name !== "Piège") {
				descRoomAndObjects += object.examine()
			}
		})

		return `Name : ${this.name} \n Description : ${this.description} \n Objects list : ${descRoomAndObjects}`
	}

	/**
     * Adds an interactive object to the room.
     * @param object - The interactive object to add to the room.
  	 */
	addObject(object: IInteractiveObject) {
		this.objects.push(object)
	}

	/**
     * Adds an interactive object to the room.
     * @param object - The interactive object to add to the room.
  	 */
	addObjects(objects: IInteractiveObject[]) {
		this.objects = objects
	}

  	/**
     * Removes an interactive object from the room.
     * @param object - The interactive object to remove from the room.
  	 */
	removeObject(object: IInteractiveObject) {
		this.objects = this.objects.filter((el) => el.name !== object.name)
	}

  	/**
     * Returns a partial description of the room.
     * @returns A string that includes the description of the room and a list of the interactive objects (excluding traps) in the room.
  	 */
	getDescription() {
		let description = this.description
		if (this.objects.length > 0) {
			description += "\nIl y a ici : \n"
			this.objects.forEach((obj) =>
			{
				description += obj.type ? `\n ${obj.type}` : ""
				description += obj.name ? `\n ${obj.name}` : ""
			}

			)
		}
		return description
	}
}
