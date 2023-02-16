import React from 'react'
import TodoField from './TodoField'
import { nanoid } from 'nanoid'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable } from './StrictModeDroppable'
import { data } from '../data'
const TodoList = (props) => {


  

  const handleOnDragEnd = (result) => {
    // console.log("Result", result)
    const tasks = [...props.todoDetails]
    const [reorderItem] = tasks.splice(result.source.index, 1)

    // console.log("ReorderItem", reorderItem)
    tasks.splice(result.destination.index, 0, reorderItem);
    localStorage.setItem("Todos", JSON.stringify(tasks))
    props.setTodoDetails(tasks)

    // console.log(tasks)
  }

  const list = props.todoDetails.map((li, index) => {
    return (
      <Draggable key={li.id} draggableId={li.id} index={index}>
        {(provided) => (
          <TodoField
            todo={li.todo}
            id={li.id}
            prov={provided}
            completed={li.completed}
            handleCheck={props.handleCompleteStatus}
            handleCross={props.handleDelete}
            setTodoDetails={props.setTodoDetails}
          />
        )}
      </Draggable>
    )
  })

  return (
    <section className='todolist_section'>
     {list.length > 0 ? 
      <section className='todolist__container todo'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='todo'>
            {(provided) => (
              <ul className='todolist-div'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {
                  <>
                    {list}

                    <footer>
                      <span>{props.leftItem} items left</span>
                      <div className='badges'>
                        <button className={`${props.activeBadge === 0 ? "active-badge" : ""}`} onClick={() => props.getAllTodo()}>All</button>
                        <button className={`${props.activeBadge === 1 ? "active-badge" : ""}`} onClick={() => props.getActiveTodos()}>Active</button>
                        <button className={`${props.activeBadge === 2 ? "active-badge" : ""}`} onClick={() => props.getCompletedTodo()}>Completed</button>
                      </div>
                      <button onClick={()=>props.clearCompleted()}>Clear Completed</button>
                      {/* <button>Clear Completed</button> */}
                    </footer>

                  </>
                }
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <p>Drag and drop to reorder list</p>
      </section> 
      : 
      <h1 className='section_title'>
        Make Your TodoList Now
      </h1>
      }
    </section>
  )
}

export default TodoList