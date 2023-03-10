import { Character } from "./character"
import { Room } from "./room"
import { Armor, Takable } from "./takables"
import { Weapon } from "./takables/weapon"


/**
 * Class representing the player in the game.
 * Extends the Character class.
 */
export class Player extends Character {
	currentRoom: Room
	currentLP: number
	maxLP: number
	weight: number
	protection: number
	inventory: any[]

	/**
	 * Creates an instance of Player.
	 *
	 * @param {Room} startingRoom - The room where the player starts.
	 * @param {number} LP - The life points (LP) of the player.
	 * @param {number} [weight=0] - The initial weight of the player.
	 * @param {any[]} [inventory=[]] - The initial inventory of the player.
	 */
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

	/**
	 * Gets the protection provided by the armor worn by the player.
	 *
	 * @returns {number} The protection value.
	 */
	getProtection(): number {
		return this.protection
	}

	/**
	 * Sets the protection provided by the armor worn by the player.
	 *
	 * @param {number} protection - The protection value to set.
	 */
	setProtection(protection: number) {
		this.protection += protection
	}

	/**
	 * Moves the player to the specified room.
	 *
	 * @param {Room} room - The room where the player should go.
	 */
	goTo(room: Room) {
		this.currentRoom = room
	}

}
