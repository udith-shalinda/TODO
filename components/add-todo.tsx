import { useState } from "react"

export const AddTODO = (props: {addTODO: Function}) => {
    const [todo, settodo] = useState("");

    const addTODOFunction = (e) => {
        e.preventDefault();
        if(todo.length > 0) {
            props.addTODO(todo);
            settodo('');
        }
    }

    return (
        <form onSubmit={(e)=> addTODOFunction(e)} className="mb-8">
            <input id="todo" type="text" autoComplete="todo" value={todo} onChange={(e)=> settodo(e.target.value)} required className='p-2 border-gray-50 border-2 rounded-md'/>
            <button type="submit" className='bg-yellow-400 rounded-md p-2'>Add</button>
        </form>
    )
}