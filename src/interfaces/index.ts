import { Player } from "../classes"

// Interface pour représenter un objet interactif dans le jeu
export interface IInteractiveObject {
  name: string
  weight: number
  examine(): string 
  use(player: Player, object: IInteractiveObject | null): string
}

