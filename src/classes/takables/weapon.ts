import { Character } from "../character"
import { Player } from "../player"
import { Takable } from "./takable"

/**
 * A weapon trap that can be used against an enemy.
 * Inherits from the Takable class.
 */
export class Weapon extends Takable {
	super() {}

	/**
	 * Uses the weapon trap against an enemy, causing damage and triggering any associated effects.
	 * @param player The player using the weapon.
	 * @param enemy The enemy being attacked.
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
