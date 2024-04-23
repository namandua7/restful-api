import React from 'react';

export default function KanbanBoard(props) {
  return (
    <div className="kanban-board" style={{ backgroundImage: `url(${props.backgroundImage})`, backgroundPosition: 'center', height: '94vh' }}>
    </div>
  );
}