import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { authenticationApiRequests } from "../../services/apiRequests";
import storage from "../../firebase";
import "./Register.css";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [file, setFile] = useState("");
    const navigateTo = useNavigate();

    const handleRegister = async (event) => {
        try {
            event.preventDefault();
            if (!firstName || !lastName || !email || !password || !passwordAgain) {
                return window.alert("Please provide all the required details.");
            }
            if (password !== passwordAgain) {
                return window.alert("Passwords don't match.");
            }
            const fileName = new Date().getTime() + file;
            const storageRef = ref(storage, fileName);
            uploadBytes(storageRef, file).then(snapshot => {
                getDownloadURL(snapshot.ref).then(url => {
                    const registerDetails = {
                        firstName,
                        lastName,
                        email,
                        password,
                        profilePic: url
                    };
                    authenticationApiRequests.register(registerDetails).then(response => {
                        console.log("registration successfull: ", response);
                        if (response.status === 201) {
                            window.alert("Registration Successfull.");
                            navigateTo("/login");
                        }
                        else {
                            window.alert("Registration failed. Try Again");
                        }
                    });

                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="register">
            <div className="register--form">
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <h1>Register</h1>
                </div>
                <form onSubmit={handleRegister} className="form">
                    <InputField
                        htmlFor={"firstName"}
                        labelText={"First Name"}
                        value={firstName}
                        func={setFirstName}
                    />
                    <InputField
                        htmlFor={"lastName"}
                        labelText={"Last Name"}
                        value={lastName}
                        func={setLastName}
                    />
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
                    <InputField
                        htmlFor={"reEnterPassword"}
                        labelText={"Re Enter Password"}
                        inputType="password"
                        value={passwordAgain}
                        func={setPasswordAgain}
                        minLength={6}
                    />
                    <InputField
                        htmlFor={"profilePic"}
                        labelText="Select Profile Pic"
                        inputType="file"
                        func={setFile}
                    />
                    <Button buttonText={"Register"} buttontType="submit" />
                </form>
            </div>
        </div>
    )
}

export default Register;