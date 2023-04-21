export const PlayerCard = ({ player, onClick, disabled }) => {
  return (
    <button className="flip-card" onClick={() => onClick(player.id)} disabled={disabled}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="character-container">
            <div className={"character character--" + player.name.toLowerCase()}></div>
          </div>
          <p className="title">{player.name}</p>
        </div>
        <div className="flip-card-back">
          <p className="title">{player.name}</p>
          <p>Points de vie: <span>{player.maxLP}</span></p>
          <p>Arme: <span>{player.inventory[0].name}</span></p>
        </div>
      </div>
    </button>
  )
}