export const PlayerCard = ({ player, onClick, game }) => {
  return (
    <button
      className="player-card"
      onClick={() => onClick(player.id)}
      disabled={!game.difficulty}
    >
      <div className="player-card-inner">
        <div className="character-container">
          <div className={"character character--" + player.name.toLowerCase()}></div>
        </div>
        <p className="title">{player.name}</p>
        <p>
          Points de vie: <span>{player.maxLP}</span>
        </p>
        <p>
          Arme: <span>{player.inventory[0].name}</span>
        </p>
      </div>
    </button>
  );
};
