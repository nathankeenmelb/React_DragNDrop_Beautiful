const result = {
  // example from the dnd module
  draggableId: "task-1",
  type: "TYPE",
  reason: "DROP", //or cancel
  source: {
    //where the draggable started
    droppableId: "column-1",
    index: 0
  },
  destination: {
    //where the draggable finished, could be null
    droppableId: "column-1",
    index: 1
  }
};
