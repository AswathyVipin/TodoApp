import React, { Component } from "react";
import "./TodoApp.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';




export class TodoApp extends Component {
    state = {
        input: "",
        items: [],
        //datas:datas
    };



    handleChange = event => {
        this.setState({
            input: event.target.value
        });

    };

    storeItems = event => {
        event.preventDefault();
        const { input } = this.state;


        this.setState({
            items: [...this.state.items, input],  //spread operater
            input: ""
        });
    };

    deleteItem = key => {

        this.setState({
            items: this.state.items.filter((data, index) => index !== key)
        })
    }

    handleOnDragEnd = result => {
        const { destination, source, reason } = result;

        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const items=Object.assign([],this.state.items);
        const droppedUser = this.state.items[source.index];

        items.splice(source.index,1);
        items.splice(destination.index,0,droppedUser);

        this.setState({
            items
        })


    }

    render() {
        const { input, items } = this.state;

        return (

            <div className="Todo-container">

                <form className="input-section" onSubmit={this.storeItems}>
                    <h1>Todo App</h1>
                    <input type="text"
                        value={input}
                        onChange={this.handleChange}
                        placeholder="Enter items..." />

                </form>

                <DragDropContext onDragEnd={this.handleOnDragEnd}>
                    <Droppable droppableId="characters">
                        {(provided) => (
                            <ul className="characters"{...provided.DroppableProps} ref={provided.innerRef}>
                                {items.map((data, index) => (
                                    <Draggable key={data} draggableId={data} index={index}>
                                        {(provided) => (
                                            <li key={index}{...provided.draggableProps}{...provided.dragHandleProps} ref={provided.innerRef}>
                                                {data} <i className="fa fa-trash" onClick={() => this.deleteItem(index)}></i></li>
                                        )}
                                    </Draggable>
                                ))}

                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>

            </div>
        )
    }

}

export default TodoApp;