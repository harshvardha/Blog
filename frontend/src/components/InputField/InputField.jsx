import "./InputField.css";

const InputField = ({ htmlFor, labelText, inputType = "text", required = true, value, func, ...args }) => {
    return (
        <div className="inputField">
            <label htmlFor={htmlFor} style={{ marginLeft: "5px" }}>{labelText}</label>
            <input
                className="inputBox"
                type={inputType}
                value={value}
                onChange={(event) => func(inputType !== "file" ? event.target.value : event.target.files[0])}
                required={required}
                {...args}
            />
        </div>
    )
}

export default InputField;