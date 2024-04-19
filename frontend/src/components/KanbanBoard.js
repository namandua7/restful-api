import React from 'react';

export default function KanbanBoard(props) {
  return (
    <div className="kanban-board" style={{ backgroundImage: `url(${props.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <p className={`text-light text-center`}>Kanban Board</p>
    </div>
  );
}