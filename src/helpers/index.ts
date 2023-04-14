import Rooms from "../data/room.json"
import { Room } from "../classes/room.ts"

export const getRoom = (id: Number) => {
  const room = Rooms.room.find(el => el.id === id)
  return new Room(
    room?.id,
    room?.name,
    room?.description,
    room?.objects,
  )
}