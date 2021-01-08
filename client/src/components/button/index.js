import './button.sass'

const Button = ({text, className, onClick}) => {
    return(
    <button className={`button ${className}`} type="submit" onClick={onClick}>{text}</button>
    );
};

export default Button;