import React, { useState } from 'react'
import { Room } from '../classes'

const Controllers = ({
  room,
  setRoomIndex,
  endGame
}: {
  room: Room
  setRoomIndex: Function
  endGame: Function
}): JSX.Element => {
  const [response, setResponse] = useState('')
  const [player, setPlayer] = useState({})

  const testRiddle = (obj: { answer: string }) => {
    if (response !== '') {
      const go = obj.answer === response
      if (go) {
        setRoomIndex()
      } else {
        player.setCurrentLP(player.currentLP - 10)
        if (player.currentLP <= 0) {
          endGame()
        } else {
          // Add shake class to heart container
          const heart_container = document.querySelector(
            '.lifepoint__container'
          )
          if (heart_container) {
            heart_container.classList.add('lifepoint__container--shake')
            setTimeout(() => {
              heart_container.classList.remove('lifepoint__container--shake')
            }, 1000)
          }
        }
      }
      setResponse('')
    }
  }

  const selectPlayer = (id: any) => {
    setPlayer(room.objects.find(el => el.id === id))
    setRoomIndex()
  }

  const interactBoolean = () => {
    setRoomIndex()
  }

  return (
    <>
      {room.id !== 0 && room.id !== 1 && room.id !== 9 && (
        <div className='lifepoint__container'>
          <div className='lifepoint__heart'>
            <p className='lifepoint__number'>{player.currentLP ?? 0}</p>
          </div>
        </div>
      )}

      <p>{room.getDescription()}</p>

      {room.id === 0 && (
        <button onClick={() => setRoomIndex()} className='button'>
          Démarrer
        </button>
      )}
      {room.id === 1 && (
        <p>
          {room.objects.map(player => (
            <>
              <button
                onClick={() => selectPlayer(player.id)}
                className='button'
              >
                {player.name}
              </button>
            </>
          ))}
        </p>
      )}
      {room.objects.map((obj: any, key: number) => (
        <>
          {obj.inputType === 'prompt' && (
            <>
              <p>{obj.question}</p>
              <input
                className='answer__input'
                placeholder='Réponse'
                value={response}
                onKeyDown={e => (e.code === 'Enter' ? testRiddle(obj) : null)}
                onChange={e => setResponse(e.target.value)}
              />
              <button
                disabled={response === '' ? true : false}
                onClick={e => {
                  testRiddle(obj)
                }}
                className='button'
              >
                {' '}
                Valider{' '}
              </button>
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

      {/* ENDING ROOM */}
      {room.id === 9 &&
        (player.currentLP <= 0 ? (
          <>
            <h1>ECHEC</h1>
            <div className='skull__container'>
              <div className='skull'></div>
            </div>
            <a href='/' className='button'>
              Rejouer
            </a>
          </>
        ) : (
          <>
            <p> Bravo champion</p>
            <a href='/' className='button'>
              Rejouer
            </a>
          </>
        ))}
    </>
  )
}

export default Controllers
