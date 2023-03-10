import React from "react";
import { Room } from "../classes";

const Controllers = ({ currentRoom }: { currentRoom: Room }): JSX.Element => {
  return (
    <>
      {currentRoom.objects.map((obj: any, key: number) => (
        <>
          {obj.inputType === "prompt" && <input />}
          {obj.inputType === "boolean" && (
            <>
              <button>Oui</button> <button>Non</button>
            </>
          )}
          {obj.inputType === "multiple" && (
            <>
              {obj?.choices.map((el: string) => (
                <button>{el}</button>
              ))}
            </>
          )}
        </>
      ))}
      <p>yessssssss</p>
    </>
  );
};

export default Controllers;
