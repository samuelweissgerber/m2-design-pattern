import React, { useRef } from "react";
import { Player, Room } from "../classes";

const Controllers = ({ roomInventory, player, nextRoom, setRoomIndex }: { roomInventory: any[], player: Player, nextRoom: Room, setRoomIndex: Function }): JSX.Element => {
  const inputRef = useRef(null)

  console.log(nextRoom.id);

  const testRiddle = ( obj, response) => {
    const go = obj.answer === response.target.value
    console.log(go)
    if(go){ 
      setRoomIndex()
      player.goTo(nextRoom)
    }
  }

  const interactBoolean = () => {
      setRoomIndex()
      player.goTo(nextRoom)
  }
  
  return (
    <>
      { roomInventory.map((obj: any, key: number) => (
        key!== 5 && <>
          {obj.inputType === "prompt" && 
            <>
              <p>{obj.question}</p>
              <input onChange={(e) => testRiddle(obj, e)} ref={inputRef}/>
            </>
          }
          {obj.inputType === "boolean" && (
            <>
            <p>{obj.description}</p>
              {obj.name === "Piège" && <p>{obj.name}</p>}
              <button onClick={interactBoolean}>{obj.name === "Shrok" ? "Affronter" : "Prendre"}</button> <button onClick={interactBoolean}>{obj.name === "shrok" ? "Fuire" : "Laisser et partir"}</button>
            </>
          )}
          {obj.inputType === "multiple" && (
            <>
              {obj?.choices.map((el: string) => (
                <button onClick={interactBoolean}>{el}</button>
              ))}
            </>
          )}
        </>
      ))}
      {nextRoom.id === 6 && <p> Fin du Jeu ma gaté</p>}
    </>
  );
};

export default Controllers;
