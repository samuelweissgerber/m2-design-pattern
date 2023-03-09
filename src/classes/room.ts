import { IInteractiveObject } from "../interfaces"

// Classe pour représenter une pièce dans le jeu
export class Room {
  name: string
  description: string
  objects: IInteractiveObject[]

  constructor(name: string, description: string, objects: IInteractiveObject[] = []) {
    this.name = name
    this.description = description
    this.objects = objects
  }

  // Ajouter un objet interactif à la pièce
  addObject(object: IInteractiveObject) {
    this.objects.push(object)
  }

  deleteObject(object: IInteractiveObject) {
    this.objects = this.objects.filter( obj => obj.name === object.name )
  }

  // Obtenir une description de la pièce
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