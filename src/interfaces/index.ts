import { Monster, Player } from "../classes"

// Interface pour représenter un objet interactif dans le jeu
export interface IInteractiveObject {
  id: number
  name: string
  weight: number
  examine(): string 
  use(player: Player | Monster, object: IInteractiveObject | null): string
}

