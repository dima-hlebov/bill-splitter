import './heading.sass';

const Heading = ({tag: Tag, text, className}) => {
    return(
        <Tag className={`heading ${className}`}>{text}</Tag>
    );
}

export default Heading;