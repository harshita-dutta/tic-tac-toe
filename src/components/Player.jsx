import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName);

    function editHandler() {
        setIsEditing((editing) => !editing)
        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    }
    function changeHandler(event) {
        // console.log(event)
        setPlayerName(event.target.value) //two way binding
    }

    let editButtonVal = <span className="player-name">{playerName}</span>
    if (isEditing) {
        editButtonVal = <input type="text" required value={playerName} onChange={changeHandler}/>
    }

    return (
        <li className={isActive? 'active':undefined}>
            <span className="player">
                {editButtonVal}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={editHandler}>{isEditing?"Save":"Edit"}</button>
            
        </li>
    )
}