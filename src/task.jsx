import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${function (props) {
    return props.isDragging ? "lightgreen" : "white";
  }};
  transition: background-color 0.1s ease;
`;

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(
          provided,
          snapshot //snapshot for styling
        ) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps} //this makes the <Container /> component have the 'handle'. We could have put this on a smaller part of the task div.
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
