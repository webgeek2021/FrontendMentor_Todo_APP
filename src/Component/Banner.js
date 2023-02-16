import React from 'react'
import moon_icon from "../assets/images/icon-moon.svg"
import sun_icon from "../assets/images/icon-sun.svg"

import TodoField from './TodoField'

export const Banner = (props) => {
  
  return (
    <section className='banner__section'>
        <div className='banner__container'>
            <div className='banner__title'>
                    <h1>TODO</h1>
                    {
                        props.theme === "light" ? 
                        <img src={moon_icon} alt="icon of moon for dark mode " onClick={()=>props.handleTheme("dark")}/>
                        :
                        <img src={sun_icon} alt="icon of sun for light mode" onClick={()=>props.handleTheme("light")}/>
                    }
            </div>
            <TodoField                
                input= {true}
                setTodoDetails={props.setTodoDetails}
                todoDetails = {props.todoDetails}
            />
       </div>
    </section>    
  )
}
