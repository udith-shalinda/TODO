import { useState } from "react"
import { addTODO } from "../services/todo.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddTODO = (props: {addTODO: Function}) => {
    const [todo, settodo] = useState("");

    const addTODOFunction = async (e: any) => {
        e.preventDefault();
        if(todo.length > 0) {
            try {
                const newToDo = await addTODO(todo, false);
                toast.success("TODO successfully added", {
                    closeOnClick: true,
                  });
                props.addTODO({...newToDo, id: newToDo._id});
                settodo('');
            } catch (error) {
                toast.error("TODO adding failed", {
                    closeOnClick: true,
                  });
            }
        }
    }

    return (
        <form onSubmit={(e)=> addTODOFunction(e)} className="mb-8">
            <input id="todo" type="text" autoComplete="todo" value={todo} onChange={(e)=> settodo(e.target.value)} required className='p-2 border-gray-150 mr-4 border-2 rounded-md'/>
            <button type="submit" className='bg-yellow-400 rounded-md p-2'>Add</button>
        </form>
    )
}