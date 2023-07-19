import Header from "./components/Header";
import styles from ".//App.css"
import { Tasks } from "./components/Tasks";
import { useState,useEffect } from 'react';
import { AddTask } from "./components/AddTask";
import { Footer } from "./components/Footer";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { About } from "./components/About";




function App() {
  
  const [addinput,setAddinput] = useState(false)
  const [tasks,setTasks] = useState([])

  useEffect(()=>{

    const getTasks = async()=>{

      const taskfromServer =  await fetchTask()
      setTasks(taskfromServer)
    }
  
  getTasks()
  },[])


  const fetchTask =async()=>{

    const res = await fetch(' http://localhost:5000/tasks')
    const data = await res.json()
    return data
}



  const deleteTask =(id)=>{
    fetch(`http://localhost:5000/tasks/${id}`,{
      method:'delete',
    })
    setTasks(tasks.filter((task)=>task.id!==id))
  }
  
  const toggleReminder = async(id)=>{
    
    const updatereminder = await fetchTaskbyid(id)

    const upstock = {...updatereminder,reminder:!updatereminder.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:"put",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(upstock)
    })
    const data = await res.json();
    setTasks(tasks.map(task=>task.id===id ?{...task ,reminder:data.reminder}:task))
  }



  const fetchTaskbyid =async(id)=>{

    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
}

const onAdd = async (newTask) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });
  const data = await res.json();
  setTasks([...tasks, data]);
};




  const addtask = ()=>{
    if(addinput){
      setAddinput(false)
      return
    }
    setAddinput(true)
  }




  return (
    <Router>
    <div className="container" style={{backgroundColor:'white'}}>
    {addinput ? <Header onClick={addtask} text='close' color='red' /> : <Header onClick={addtask} text='add' color='green' />}
    <Routes><Route
  path="/"
  element={
    addinput ? (
      <>
        <AddTask onAdd={onAdd} />
        {tasks.length > 0 ? (
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
        ) : (
          <h3>No tasks to show</h3>
        )}
      </>
    ) : tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
    ) : (
      <h3>No tasks to show</h3>
    )
  }
/>
<Route path="/about" element={<About />} />

   </Routes>

  
    
   
    
    <Footer/>
    </div>
    </Router>
    
  );
}

export default App;
