import React, { useState } from "react"
import { getRandomRoom } from "../helpers/index.ts"
import { rooms } from "../helpers/data.ts"
import { Fighting } from "./Fighting.js"

export const Fight = ({player, ennemy, resolvedRiddle,  setRoom, setTypeCurrentRoom}) => {
  const [fighting, setFighting] = useState("")

	const fight = (ennemy) => {
    const weapon = player.inventory[0]
    if (ennemy.currentLP > 0 && player.currentLP > 0) {
      setTimeout(() => fight(ennemy), 1000)
			setFighting(player.attack(ennemy, weapon))
    } else {
      if (player.currentLP < 0) {
        setTypeCurrentRoom("End")
      } else {setRoom(getRandomRoom(resolvedRiddle, rooms.length))}
    }
	}

  const talk = (ennemy) => {
    if (!!player.tryToTalk()) {
			setFighting(`${ennemy?.name} à accepté de discuter`)
			setTimeout(() => setRoom(getRandomRoom(resolvedRiddle, rooms.length)), 2000)
		} else {
			setFighting(`${ennemy?.name} à refuser de discuter`)
			setTimeout(() => fight(ennemy), 2000)	
		}
  }
  
  return (  
    <>
    <div className="lifepoint__container">
      <div className="lifepoint__heart">
        <p className="lifepoint__number">{player.currentLP ?? 0}</p>
      </div>
    </div>
      <p>{ennemy.description}</p>
      {fighting && <Fighting/>}
    {!fighting && <div>
      <button
        disabled={!!fighting}
        onClick={() => fight(ennemy)}
        className="button">
        Combattre
      </button>
      <button
        disabled={!!fighting}
        onClick={() => talk(ennemy)}
        className="button">
        Discuter
      </button>
    </div>}
    <p>{fighting}</p>
    </>
  )
}