import { useState } from "react"
import { todoItem } from "../pages";
import { deleteTODO, updateTODO } from "../services/todo.service";

export const OneTODO = ( props : {index: number, todo: todoItem, edit: Function, delete: Function, updateCompleteTodo: Function}) => {
    const [isEditable, setisEditable] = useState(false);
    const [todo, settodo] = useState(props.todo.name);

    const editTodo = async (e: any) => {
        e.preventDefault();
        if(todo !== props.todo.name){
            try {
                const res = await updateTODO(props.todo.id, todo, props.todo.completed);
                console.log(res);
                if(res.modifiedCount > 0){
                    props.edit(todo, props.index);
                    settodo('');
                }else{
                    console.log('update failed');
                }
                setisEditable(false);
            } catch (error) {
                console.log(error);
            }
        }else{
            setisEditable(false);
        }  
    }
    const changeCompleteState = async () => {
        try {
            const res = await updateTODO(props.todo.id, todo, !props.todo.completed);
            console.log(res);
            if(res.modifiedCount > 0){
                props.updateCompleteTodo(props.index);
            }else{
                console.log('update failed');
            }
        } catch (error) {
            console.log(error);
        }
    }
    const deleteFunction = async () => {
        try {
            const data: any = await deleteTODO(props.todo.id);
            if(data.deletedCount === 1){
                props.delete(props.todo.id)
            }else {
                console.log('delete todo failed');
            }
        } catch (error) {
            console.log('delete todo failed', error);
        }
    }
    return (
        <div>
        {
            isEditable? 
            (
            <form onSubmit={(e) => {editTodo(e)}}>
                <input type="checkbox" id="vehicle1" name="vehicle1" onChange={()=> props.updateCompleteTodo(props.index)} ></input>
                <input id="todo" type="text" autoComplete="todo" value={todo} onChange={(e) => {settodo(e.target.value)}} required className='p-2 border-gray-50 border-2 rounded-md'/>
                <button type="submit" className='bg-yellow-400 rounded-md p-2'>Edit</button>
            </form>
            ) : 
            (
            <div className='flex  flex-row my-2'>
                <input type="checkbox" id="vehicle1" name="vehicle1" checked={props.todo.completed} onChange={()=> changeCompleteState()} ></input>
                <h2 className="text font-bold mx-2">
                  {props.todo.name}
                </h2>
                <button className='bg-yellow-400 rounded-md p-2 mx-2' onClick={()=> setisEditable(true)}>Edit</button>
                <button className='bg-red-400 rounded-md p-2 mx-2' onClick={()=> deleteFunction()}>Delete</button>
            </div>
            )
        }
        
        </div>
    )
}