import { useState } from 'react'
import {useAuth} from '../context/AuthProvider'

import {useNavigate} from 'react-router-dom'

export const Login = () => {
	const {login} = useAuth()
	const navigate = useNavigate()

	const [ email, setEmail] = useState("@")
	const [ password, setPassword] = useState("heslo")

	const [ message, setMessage] = useState("")

	const handleClick = async (event) =>{
		event.preventDefault()
		try {
			const {data, error} = await login(email, password);
			if (error) {
				console.log(error)
				setMessage("Wrong email or password")
			}
			if (data.user && data.session) {
				console.log('prihlaseny', data.user)
				// prihlaseneho uzivatele presmerujeme na home
				navigate('/')
			}
		}
		catch (error) {
			console.log(error)
		}

	}

	return (
		<>
			<h2>Login</h2>
			<p className='text-danger'>{message}</p>
			<form onSubmit={handleClick}>
				<input type="text" className='form-control border mb-11 w-75' value={email} onChange={(event) => setEmail(event.target.value)} />
				<input type="password" className='form-control border mb-11 w-75' value={password} onChange={(event) => setPassword(event.target.value)} />
				<button type="submit" className="btn btn-secondary">Login</button>
			</form>
			
		</>
	)
}

export default Login;