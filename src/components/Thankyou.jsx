import {useNavigate } from "react-router-dom"

export function Thankyou() {
    
    const navigate = useNavigate()

    return(
        <>
            <h1>THANK YOU!!</h1>
            <button onClick={() => {navigate("/")}}>Go back</button>
        </>
    )
}