import { Character } from "."
import { IInteractiveObject } from "../interfaces"
import { Weapon } from "./takables/weapon"

// Sample monster for the first room
export class Monster extends Character {
	description: string

	super(
		name: string,
		description: string,
		LP: number,
		weight: number = 0,
		inventory: IInteractiveObject[] = [],
	) {
		this.name = name
		this.description = description
		this.inventory = inventory
		this.currentLP = LP
		this.maxLP = LP
	}

	examine() {
		return `Id :  ${this.id} \n Name : ${this.name} : \n Description : ${this.description} \n Inventory: ${this.inventory} \n Current life points ${this.currentLP} \n Maximum life points ${this.maxLP} !`
	}
}
