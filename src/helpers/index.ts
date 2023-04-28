//import Rooms from "../data/room.json"
import { Room } from "../classes/room.js"
import { rooms } from "./data.ts"


export const getRoom = (id: Number): Room | null => id >= 0 ? rooms.find(el => el.id === id) : rooms[0]
 
export const getRandomId = (ids: Number[], max): Number => {
  const pre = Math.floor(Math.random() * max)
   
  if (ids.length > max) {
    return -1
  }
  else  if (ids.includes(pre) ) {
    return getRandomId(ids, max)
  }
  else {
    return pre
  }
}

export const getRandomRoom = (ids: Number[], max): Room | undefined => getRoom(getRandomId(ids,max))

