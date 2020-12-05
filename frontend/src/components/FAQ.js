import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const FAQ = () => {
  const initial = Array.from({ length: 5 }, (v, k) => k).map(k => {
    const custom = {
      id: `id-${k}`,
      content: `ITEM ${k}`
    };
  
    return custom;
  });

  console.log(initial)

  const [items, setItems] = useState(initial);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const onDragEnd = (result) => {
    console.log(`**********`)
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    console.log(`here`)

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  }

  return(
    <div>
      <h2>FAQ:</h2>
      <div>
        <h3>1. You can rearrange projects or tasks by dragging their names! Test Below:</h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, posIdx) => {
                  return(
                    <Draggable draggableId={item.id} index={posIdx} key={item.id}>
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{'margin-bottom': '.5rem', 'margin-left': '3rem'}}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default FAQ