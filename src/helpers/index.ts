//import Rooms from "../data/room.json"
import { Room } from "../classes/room.js"
import { rooms } from "./data.ts"


export const getRoom = (id: Number): Room | undefined => rooms.find(el => el.id === id)
 
export const getRandomId = (ids: Number[], max): Number => {
  const pre = Math.floor(Math.random() * max)
  if (ids.includes(pre)) {
    getRandomId(ids, max)
  } else {
    return pre
  }
}

export const getRandomRoom = (ids: Number[], max): Room | undefined => getRoom(getRandomId(ids,max))
