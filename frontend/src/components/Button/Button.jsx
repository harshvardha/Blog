import "./Button.css";

const Button = ({ buttonText, buttontType = "button" }) => {
    return (
        <button type={buttontType} className="customButton">{buttonText}</button>
    )
}

export default Button;