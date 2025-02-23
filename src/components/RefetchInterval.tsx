import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const fetchTodo = async (id: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

  if (!response.ok) throw new Error("network response was not ok");
  return response.json();
};

const RefetchInterval = () => {
  const [currentId, setCurrentId] = useState(1);
  const { data, error, isLoading } = useQuery({
    queryKey: ["todo", currentId],
    queryFn: () => fetchTodo(currentId),
    refetchInterval: 5000,
  });

  useEffect(()=>{
   const interval = setInterval(()=>{
       setCurrentId(prevId => prevId < 200 ? prevId + 1 : 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if(isLoading) return <h1>Loading...</h1>
  if(error) return <p>An error occurred: {error.message}</p>

  return <div>
    <h1>Todo</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
    <button className="bg-black text-white" onClick={()=> setCurrentId((prevId)=> (prevId < 200 ? prevId+1: 1))}>Next Todo</button>
  </div>;
};

export default RefetchInterval;
