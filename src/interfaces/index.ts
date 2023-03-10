import { Character } from "../classes"

export enum InputType {
	Prompt = "prompt",
	Boolean = "boolean",
	Multiple = "multiple",
}

// Interface pour représenter un objet interactif dans le jeu
export interface IInteractiveObject {
<<<<<<< HEAD
	id: number
=======
  id: number
>>>>>>> a9fb3d1 (fix: (#14) conflict problems)
	name: string
	weight: number
	examine(): string
	use(ennemy: Character, object: IInteractiveObject | null): string
}
