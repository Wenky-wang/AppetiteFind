import { useState } from "react";

const Login = ({onLoginFunc=f=>f}) => {
    const [logEmail, setLogEmail] = useState('');
    const [logPwd, setLogPwd] = useState('');

    const onLogin = (event) => {
        event.preventDefault();
        onLoginFunc(logEmail, logPwd);
    }
    
    return ( <>
        <header className="login_head">
            <h1>Appetite Seek</h1>
        </header>
        <main className="login_main">
            <form className="login_form" onSubmit={onLogin}>
                <div className="login_form_div">
                    <label>Login:</label>
                    <input className="login_field_class" type="text" placeholder="email address" value={logEmail}
                    onChange={(event) => setLogEmail(event.target.value)} />
                    <label>Password:</label>
                    <input className="login_field_class" type="password" placeholder="password" value={logPwd}
                    onChange={(event) => setLogPwd(event.target.value)} />
                    <button className="login_submit">Enter</button>
                </div>
                <div className="login_info_div">
                    <p>Do not have an account? &nbsp;<span>Register</span></p>
                </div>
            </form>
        </main>
        <footer className="login_foot">
            <p>Wenqi Wang - Douglas College CSIS3380 Project</p>
        </footer>
    </>);
}
 
export default Login;