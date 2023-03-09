import { IInteractiveObject } from "../interfaces"

// Class to represent a piece in the game
export class Room {
  name: string
  description: string
  objects: IInteractiveObject[]

  constructor(name: string, description: string, objects: IInteractiveObject[] = []) {
    this.name = name
    this.description = description
    this.objects = objects
  }

  // Add an interactive object to the room
  addObject(object: IInteractiveObject) {
    this.objects.push(object)
  }

  // Remove an interactive object from the room
  removeObject(object: IInteractiveObject) {
    this.objects = this.objects.filter( obj => obj.name === object.name )
  }

  // Get a part description
  getDescription() {
    let description = this.description
    if (this.objects.length > 0) {
      description += "\nIl y a ici :"
      for (let obj of this.objects) {
        description += "\n - " + obj.name
      }
    }
    return description
  }
}