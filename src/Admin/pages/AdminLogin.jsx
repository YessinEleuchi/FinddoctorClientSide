import {useState} from "react";
import {Form} from "react-router-dom";

const Login = () => {
    const [state,setstate] = useState()
    return (
        <Form>
            <div>
                <p><span>{state}</span> Login</p>
                <div>
                    <p>Email</p>
                    <input type="email" required/>

                </div>
                <div>
                    <p>Password</p>
                    <input type="password" required/>
                </div>
                <button type="submit">Login</button>
            </div>

        </Form>
    )
}
export default Login
