
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';
import './App.css';



function App() {
    const [playerData, setPlayerData] = useState([]);
    //const [players, updatePlayers] = useState(playerData);

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(playerData);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setPlayerData(items);
    }

    useEffect(() => {
        
        fetch('http://localhost:5000/api/players')
            .then(response => response.json())
            .then(data => setPlayerData(data))
            .then(console.log(playerData))
    }, []);
    
  
    const playerCard = playerData.map((player, index) =>{
    return (
        <Draggable key={player.id} draggableId={JSON.stringify(player.id)} index={index}>
            {(provided) => (
                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                     {player.firstName} {player.lastName}
                </li>
            )}
        </Draggable>
      
    )} 
     );
          
     
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="players">
        {(provided) => (
            <div>
                <ul className="players" {...provided.droppableProps} ref={provided.innerRef} >{playerCard}
                    {provided.placeholder}
                </ul>
            </div>
        )}
       
        </Droppable>
    </DragDropContext>
  );
}

export default App;
