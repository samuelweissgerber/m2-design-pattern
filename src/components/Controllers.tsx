import React, { Fragment, useEffect, useState } from "react"
import { Player } from "../classes"
import { getRoom } from "../helpers/index.ts"

const Controllers = ({
	players,
	endGame,
	getInventory,
}: {
	players: Player[]
	getInventory: Function
	endGame: Function
}): JSX.Element => {
	const [response, setResponse] = useState("")
	const [player, setPlayer] = useState({})
	const [room, setRoom] = useState(getRoom(0))

	room.addObjects(room.objects.map((el) => getInventory(el)))

	const testRiddle = (obj) => {
		if (obj.use(response)) {
			setRoom(getRoom(room.id + 1))
			//setRoomIndex()
		} else {
			player.setCurrentLP(player.currentLP - 10)
			if (player.currentLP <= 0) {
				endGame()
			}
		}
		setResponse("")
	}
	//console.log(player)

	const selectPlayer = (id) => {
		setRoom(getRoom(room.id + 1))
		room.addObjects(room.objects.map((el) => getInventory(el)))
		
		const player = players.find((el) => el.id === id)
		player?.goTo(room)
		setPlayer(player as Player)
	}

	/* const interactBoolean = () => {
		setRoomIndex()
	} */
	console.log(room)
	return (
		<>
			<p>{`Points de vie:  ${player.currentLP ?? 0}`}</p>
			<p>{room?.getDescription()}</p>

			{room.id === 0 && (
				<button onClick={() => setRoom(getRoom(room.id + 1))}>Démarrer</button>
			)}
			{room.id === 1 && (
				<p>
					{players.map((player, key) => (
						<button key={key} onClick={() => selectPlayer(player.id)}>
							{player.name}
						</button>
					))}
				</p>
			)}
			{room.objects.map((obj: any, key: number) => (
				<Fragment key={key}>
					{
						<>
							<p>{obj.question}</p>
							<input
								value={response}
								onKeyDown={(e) => (e.code === "Enter" ? testRiddle(obj) : null)}
								onChange={(e) => setResponse(e.target.value)}
							/>
							<button onClick={(e) => testRiddle(obj)}> Valider </button>
						</>
					}
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
				</Fragment>
			))}

			{/*  room de fin */}
			{room.id === 9 &&
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
