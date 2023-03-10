import { IInteractiveObject } from "../interfaces"

// Class to represent a piece in the game
export class Room {
	id: number
	name: string
	description: string
	objects: any[]

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

  examine() {
    // If it's not a trap we don't display the object description
    let descRoomAndObjects: string = "" ;
    
    this.objects.forEach(object => {
      if( object.name !== "Piège" ) {
        descRoomAndObjects += object.examine();
      }
    });

    return `Name : ${this.name} \n Description : ${this.description} \n Objects list : ${descRoomAndObjects}`
  }

	// Add an interactive object to the room
	addObject(object: IInteractiveObject) {
		this.objects.push(object)
	}

	// Get a part description
	getDescription() {
		let description = this.description
		if (this.objects.length > 0) {
			description += "\nIl y a ici :"
			this.objects.map((obj) =>
				obj.name !== "piège" ? (description += "\n - " + obj.name) : "",
			)
		}
		return description
	}
}
