import axios from 'axios'
import React, { useEffect, useState } from 'react'



const Todo = () => {
    const [todo, setTodo] = useState();
    useEffect(() => {
        try {
            const resTodo = axios.get('http://localhost:8080/user/signin/todo',
                {
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem('token')}`
                    }
                })
            return setTodo(resTodo);
        } catch (err) {
            console.logo(err)
        }

    }, [])

    

    return (
        <div>
            {console.log(todo)}
        </div>
    )
}

export default Todo