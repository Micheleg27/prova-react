import { useState } from "react"
import { Link } from "react-router-dom"

export function Home(){

    const [input, setInput] = useState(null)
    const [list, setList] = useState(null)
    const [err, setError] = useState(null)
    const [load, setLoad] = useState(false)

    const saveInput = (e) => {
        setInput(e.target.value)
    }

    function FetchApi() {
        setLoad(true)

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then((res) => res.json())
        .then((json) => setList(json))
        .catch((err) => setError(err))
        .finally(setLoad(false))
    }

    return(
        <div>
            <input onChange={saveInput} name='search' placeholder="Search Meal..."></input>
            <button onClick={FetchApi}>Search</button>

            {err && <p>Error</p>}
            {load && <p>Loading...</p>}

            <ul>
                {list && list.meals.map((item, index) => {
                    return (
                    <Link key={index}>
                        <li>{item.strMeal}</li>
                    </Link>
                    )
                })}
            </ul>
        </div>
    )
}