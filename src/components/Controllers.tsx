import React, { useState } from 'react'
import { Player } from '../classes'
import { getRoom } from '../helpers/index.ts'
import { data } from '../helpers/data.ts'

const Controllers = (): JSX.Element => {
  const { players, rooms } = data

  const [response, setResponse] = useState('')
  const [player, setPlayer] = useState({})
  const [typeCurrentRoom, setTypeCurrentRoom] = useState('Start')
  const [room, setRoom] = useState(getRoom(0))

  const testRiddle = obj => {
    if (response !== '') {
      if (obj.use(response)) {
        if (room.id === rooms.length - 1) {
          setTypeCurrentRoom('End')
        }
        setRoom(getRoom(room.id + 1))
      } else {
        player.setCurrentLP(player.currentLP - 10)
        if (player.currentLP <= 0) {
          setTypeCurrentRoom('End')
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

  const selectPlayer = id => {
    const p = players.find(el => el.id === id)
    setPlayer(p as Player)
    setTypeCurrentRoom('Game')
  }

  return (
    <>
      {typeCurrentRoom === 'Start' && (
        <>
          <p>Début de l'aventure</p>
          <p>
            Bienvenue dans ce jeu d'aventure ! Vous vous retrouvez plongé dans
            un monde mystérieux et dangereux, rempli d'énigmes à résoudre et de
            défis à relever. Votre mission est de découvrir tous les secrets de
            ce monde et devenir un héros légendaire.
          </p>
          <button
            onClick={() => setTypeCurrentRoom('Player')}
            className='button'
          >
            Démarrer
          </button>
        </>
      )}
      {typeCurrentRoom === 'Player' && (
        <>
          <p>Choisi ton joueur</p>
          <p>
            {players.map(player => (
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
        </>
      )}
      {typeCurrentRoom === 'Game' && (
        <>
          <div className='lifepoint__container'>
            <div className='lifepoint__heart'>
              <p className='lifepoint__number'>{player.currentLP ?? 0}</p>
            </div>
          </div>
          {room.objects.map((obj: any, key: number) => (
            <>
              <p>{room.getDescription()}</p>
              {obj.inputType === 'prompt' && (
                <>
                  <p>{obj.question}</p>
                  <input
                    className='answer__input'
                    placeholder='Réponse'
                    value={response}
                    onKeyDown={e =>
                      e.code === 'Enter' ? testRiddle(obj) : null
                    }
                    onChange={e => setResponse(e.target.value)}
                  />
                  <button
                    disabled={response === '' ? true : false}
                    onClick={e => {
                      testRiddle(obj)
                    }}
                    className='button'
                  >
                    Valider
                  </button>
                </>
              )}
            </>
          ))}
        </>
      )}

      {/*  room de fin */}
      {typeCurrentRoom === 'End' &&
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
