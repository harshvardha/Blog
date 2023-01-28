import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { authenticationApiRequests } from "../../services/apiRequests";
import { UserContext } from "../../context/UserContext";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser, setIsLogin } = useContext(UserContext);
    const navigateTo = useNavigate();

    const handleLogin = async (event) => {
        try {
            event.preventDefault();
            if (!email || !password) {
                return window.alert("Please provide all the required details.");
            }
            const loginDetails = {
                email,
                passWord: password
            };
            const response = await authenticationApiRequests.login(loginDetails);
            if (response.status === 200) {
                const accessToken = response.data.accessToken;
                const user = response.data.user;
                localStorage.setItem("ACCESS_TOKEN", accessToken);
                setUser(user);
                setIsLogin(true);
                navigateTo("/");
            }
            else {
                window.alert("Login Failed.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login">
            <div className="login--form">
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleLogin} className="form">
                    <InputField
                        htmlFor={"email"}
                        labelText={"Email"}
                        inputType="email"
                        value={email}
                        func={setEmail}
                    />
                    <InputField
                        htmlFor={"password"}
                        labelText={"Password"}
                        inputType="password"
                        value={password}
                        func={setPassword}
                        minLength={6}
                    />
                    <div className="loginButtons">
                        <Button buttonText={"Login"} buttontType="submit" />
                        <Link to={"/register"} className="customButton" style={{ textDecoration: "none", color: "black", marginLeft: "10px", paddingTop: "5.5px", paddingBottom: "5.5px" }}>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;