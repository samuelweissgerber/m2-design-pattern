import React, { useState } from "react"
import { Room } from "../classes"

const Controllers = ({
	room,
	setRoomIndex,
	endGame,
}: {
	room: Room
	setRoomIndex: Function
	endGame: Function
}): JSX.Element => {
	const [response, setResponse] = useState("")
	const [player, setPlayer] = useState({})

	const testRiddle = (obj) => {
		const go = obj.answer === response
		if (go) {
			setRoomIndex()
		} else {
			player.setCurrentLP(player.currentLP - 10)
			if (player.currentLP <= 0) {
				endGame()
			}
		}
		setResponse("")
	}

	const selectPlayer = (id) => {
		setPlayer(room.objects.find((el) => el.id === id))
		setRoomIndex()
	}

	const interactBoolean = () => {
		setRoomIndex()
	}

	return (
		<>
			<p>{`Points de vie:  ${player.currentLP ?? 0}`}</p>
			<p>{room.getDescription()}</p>

			{room.id === 0 && (
				<button onClick={() => setRoomIndex()}> Démarrer </button>
			)}
			{room.id === 1 && (
				<p>
					{room.objects.map((player) => (
						<>
							<button onClick={() => selectPlayer(player.id)}>
								{player.name}
							</button>
						</>
					))}
				</p>
			)}
			{room.objects.map((obj: any, key: number) => (
				<>
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
