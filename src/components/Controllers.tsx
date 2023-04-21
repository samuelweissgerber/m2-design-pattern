import React, { useState, Fragment } from "react"
import { Player } from "../classes"
import { getRoom } from "../helpers/index.ts"
import { players } from "../helpers/data.ts"
import { Riddle } from "./Riddle"
import { Fight } from "./Fight"
import { PlayerCard } from "./PlayerCard"

const Controllers = (): JSX.Element => {
	const [LEVEL, setLEVEL] = useState(0)
	const [resolvedRiddle, setResolvedRiddle] = useState([]) // eslint-disable-line @typescript-eslint/no-unused-vars
	const [player, setPlayer] = useState({})
	const [typeCurrentRoom, setTypeCurrentRoom] = useState("Start")
	const [room, setRoom] = useState(getRoom(20))

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
						<button
							onClick={() => setLEVEL(10)}
							className="button"
							disabled={LEVEL === 10}>
							Facile
						</button>
						<button
							onClick={() => setLEVEL(15)}
							disabled={LEVEL === 15}
							className="button">
							Moyen
						</button>
						<button
							onClick={() => setLEVEL(18)}
							disabled={LEVEL === 18}
							className="button">
							Difficile
						</button>
						<button
							onClick={() => setLEVEL(20)}
							disabled={LEVEL === 20}
							className="button">
							Hardcore
						</button>
					</p>
					<p>Choisi ton joueur</p>
					<div className="flex">
						{players.map((player, key) => (
							<PlayerCard
								key={key}
								player={player}
								onClick={selectPlayer}
								disabled={LEVEL === 0}
							/>
						))}
					</div>
				</>
			)}
			{typeCurrentRoom === "Game" && (
				<>
					{room.objects.map((obj: any, key: number) => (
						<Fragment key={key}>
							<p>{room.getDescription()}</p>
							{obj.inputType === "prompt" && (
								<Riddle
									player={player}
									riddle={obj}
									LEVEL={LEVEL}
									setTypeCurrentRoom={setTypeCurrentRoom}
									setRoom={setRoom}
								/>
							)}
							{obj.inputType === "boolean" && (
								<Fight
									player={player}
									ennemy={obj}
									resolvedRiddle={resolvedRiddle}
									setTypeCurrentRoom={setTypeCurrentRoom}
									setRoom={setRoom}
								/>
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
