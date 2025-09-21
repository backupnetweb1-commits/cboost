// src/components/UserProfileMenu.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Settings, LogOut, Wallet } from "lucide-react";

const UserProfileMenu = ({ user, loading, logOut }) => {
    const [showProfile, setShowProfile] = useState(false);

    // Don't show the user menu until the user data is loaded
    if (loading || !user) {
        return <div className="h-10 w-10 border-2 border-gray-400 rounded-full animate-pulse max-lg:hidden"></div>;
    }

    const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`;

    return (
        <div className="relative max-lg:hidden">
            <button
                className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-white text-sm font-bold text-white bg-primary-500 hover:bg-primary-600 transition-colors"
                onClick={() => setShowProfile(!showProfile)}
            >
                {initials}
            </button>
            {showProfile && (
                <div className="absolute top-12 right-0 w-[200px] p-2 bg-card border border-border rounded-lg shadow-xl z-50">
                    <p className="px-4 py-2 text-sm font-semibold text-foreground border-b border-border/50">{user.firstName} {user.lastName}</p>
                    <Link to="/profile" className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors">
                        <User size={16} />
                        <span>My Profile</span>
                    </Link>
                    <Link to="/settings" className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors">
                        <Settings size={16} />
                        <span>Settings</span>
                    </Link>
                    <Link to="/transaction" className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors">
                        <Wallet size={16} />
                        <span>Transactions</span>
                    </Link>
                    <button onClick={logOut} className="w-full flex items-center space-x-2 p-2 rounded-md text-red-500 hover:bg-red-50 transition-colors">
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfileMenu;