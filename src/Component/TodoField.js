import React from 'react'
import cross from '../assets/images/icon-cross.svg'
import check from '../assets/images/icon-check.svg'

import { nanoid } from 'nanoid'
const TodoField = (props) => {
    // console.log("PROPS",props)
    const[text , setText] = React.useState("")

    const handleChange = (e)=>{
        // console.log("VALUE",e.target.value)
        setText(e.target.value)
    }

    const handleOnKeyPress = (e)=>{
        // console.log("Key",text)
        if(e.key === "Enter"){
            if(text !== ''){
            let obj = {
                completed : false,
                todo: text,
                id: nanoid()
            }
            let arr = [...props.todoDetails]
            arr.push(obj)
            localStorage.setItem("Todos",JSON.stringify(arr));
            props.setTodoDetails(arr)
            setText("")
            }
        }
    }



    // {console.log(props.prov)}
    return (
    <li className='todo-field' 
    // id={props.id}
    ref={props.prov?.innerRef}
    {...props.prov?.draggableProps}
    {...props.prov?.dragHandleProps}
    >
        <div className='todo'>
        <div className={`check-btn ${props.completed ? "check-active" : "check"}`} onClick={()=>props.handleCheck(props.id)} >
            <img src={check} alt="check icon"/>
        </div>
        {/* input props is for placeholder */}
        <input 
            type="text" 
            disabled={props.input ? false : true}
            placeholder="Create a new todo..." 
            value={props.todo || text}
            className={`${props.completed && !props.input ? "task-done" : "task"}`}
            onChange={handleChange}
            onKeyDown={handleOnKeyPress}
            />
        </div>
        {   
            !props.input&& 
            <img src={cross} alt="cross icon to delete a todo" className='cross-img' onClick={()=>props.handleCross(props.id)}/>
        }
    </li>
  )
}

export default TodoField