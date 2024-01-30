import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import Airtable from 'airtable';

const base = new Airtable({apiKey: "patOnctnkl802BFlq.c57de8a152658f255a26e0ddadc8b13eb89fa4721ab2b8d4bd830e2e9e2add66"}).base("appRE0DxJYPgqD0Li");

export function Form() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [info, setInfo] = useState({
        "Student Name": "",
        "Hours Met": 0,
        "Progress Description": "",
        "userId": +id
    })

    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await base("Students").create([
                {
                    fields: info
                }
            ])

            if (response.length > 0) {
                navigate("/thankyou")
            } else {
                throw new Error
            }

        } catch (error) {
            navigate("/error")
            console.log(error)
        }
    }

    return (
        <>
            <form className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="Student Name" onChange={handleChange} value={info["Student Name"]}/>
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="Hours Met" onChange={handleChange} value={info["Hours Met"]}/>
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Hours</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <textarea name="Progress Description" value={info["Progress Description"]} onChange={handleChange}></textarea>
                <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Progress description</label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Submit</button>
            </form>

        </>
    )
}