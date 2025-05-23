import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white border-b">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-blue-600">AI Support Chat</h1>
          </div>
          
          <nav className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <span className="text-gray-600">Please login</span>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
