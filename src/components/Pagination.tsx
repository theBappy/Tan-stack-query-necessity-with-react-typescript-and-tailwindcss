import { useQuery } from "@tanstack/react-query";
import { useState } from "react"

const fetchTodos = async(page=1, limit=10) => {
   const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`
    )
    if(!response.ok) throw new Error('network response was not ok')
        return response.json()
}


const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10;

const {data, error, isLoading} = useQuery({
    queryKey: ['todos', currentPage],
    queryFn: () =>fetchTodos(currentPage, pageSize),
  })


  if(isLoading) return <h1>Loading...</h1>
  if(error) return <p>Error: {error.message}</p>

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }



  return (
    <div>
        <h1>Todos</h1>
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
        <div>
            <button className="bg-green-500 p-3 border text-white" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous Page</button> 
            <button className="bg-teal-500 p-3 border text-white" onClick={handleNextPage}>Next Page</button>
        </div>
    </div>
  )
}

export default Pagination