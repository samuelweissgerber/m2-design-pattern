//import Rooms from "../data/room.json"
//import { Room } from "../classes/room.ts"
import { data } from "./data.ts"

const { rooms } = data

export const getRoom = (id: Number) => rooms.find(el => el.id === id)
 