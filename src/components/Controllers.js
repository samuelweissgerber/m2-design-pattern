import { InputType } from "../interfaces"

export const Controllers = (currentRoom) => {
  return <>
    {
      currentRoom.inventaire.map((obj, key) => {
        { obj.inputType === "prompt" && <input></input> }
        { obj.inputType === "boolean" && <><button>Oui</button> <button>Non</button></> }
        {
          obj.inputType === "multiple" &&
            <> {obj?.choices.map(el => <button>{ el }</button>)} </>
        }
      })
    }
  </>
}