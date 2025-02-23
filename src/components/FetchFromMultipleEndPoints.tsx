import { useQueries } from "@tanstack/react-query"
import { useState } from "react"

const fetchTodos = async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/")
    if(!response.ok) throw new Error('network response was not ok')
        return response.json()
}

const fetchPosts = async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/")
    if(!response.ok) throw new Error('network response was not ok')
        return response.json()
}


const FetchFromMultipleEndPoints = () => {
    const [currentTodoId, setCurrentTodoId] = useState(1)
    const [currentPostId , setCurrentPostId] = useState(1)

    const handleNextTodo = () => {
    setCurrentTodoId((prevId) => Math.min(prevId + 1, todosData.length));
    }

    const handleNextPost = () => {
        setCurrentPostId((prevId) => Math.min(prevId + 1, postsData.length))
    }

    const results = useQueries({
        queries: [
            {queryKey: ['todos'], queryFn: fetchTodos},
            {queryKey: ['posts'], queryFn: fetchPosts},
        ]
    })

   const [todosQuery, postsQuery] = results;

   if(todosQuery.isLoading || postsQuery.isLoading) return <h1>Loading...</h1>

   if(todosQuery.error || postsQuery.error) return <div>An error occurred:
    {todosQuery.error?.message || postsQuery.error?.message }
    </div>

   const todosData =  todosQuery.data ;
   const postsData = postsQuery.data;


  return (
    <div>
        <h1>Todos</h1>
       <pre>
        {JSON.stringify(
            todosData.find((todo: any) => todo.id === currentTodoId),
            null,
            2
        )}
       </pre>

       <button 
       onClick={handleNextTodo}
       className="bg-teal-700 p-2 text-white">Next Todo</button>


       <br />
       <hr />

       <h1>Posts</h1>
       <pre>
        {JSON.stringify(postsData.find((post:any)=> post.id === currentPostId), null, 2)}
       </pre>
       <button
       onClick={handleNextPost}
       className="bg-teal-700 p-2 text-white"
       >Next Post</button>
    </div>
  )
}

export default FetchFromMultipleEndPoints