import React from "react";
import { Banner } from "./Component/Banner";
import TodoList from "./Component/TodoList";

export const TodoData = React.createContext()
function App() {
  
  const [todoDetails, setTodoDetails] = React.useState(JSON.parse(localStorage.getItem("Todos")) || [])
  
  const [leftItem , setLeftItem] = React.useState(todoDetails ? todoDetails.length : 0)
  
  const [activeBadge, setActiveBadge] = React.useState(0)
  const [theme,setTheme] = React.useState("dark")

  document.documentElement.className = `theme-${theme}`
  const handleTheme = (t)=>{
    setTheme(t)
  }

  const getAllTodo = ()=>{
    let arr = JSON.parse(localStorage.getItem("Todos"))
    setTodoDetails(arr)
    setActiveBadge(0)
  }

  const getCompletedTodo = ()=>{
    let arr = JSON.parse(localStorage.getItem("Todos"))
    if(arr){
      let newArr = []
      arr.map((a)=>{
        if(a.completed)
        {
          newArr.push(a)
        }
      })
      if(newArr.length > 0)
        setTodoDetails(newArr)
    }
    setActiveBadge(2)
  }
  React.useEffect(()=>{
    let arr = [...todoDetails]
    let count = 0;
    arr.map((a)=>{
      if(!a.completed)
      {
        count++;
      }
    })
    setLeftItem(count)
  },[todoDetails])
  const getActiveTodos = ()=>{
    let arr = JSON.parse(localStorage.getItem("Todos"))
    if(arr){
      let newArr = []
      arr.map((a)=>{
        if(!a.completed)
        {
          newArr.push(a)
        }
      })
      if(newArr.length > 0)
      setTodoDetails(newArr)

    }
    setActiveBadge(1)
  }

  const handleCompleteStatus = (id) => {
    console.log(id)
    let arr = [...todoDetails];
    let a = arr.find((l) => l.id === id)
    a.completed = !a.completed
    localStorage.setItem("Todos",JSON.stringify(arr))

    setTodoDetails(arr)
  }

  const handleDelete = (id) => {
    let  arr = [...todoDetails]
    let index = arr.findIndex(item => item.id === id)
    console.log(index)
    arr.splice(index,1)
    // console.log("After Deletion",arr)
    localStorage.setItem("Todos",JSON.stringify(arr))
    setTodoDetails(arr)
  }
  // console.log("TODODETAILS",todoDetails)
  const clearCompleted = ()=>{
    let arr = [...todoDetails]
    let newArr = []
    arr.map((a)=>{
      if(!a.completed)
      {
        newArr.push(a)
      }
    }) 
    
      localStorage.setItem("Todos",JSON.stringify(newArr))
      setTodoDetails(newArr)
    
  }
  return (
    <main className={`App `}>
      <div>
        <Banner 
          setTodoDetails={setTodoDetails}
          handleTheme = {handleTheme}
          todoDetails ={todoDetails}
          theme = {theme}
        />
        
        <TodoList 
          todoDetails={todoDetails}
          setTodoDetails = {setTodoDetails}
          handleCompleteStatus = {handleCompleteStatus}
          handleDelete = {handleDelete}
          leftItem={leftItem}
          getActiveTodos = {getActiveTodos}
          getCompletedTodo = {getCompletedTodo}
          getAllTodo = {getAllTodo}
          activeBadge = {activeBadge}
          clearCompleted ={clearCompleted}
        />
        </div>
    </main>
  );
}

export default App;
