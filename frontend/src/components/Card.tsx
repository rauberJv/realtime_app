interface CardProps {
    title: string;
    description: string;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
    return (
        <div className="flex flex-col items-start justify-center text-white bg-gray-800 rounded-lg p-4 hover:bg-blue-800/70 transition-all duration-300 hover:cursor-pointer" onClick={onClick ? onClick : undefined}>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-sm">{description}</p>
        </div>
    );
}

export default Card;