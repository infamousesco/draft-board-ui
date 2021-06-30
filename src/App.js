
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';
import './App.css';



function App() {
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        
        fetch('http://localhost:5000/api/players')
            .then(response => response.json())
            .then(data => setPlayerData(data))
            .then(console.log(playerData))
    }, []);
    
  
    const playerCard = playerData.map((player, index) =>{
    return (
        <Draggable key={player.id} draggableId={player.position} index={index}>
            {(provided) => (
                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                     {player.firstName} {player.lastName}
                </li>
            )}
        </Draggable>
      
    )} 
     );
          
     
  return (
    <DragDropContext>
        <Droppable droppableId="players">
        {(provided) => (
            <div>
                <ul className="players" {...provided.droppableProps} ref={provided.innerRef} >{playerCard}</ul>
            </div>
        )}
       
        </Droppable>
    </DragDropContext>
  );
}

export default App;
