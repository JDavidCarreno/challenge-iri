import { useState } from "react";
import Airtable from 'airtable';
import { useNavigate } from "react-router-dom"

// const API_KEY = import.meta.env.API_KEY
// console.log(API_KEY);
// const BASE = import.meta.env.BASE

const base = new Airtable({apiKey: "patOnctnkl802BFlq.c57de8a152658f255a26e0ddadc8b13eb89fa4721ab2b8d4bd830e2e9e2add66"}).base("appRE0DxJYPgqD0Li");

// eslint-disable-next-line react/prop-types
export function Login({ setIsLogged }) {
    let user = {};

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleLogin = async () => {
        setErrorEmail(false);
        setErrorPassword(false);
        try {
            const response = await base("Users").select({
                filterByFormula: `AND({email} = '${email}')`
            }).all();
    
            if (response.length > 0) {
                user = response[0].fields;
                if (user.password === password) {
                    setIsLogged(true);
                    navigate("/form")
                } else {
                    setErrorPassword(true);
                }
            } else {
                setErrorEmail(true);
            }
            console.log(user);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Log in</h1>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className={`shadow appearance-none border ${errorEmail ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errorEmail && <p className="text-red-500 text-xs italic">This user does not exist</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className={`shadow appearance-none border ${errorPassword ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorPassword && <p className="text-red-500 text-xs italic">The password is incorrect</p>}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleLogin}
                    >
                        Log in
                    </button>
                </div>
            </form>
        </div>
    );
}
