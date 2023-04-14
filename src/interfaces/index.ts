export enum InputType {
	Prompt = "prompt",
	Boolean = "boolean",
	Multiple = "multiple",
}

// Interface pour représenter un objet interactif dans le jeu
export interface IInteractiveObject {
	id: number
	name: string
	weight: number
	examine(): string
	use(object: any): any
}
