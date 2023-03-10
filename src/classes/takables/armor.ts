import { IInteractiveObject } from "../../interfaces"
import { Player } from "../player"
import { Takable } from "./takable"

export class Armor extends Takable {
	protection: number

	super(name: string = "Armure", protection: number) {
		this.name = name
		this.protection = protection
	}

	getProtection() {
		return this.protection
	}

	use(player: Player) {
		player.setProtection(this.protection)
		return `Le piège vous inflige ${this.protection} dégâts !`
	}
<<<<<<< HEAD
}
=======
}
>>>>>>> a9fb3d1 (fix: (#14) conflict problems)
