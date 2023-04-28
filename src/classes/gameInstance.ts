import { Player } from './player.ts'
import { getRoom } from '../helpers/index.ts'
import { Room } from './room.ts'
import { getInventory } from '../helpers/data.ts'
/**
 * Represents an instance of a level in a game, including its ID, rooms, tutorial status, and difficulty.
 */
export class GameInstance {
  public player: Player | null = null
  public pastRooms: number[] = []
  public difficulty: number
  public currentRoom: Room

  constructor (currentRoom: Room) {
    this.currentRoom = currentRoom
  }

  load () {
    const lastGame = JSON.parse(localStorage.getItem('game'))
    const room = new Room(
      lastGame.currentRoom.id,
      lastGame.currentRoom.name,
      lastGame.currentRoom.description,
      [...lastGame.currentRoom.objects.map(el => getInventory(el))]
    )
    const player = new Player(
      lastGame.player.id,
      lastGame.player.type,
      lastGame.player.name,
      room,
      lastGame.player.currentLP,
      lastGame.player.weight,
      [...lastGame.player.inventory.map(el => getInventory(el))]
    )
    this.currentRoom = room
    this.player = player
    this.pastRooms = lastGame.pastRooms
    this.difficulty = lastGame.difficulty
  }
}
