import { Character } from "./character"
import { Room } from "./room"
import { Armor, Takable } from "./takables"
import { Weapon } from "./takables/weapon"

// Classe pour représenter le joueur dans le jeu
<<<<<<< HEAD
export class Player extends Character {
	currentRoom: Room
=======
export class Player  extends Character {
  currentRoom: Room
>>>>>>> a9fb3d1 (fix: (#14) conflict problems)
	currentLP: number
	maxLP: number
	weight: number
	protection: number
	inventory: any[]

	super(startingRoom: Room, LP: number, weight: number = 0, inventory = []) {
		this.currentRoom = startingRoom
		this.inventory = inventory
		this.currentLP = LP
		this.maxLP = LP
		this.weight = weight
		this.protection = inventory.reduce(
			(acc, obj: Armor) =>
				obj.name === "armure" ? acc + obj?.protection : acc,
			0,
		)
	}
<<<<<<< HEAD
=======

	getProtection(): number {
		return this.protection
	}

	setProtection(protection: number) {
		this.protection += protection
	}
>>>>>>> a9fb3d1 (fix: (#14) conflict problems)

	getProtection(): number {
		return this.protection
	}

	setProtection(protection: number) {
		this.protection += protection
	}

	goTo(room: Room) {
		this.currentRoom = room
	}

<<<<<<< HEAD
}
=======
}
>>>>>>> a9fb3d1 (fix: (#14) conflict problems)
