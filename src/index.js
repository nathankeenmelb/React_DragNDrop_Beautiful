import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Column from "./column";
import styled from "styled-components";

const RootContainer = styled.div`
  display: flex;
`;

class InnerList extends React.PureComponent {
  render() {
    const { column, taskMap } = this.props;
    const tasks = column.taskIds.map(
      (taskId) => taskMap[taskId]
    );
    return <Column column={column} tasks={tasks} />;
  }
}

class App extends React.Component {
  state = initialData;

  onDragStart = (start) => {};
  onDragUpdate = (destination) => {};

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      //i.e. outside droppable area, so null
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      //the user drops the item into the same position as started
      return;
    }
    //reorder task list array
    const columnSource = this.state.columns[source.droppableId]; //e.g. this.state.columns["column-1"]
    const columnDest = this.state.columns[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const newTaskIds__columnSource = Array.from(columnSource.taskIds); //copy, to preserve original
      newTaskIds__columnSource.splice(source.index, 1); //remove one item from this index
      newTaskIds__columnSource.splice(destination.index, 0, draggableId); //remove nothing, add the draggableId

      const newColumn = {
        id: columnSource.id,
        title: columnSource.title,
        taskIds: newTaskIds__columnSource
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
    } else {
      const newTaskIds__columnSource = Array.from(columnSource.taskIds); //copy, to preserve original
      newTaskIds__columnSource.splice(source.index, 1); //remove one item from this index

      const newColumn = {
        id: columnSource.id,
        title: columnSource.title,
        taskIds: newTaskIds__columnSource
      };

      const newTaskIds__columnDest = Array.from(columnDest.taskIds);
      newTaskIds__columnDest.splice(destination.index, 0, draggableId); //remove nothing, add the draggableId

      const diffColumn = {
        id: columnDest.id,
        title: columnDest.title,
        taskIds: newTaskIds__columnDest
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
          [diffColumn.id]: diffColumn
        }
      };

      this.setState(newState);
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <RootContainer>
          {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            return (
              <InnerList
                key={column.id}
                column={column}
                taskMap={this.state.tasks}
              />
            );
          })}
        </RootContainer>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
