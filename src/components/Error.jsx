import {useNavigate } from "react-router-dom"

export function Error() {

    const navigate = useNavigate()

    return (
        <>
            <h1> There was an error !!!</h1>
            <button onClick={() => {navigate("/")}}>Go back</button>
        </>
    )
}