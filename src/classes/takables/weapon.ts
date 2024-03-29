import { Character } from "../character"
import { Player } from "../player"
import { Takable } from "./takable.ts"

/**
 * A weapon trap that can be used against an enemy.
 * Inherits from the Takable class.
 */
export class Weapon extends Takable {
	damage: number

	/**
	 * Creates a new Weapon object with the given properties.
	 * @param {string} name - The name of the object.
	 * @param {string} description - A description of the object.
	 * @param {number} weight - The weight of the object.
	 * @param {number} damage - The damage applied with the weapon.
	*/
	constructor(id: number,
		name: string = "Arme",
		description: string,
		weight: number = 0,
		damage: number) {
		super(id,
			name,
			description,
			weight)
		this.damage = damage
	}

	/**
	 * Uses the weapon trap against an enemy, causing damage and triggering any associated effects.
	 * @param {Character} player - The player using the weapon.
	 * @param {Character} enemy - The enemy being attacked.
	 * @returns A string describing the result of the attack.
   	*/
  	use(player: Character, ennemy: Character) {
    
    	player.attack(ennemy, this)
			ennemy.inventory
				.filter((obj) => obj.name === this.name)[0]
				.use(ennemy, null) // utilise le bouclier
			return `Le piège vous inflige ${this.damage} dégâts !`
	}
}
