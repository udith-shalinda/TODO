import { useState } from "react"
import { todoItem } from "../pages";

export const OneTODO = ( props : {index: number, todo: todoItem, edit: Function, delete: Function, updateCompleteTodo: Function}) => {
    const [isEditable, setisEditable] = useState(false);
    const [todo, settodo] = useState(props.todo.name);

    const editTodo = (newTodo: string) => {
        props.edit(newTodo, props.index);
        setisEditable(false);
    }
    return (
        <div>
        {
            isEditable? 
            (
            <form onSubmit={(e) => {editTodo(e.target.todo.value)}}>
                <input type="checkbox" id="vehicle1" name="vehicle1" onChange={()=> props.updateCompleteTodo(props.index)} ></input>
                <input id="todo" type="text" autoComplete="todo" value={todo} onChange={(e) => {settodo(e.target.value)}} required className='p-2 border-gray-50 border-2 rounded-md'/>
                <button type="submit" className='bg-yellow-400 rounded-md p-2'>Edit</button>
            </form>
            ) : 
            (
            <div className='flex  flex-row my-2'>
                <input type="checkbox" id="vehicle1" name="vehicle1" onChange={()=> props.updateCompleteTodo(props.index)} ></input>
                <h2 className="text font-bold mx-2">
                  {props.todo.name}
                </h2>
                <button className='bg-yellow-400 rounded-md p-2 mx-2' onClick={()=> setisEditable(true)}>Edit</button>
                <button className='bg-red-400 rounded-md p-2 mx-2' onClick={()=> props.delete(props.todo.id)}>Delete</button>
            </div>
            )
        }
        
        </div>
    )
}