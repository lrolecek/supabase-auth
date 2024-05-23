import { useState } from 'react'
import {useAuth} from '../context/AuthProvider'


export const Register = () => {
	const {register} = useAuth()

	const [ email, setEmail] = useState("@")
	const [ password, setPassword] = useState("password")

	const [ message, setMessage] = useState("")


	const handleClick = (event) =>{
		event.preventDefault()

		// Regulerní výrazy
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		// Check if the email matches the expected pattern
		if (!emailRegex.test(email)) {
		  setMessage("Put a correct e-mail address.");
		  return;
		}
	
		try {
		  const { data, error } = register(email, password);
	
		  if (!error && data) {
			alert("Registration successfull, check your e-mail.");
		  }
		} catch (error) {
		  setMessage("Error");
		}

	}

	return (
		<>

			<h2>Registration</h2>
			<p>{message}</p>
			<form onSubmit={handleClick}>
				<input type="text" className='form-control border mb-11 w-75' value={email} onChange={(event) => setEmail(event.target.value)} />
				<input type="password" className='form-control border mb-11 w-75' value={password} onChange={(event) => setPassword(event.target.value)} />
				<button type="submit" className="btn btn-secondary">Sing up</button>
			</form>

			

		</>
	)
}

export default Register;