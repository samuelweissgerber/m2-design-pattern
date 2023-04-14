import React, { useState, useEffect, Fragment } from "react"
import { Player } from "../classes"
import { getRoom } from "../helpers/index.ts"
import { data } from "../helpers/data.ts"

const Controllers = (): JSX.Element => {
	const { players, rooms } = data
	const [LEVEL, setLEVEL] = useState(0)
	const [resolvedRiddle, setResolvedRiddle] = useState([])
	const [timeLeft, setTimeLeft] = useState(0)

	const [response, setResponse] = useState("")
	const [player, setPlayer] = useState({})
	const [typeCurrentRoom, setTypeCurrentRoom] = useState("Start")
	const [room, setRoom] = useState(getRoom(0))

	const getRandomId = (): Number | undefined => {
		const pre = Math.floor(Math.random() * rooms.length)
		if (resolvedRiddle.includes(pre)) {
			getRandomId()
		} else {
			return pre
		}
	}

	useEffect(() => {
		if (timeLeft <= 0 && typeCurrentRoom === "Game" && LEVEL === 20) {
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
	}, [timeLeft])

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`
	}

	//console.log(room)

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
						<button onClick={() => setLEVEL(18)} className="button">
							Difficile
						</button>
						<button
							onClick={() => {
								setLEVEL(20)
								setTimeLeft(180)
							}}
							className="button">
							Hardcore
						</button>
					</p>
					<p>Choisi ton joueur</p>
					<p>
						{players.map((player, key) => (
							<button
								key={key}
								onClick={() => selectPlayer(player.id)}
								className="button"
								disabled={LEVEL === 0}>
								{player.name}
							</button>
						))}
					</p>
				</>
			)}
			{typeCurrentRoom === "Game" && (
				<>
					{LEVEL === 20 && <h1>Time Left: {formatTime(timeLeft)}</h1>}
					<div className="lifepoint__container">
						<div className="lifepoint__heart">
							<p className="lifepoint__number">{player.currentLP ?? 0}</p>
						</div>
					</div>
					{room.objects.map((obj: any, key: number) => (
						<Fragment key={key}>
							<p>{room.getDescription()}</p>
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
						</Fragment>
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
