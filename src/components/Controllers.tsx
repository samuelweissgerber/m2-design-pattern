import React, { useState, Fragment, useEffect } from 'react'
import { GameInstance } from '../classes/gameInstance.ts'
import { getRoom } from '../helpers/index.ts'
import { getInventory, players } from '../helpers/data.ts'
import { Riddle } from './Riddle.tsx'
import { Fight } from './Fight'
import { PlayerCard } from './PlayerCard'
import { Player } from '../classes/player.ts'
import { Room } from '../classes/room.ts'

const Controllers = (): JSX.Element => {
  const [typeCurrentRoom, setTypeCurrentRoom] = useState('Start')
  const [game, setGame] = useState(new GameInstance(getRoom(20)))

  const selectPlayer = id => {
    const p = players.find(el => el.id === id)
    setGame({ ...game, player: p })
    setTypeCurrentRoom('Game')
  }

  useEffect(() => {
    if (game.currentRoom.id != 20) {
      localStorage.setItem('game', JSON.stringify(game))
    }
  }, [game, setGame])

  return (
    <>
      {typeCurrentRoom === 'Start' && (
        <>
          <p>Une nouvelle partie est disponible. Voulez vous continuer ?</p>
          <button
            onClick={() => {
              game.load()
              setGame(game)
              setTypeCurrentRoom('Game')
            }}
            className='button'
          >
            Oui
          </button>
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
          <p>Choisir la difficulté</p>
          <div
            className={`input__radio-container ${
              !!game.difficulty ? 'levelSelected' : ''
            }`}
          >
            <label
              className={`input__radio ${
                game.difficulty === 10 ? 'selected' : ''
              }`}
            >
              <input
                name='level'
                type='radio'
                value='10'
                onChange={e =>
                  setGame({ ...game, difficulty: Number(e.target.value) })
                }
              />
              <div className='input__radio-inner'>
                <span className='name'>FACILE</span>
                <span className='desc'>10 énigmes</span>
              </div>
            </label>
            <label
              className={`input__radio ${
                game.difficulty === 15 ? 'selected' : ''
              }`}
            >
              <input
                name='level'
                type='radio'
                value='15'
                onChange={e =>
                  setGame({ ...game, difficulty: Number(e.target.value) })
                }
              />
              <div className='input__radio-inner'>
                <span className='name'>MOYENNE</span>
                <span className='desc'>15 énigmes</span>
              </div>
            </label>
            <label
              className={`input__radio ${
                game.difficulty === 18 ? 'selected' : ''
              }`}
            >
              <input
                name='level'
                type='radio'
                value='18'
                onChange={e =>
                  setGame({ ...game, difficulty: Number(e.target.value) })
                }
              />
              <div className='input__radio-inner'>
                <span className='name'>DIFFICILE</span>
                <span className='desc'>18 énigmes</span>
              </div>
            </label>
            <label
              className={`input__radio ${
                game.difficulty === 20 ? 'selected' : ''
              }`}
            >
              <input
                name='level'
                type='radio'
                value='20'
                onChange={e =>
                  setGame({ ...game, difficulty: Number(e.target.value) })
                }
              />
              <div className='input__radio-inner'>
                <span className='name'>HARDCORE</span>
                <span className='desc'>20 énigmes + Timer</span>
              </div>
            </label>
          </div>

          <p>Choisi ton joueur</p>
          <div className='flex'>
            {players.map((player, key) => (
              <PlayerCard
                key={key}
                player={player}
                onClick={selectPlayer}
                game={game}
              />
            ))}
          </div>
        </>
      )}
      {typeCurrentRoom === 'Game' && (
        <>
          {game.currentRoom.objects.map((obj: any, key: number) => (
            <Fragment key={key}>
              <p>{game.currentRoom.description}</p>
              {obj.inputType === 'prompt' && (
                <Riddle
                  game={game}
                  riddle={obj}
                  setGame={setGame}
                  setTypeCurrentRoom={setTypeCurrentRoom}
                />
              )}
              {obj.inputType === 'boolean' && (
                <Fight
                  game={game}
                  ennemy={obj}
                  setGame={setGame}
                  setTypeCurrentRoom={setTypeCurrentRoom}
                />
              )}
            </Fragment>
          ))}
        </>
      )}

      {/*  room de fin */}
      {typeCurrentRoom === 'End' &&
        (game.player.currentLP <= 0 ? (
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
