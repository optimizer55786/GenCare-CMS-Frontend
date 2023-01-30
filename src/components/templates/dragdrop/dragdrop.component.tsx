import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { Flipper, Flipped } from "react-flip-toolkit";
// import * as _ from "lodash";
import { ReactNode } from "react";

// const grid = 25;

// const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
//     background: isDraggingOver ? "lightblue" : "lightgrey",
//     padding: grid,
//     width: 250
// });

// const getItemStyle = (
//     isDragging: boolean,
//     draggableStyle: DraggingStyle | NotDraggingStyle | undefined
// ): React.CSSProperties => ({
//     userSelect: "none",
//     margin: `${grid}px 0 ${grid}px 0`,
//     background: isDragging ? "lightgreen" : "white",
//     ...draggableStyle
// });

interface Props {
  onDragEnd: (result: any) => void;
  getListStyle: (isDraggingOver: boolean) => React.CSSProperties;
  filteredState?: Array<any>;
  spring?: any;
  getItemStyle: (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
  ) => React.CSSProperties;
  children: ReactNode[];
  grid?: number;
}

const DragDropComponent = ({
  onDragEnd,
  getListStyle,
  filteredState,
  spring,
  getItemStyle,
  children,
}: Props) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot): JSX.Element => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <Flipper
              flipKey={filteredState?.map((item) => item.id).join("")}
              spring={spring}
            >
              {filteredState?.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot): JSX.Element => (
                    <Flipped key={item.id} flipId={item.id}>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {children[index]}
                      </div>
                    </Flipped>
                  )}
                </Draggable>
              ))}
            </Flipper>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropComponent;
