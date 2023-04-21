import React, { useEffect, useState } from "react"
import { getRandomRoom } from "../helpers/index.ts"
import { rooms } from "../helpers/data.ts"

export const Riddle = ({player, riddle, setTypeCurrentRoom, LEVEL, setRoom}) => {
  const [response, setResponse] = useState("")
	const [resolvedRiddle, setResolvedRiddle] = useState([])
	const [timeLeft, setTimeLeft] = useState(LEVEL === 20 ? 180 : 0)
  
	useEffect(() => {
		if (timeLeft <= 0 && LEVEL === 20) {
			player.setCurrentLP(0)
			setTypeCurrentRoom("End")
			return
		}
		// `setInterval` pour exécuter une fonction qui diminue le temps restant de 1 chaque seconde
		const interval = setInterval(() => {
			setTimeLeft(timeLeft - 1)
		}, 1000)

		// `clearInterval` pour nettoyer l'intervalle
		// Lorsqu'on met un return dans un useEffect le return est exécuté lorsque le composant est démonté
    return () => clearInterval(interval)
	}, [timeLeft]) // eslint-disable-line react-hooks/exhaustive-deps

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`
  }
  
  const testRiddle = (riddle) => {
		if (riddle.use(response)) {
			if (riddle.isFirstAnswer) {
				player.setCurrentLP(player.currentLP + 5)
			}
			if (resolvedRiddle.length === LEVEL) {
				setTypeCurrentRoom("End")
			}
			setRoom(getRandomRoom(resolvedRiddle, rooms.length))
			setResolvedRiddle([...resolvedRiddle, riddle.id])
			setTimeLeft(180)
		} else {
			player.setCurrentLP(player.currentLP - 10)
			if (player.currentLP <= 0) {
				setTypeCurrentRoom("End")
			}
		}
		setResponse("")
	}
  return (  
    <>
      {LEVEL === 20 && <h1 className="time-left">Time Left: {formatTime(timeLeft)}</h1>}
      <div className="lifepoint__container">
        <div className="lifepoint__heart">
          <p className="lifepoint__number">{player.currentLP ?? 0}</p>
        </div>
      </div>
      <p>{riddle.question}</p>
      <input
        className="answer__input"
        placeholder="Réponse"
        value={response}
        onKeyDown={(e) =>
          e.code === "Enter" ? testRiddle(riddle) : null
        }
        onChange={(e) => setResponse(e.target.value)}
      />
      <button
        disabled={!response}
        onClick={() => testRiddle(riddle)}
        className="button">
        Valider
      </button>
    </>
  )
}