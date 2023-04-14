import React, { useState } from "react"
import { Player, Room } from "../classes"

const Controllers = ({
	players,
	room,
	nextRoom,
	setRoomIndex
}: {
	players: Player[]
	room: Room
	nextRoom: Room
	setRoomIndex: Function
}): JSX.Element => {
	const [response, setResponse] = useState("")
	const [player, setPlayer] = useState({})
	const [typeCurrentRoom, setTypeCurrentRoom] = useState('Start')

	const testRiddle = (obj) => {
		const go = obj.answer === response
		if (go) {
			if (nextRoom !== undefined) {
				setRoomIndex()
			} else {
				setTypeCurrentRoom('End')
			}
		} else {
			player.setCurrentLP(player.currentLP - 10)
			if (player.currentLP <= 0) {
				setTypeCurrentRoom('End')
			}
		}
		setResponse("")
	}

	const selectPlayer = (id) => {
		const p = players.find((el) => el.id === id)
		setPlayer(p as Player)
		setTypeCurrentRoom('Game')
	}

	const interactBoolean = () => {
		setRoomIndex()
	}
	
	return (
		<>
			<p>{`Points de vie:  ${player.currentLP ?? 0}`}</p>
			{typeCurrentRoom === 'Start' && (
				<>
					<p>Début de l'aventure</p>
					<p>Bienvenue dans ce jeu d'aventure ! Vous vous retrouvez plongé dans un monde mystérieux et dangereux, rempli d'énigmes à résoudre et de défis à relever. Votre mission est de découvrir tous les secrets de ce monde et devenir un héros légendaire.</p>
					<button onClick={() => setTypeCurrentRoom('Player')}> Démarrer </button>
				</>
			)}
			{typeCurrentRoom === 'Player' && (
				<>
					<p>Choisi ton joueur</p>
					<p>
						{players.map((player) => (
							<>
								<button onClick={() => selectPlayer(player.id)}>
									{player.name}
								</button>
							</>
						))}
					</p>
				</>
			)}
			{typeCurrentRoom === 'Game' && (
				<>
				{room.objects.map((obj: any, key: number) => (
				<>
					<p>{room.getDescription()}</p>
					{obj.inputType === "prompt" && (
						<>
							<p>{obj.question}</p>
							<input
								value={response}
								onKeyDown={(e) => (e.code === "Enter" ? testRiddle(obj) : null)}
								onChange={(e) => setResponse(e.target.value)}
							/>
							<button onClick={(e) => testRiddle(obj)}> Valider </button>
						</>
					)}
					{/* {obj.inputType === "boolean" && (
						<div>
							<p>{obj.description}</p>
							{obj.name === "Piège" && <p>{obj.name}</p>}
							<button onClick={interactBoolean}>Joueur 1</button>
							<button onClick={interactBoolean}>Joueur 2</button>
						</div>
					)} */}
					{/* {obj.inputType === "multiple" && (
						<>
							{obj?.choices.map((el: string) => (
								<button onClick={interactBoolean}>{el}</button>
							))}
						</>
					)} */}
				</>
				))}
				</>
			)}

			{/*  room de fin */}
			{typeCurrentRoom === 'End' &&
				(player.currentLP <= 0 ? (
					<>
						<p>T'es mort</p>
						<a href="/">Rejouer</a>
					</>
				) : (
					<>
						<p> Bravo champion</p>
						<a href="/">Rejouer</a>
					</>
				))}
		</>
	)
}

export default Controllers
