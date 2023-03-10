import { Player } from "../player.ts"
import { Takable } from "./takable.ts"

export class Armor extends Takable {
	name: string
	protection: number

	constructor(
		id: number,
		name: string = "Arme",
		description: string,
		weight: number = 0,
		protection: number) {
		super(id,
			name,
			description,
			weight)
		this.protection = protection
	}

	getProtection() {
		return this.protection
	}

	use(player: Player) {
		player.setProtection(this.protection)
		return `Le piège vous inflige ${this.protection} dégâts !`
	}
}
