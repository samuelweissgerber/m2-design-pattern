import { Character } from "../character"
import { Player } from "../player"
import { Takable } from "./takable.ts"

// Example of a trap for the third room
export class Weapon extends Takable {
	damage: number
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

  use(player: Character, ennemy: Character) {
    
    player.attack(ennemy, this)
		ennemy.inventory
			.filter((obj) => obj.name === this.name)[0]
			.use(ennemy, null) // utilise le bouclier
		return `Le piège vous inflige ${this.damage} dégâts !`
	}
}
