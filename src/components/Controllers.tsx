import React from "react";
import { Player, Room } from "../classes";

const Controllers = ({ room, roomInventory, player, nextRoom, setRoomIndex }: {room:Room, roomInventory: any[], player: Player, nextRoom: Room, setRoomIndex: Function }): JSX.Element => {
  
  const testRiddle = ( obj, response) => {
    const go = obj.answer === response.target.value
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
      <p>{room.getDescription()}</p>
      { roomInventory.map((obj: any, key: number) => (
        key!== 5 && <>
          {obj.inputType === "prompt" && 
            <>
              <p>{obj.question}</p>
              <input onChange={(e) => testRiddle(obj, e)}/>
            </>
          }
          {obj.inputType === "boolean" && (
            <div>
            <p>{obj.description}</p>
              {obj.name === "Piège" && <p>{obj.name}</p>}
              <button onClick={interactBoolean}>{obj.name === "Shrok" ? "Affronter" : "Prendre"}</button> <button onClick={interactBoolean}>{obj.name === "shrok" ? "Fuire" : "Laisser et partir"}</button>
            </div>
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
    </>
  );
};

export default Controllers;
