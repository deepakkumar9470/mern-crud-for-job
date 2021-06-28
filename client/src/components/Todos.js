import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Preloader from './Preloader'

const Todos = () => {

    const [todo, setTodo] = useState({name : "", desc : ""})
    const [todos, setTodos] = useState(null)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [currentId, setCurrentId] = useState(0)
    

    // Get todos
    const resData = async () =>{
        const data = await axios.get('https://mern-crud-web-app.herokuapp.com/todo')
        console.log(data)
        setTodos(data.data)
    }

     useEffect(()=>{
          let currentTodo = currentId!=0?todo.find(todo=>todo._id === currentId) : 
          {name : "", desc : ""}
          setTodos(currentTodo)
     },[currentId]) 

    useEffect(() =>{
          resData();  
    },[]); 

   // Create todos (post) 
    const formSubmit = async (e) =>{
        e.preventDefault()
        const datares = await axios.post('https://mern-crud-web-app.herokuapp.com/todo',{
            name, desc
        })
        setName('')
        setDesc('')
    };


    // edit todos
    const updateHandler = async (id) =>{
         const newtodo =  {name, desc}
         const datares = await axios.put(`https://mern-crud-web-app.herokuapp.com/todo/${id}`,newtodo)
        
    };

     // delet todos
     const deleteHandler = async (id) =>{
        await axios.delete(`https://mern-crud-web-app.herokuapp.com/todo/${id}`)
        const todosCopy  = [...todo];
        todosCopy.filter((item) => item._id !== id)
        setTodo(todosCopy)
        
    };


    return (
        <div>
            <div className="row">
                
             <form className="col s12" onSubmit={formSubmit}>
                <div className="row">
                    <div className="input-field col s6">
                    <i className="material-icons prefix">title</i>
                    <label htmlFor="icon_name">Name</label>
                    <input 
                        id="icon_name" 
                        type="text" 
                        className="validate" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}/>
                    </div>

                    <div className="input-field col s6">
                    <i className="material-icons prefix">description</i>
                    <label htmlFor="icon_descriptione">Description</label>
                     <input 
                        id="icon_description" 
                        type="text" 
                        className="validate"
                        value={desc}
                        onChange={(e)=>setDesc(e.target.value)}/>

                    </div>
                </div>
                <div className="row right-align">
                <button className="waves-effect waves-light btn-small" type="submit">Submit</button>
                </div>
           </form>
                {
                    !todos ? (<Preloader/>) : todos.length > 0 ?
                    ( <ul className="collection">
                        {
                            todos.map((todo) => {
                                return (
                                    <div key={todo._id}>
                                        <li className="collection-item"
                                          onClick={()=>updateHandler(todo._id)}>
                                            <div>
                                              <h5>{todo.name}</h5>
                                               
                                               <p>{todo.desc} 
                                               <a
                                                href="!href"
                                                className="secondary-content"
                                                onClick={()=>deleteHandler(todo._id)}>
                                               <i className="material-icons prefix">delete</i></a></p>
                                               
                                            </div>
                                        </li>
                                      
                                      
                                    </div>
                                )
                            })
                        }
                       
                      </ul>
                      
                      ) : (
                    <p>No todos found...</p>
                )
                }
           

               
         </div>
        </div>
    )
}

export default Todos
