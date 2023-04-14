import React, { useState, useEffect } from "react"
import { Player } from "../classes"
import { getRoom } from "../helpers/index.ts"
import { data } from "../helpers/data.ts"

const Controllers = (): JSX.Element => {
	const { players, rooms } = data
	const [LEVEL, setLEVEL] = useState(0)
	const [resolvedRiddle, setResolvedRiddle] = useState([])

	const [response, setResponse] = useState("")
	const [player, setPlayer] = useState({})
	const [typeCurrentRoom, setTypeCurrentRoom] = useState("Start")
	const [room, setRoom] = useState(getRoom(0))
	const [time, setTime] = useState(180)

	const getRandomId = (): Number | undefined => {
		const pre = Math.floor(Math.random() * rooms.length)
		if (resolvedRiddle.includes(pre)) {
			getRandomId()
		} else {
			return pre
		}
	}

	const testRiddle = (obj) => {
		if (obj.use(response)) {
			if (resolvedRiddle.length === LEVEL) {
				setTypeCurrentRoom("End")
			}
			setRoom(getRoom(getRandomId()))
			setResolvedRiddle([...resolvedRiddle, obj.id])
		} else {
			player.setCurrentLP(player.currentLP - 10)
			if (player.currentLP <= 0) {
				setTypeCurrentRoom("End")
			}
		}
		setResponse("")
	}

	const selectPlayer = (id) => {
		const p = players.find((el) => el.id === id)
		setPlayer(p as Player)
		setTypeCurrentRoom("Game")
	}

	const launchTimer = () => {
		
		setTimeout(() => {
			// Infinite loop => explain the error please Ramus
			setTime((time) => time--)
		}, 1000)
		console.log(time)
		time !== 0 ? launchTimer() : console.log("End")
	}

	useEffect (() => {
		if (typeCurrentRoom === "Game") {
			console.log("current room game")
			launchTimer()		
		}
	}, [typeCurrentRoom])


	return (
		<>
			{typeCurrentRoom === "Start" && (
				<>
					<p>Début de l'aventure</p>
					<p>
						Bienvenue dans ce jeu d'aventure ! Vous vous retrouvez plongé dans
						un monde mystérieux et dangereux, rempli d'énigmes à résoudre et de
						défis à relever. Votre mission est de découvrir tous les secrets de
						ce monde et devenir un héros légendaire.
					</p>
					<button
						onClick={() => setTypeCurrentRoom("Player")}
						className="button">
						Démarrer
					</button>
				</>
			)}
			{typeCurrentRoom === "Player" && (
				<>
					<p>Difficulté</p>
					<p>
						<button onClick={() => setLEVEL(10)} className="button">
							Facile
						</button>
						<button onClick={() => setLEVEL(15)} className="button">
							Moyen
						</button>
						<button onClick={() => setLEVEL(20)} className="button">
							Difficile
						</button>
						<button onClick={() => {
								setLEVEL(20)
								setTime(180)
							}	
						} className="button">
							Hardcore
						</button>
					</p>
					<p>Choisi ton joueur</p>
					<p>
						{players.map((player) => (
							<>
								<button
									onClick={() => selectPlayer(player.id)}
									className="button"
									disabled={LEVEL === 0}>
									{player.name}
								</button>
							</>
						))}
					</p>
				</>
			)}
			{typeCurrentRoom === "Game" && (
				<>
					<div className="lifepoint__container">
						<div className="lifepoint__heart">
							<p className="lifepoint__number">{player.currentLP ?? 0}</p>
						</div>
					</div>
					{room.objects.map((obj: any, key: number) => (
						<>
							<p>{room.getDescription()}</p>
							<p>{time}</p>
							{obj.inputType === "prompt" && (
								<>
									<p>{obj.question}</p>
									<input
										className="answer__input"
										placeholder="Réponse"
										value={response}
										onKeyDown={(e) =>
											e.code === "Enter" ? testRiddle(obj) : null
										}
										onChange={(e) => setResponse(e.target.value)}
									/>
									<button
										disabled={response === "" ? true : false}
										onClick={(e) => {
											testRiddle(obj)
										}}
										className="button">
										Valider
									</button>
								</>
							)}
						</>
					))}
				</>
			)}

			{/*  room de fin */}
			{typeCurrentRoom === "End" &&
				(player.currentLP <= 0 ? (
					<>
						<h1>ECHEC</h1>
						<div className="skull__container">
							<div className="skull"></div>
						</div>
						<a href="/" className="button">
							Rejouer
						</a>
					</>
				) : (
					<>
						<p> Bravo champion</p>
						<a href="/" className="button">
							Rejouer
						</a>
					</>
				))}
		</>
	)
}

export default Controllers
