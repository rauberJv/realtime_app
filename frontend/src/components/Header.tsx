import { useRealtimeData } from "../contexts/RealtimeContext";
import viteLogo from '/vite.svg';

const Header = () => {
    const { lastUpdated } = useRealtimeData();

    return (
        <header className="bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center gap-y-2 md:gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                <img 
                    src={viteLogo} 
                    alt="Vite Logo" 
                    className="w-full h-full object-contain"
                />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-center md:text-left">Company</h1>
                <p className="text-sm text-center md:text-left">Last Update {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Outdated'}</p>
            </div>
        </header>
    )
}

export default Header;