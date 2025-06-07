import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FiLogOut } from 'react-icons/fi';

const App = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  const [users, setUsers] = useState([]);
  const [commands, setCommands] = useState([]);
  const [mapData, setMapData] = useState([]);

  const fetchWithAuth = async (url, setter) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch. Is the backend running?");
    }
  };

  const handleGetUsers = () => fetchWithAuth('https://localhost:7166/api/users', setUsers);
  const handleGetCommands = () => fetchWithAuth('https://localhost:7166/api/robot-commands', setCommands);
  const handleGetMaps = () => fetchWithAuth('https://localhost:7166/api/maps', setMapData);

  if (isLoading) return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full text-center space-y-6 relative">

        {isAuthenticated && (
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            title="Logout"
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-4xl"
          >
            <FiLogOut />
          </button>
        )}

        <h1 className="text-2xl font-bold text-gray-800">
          {isAuthenticated ? 'Robot Controller Dashboard' : 'Robot Controller Login'}
        </h1>

        {!isAuthenticated && (
          <button
            onClick={() => loginWithRedirect()}
            className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600"
          >
            Login with Auth0
          </button>
        )}

        {isAuthenticated && (
          <>
            <div className="flex justify-center gap-3 flex-wrap items-center">
              <button
                onClick={handleGetUsers}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Get Users
              </button>
              <button
                onClick={handleGetCommands}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Get Commands
              </button>
              <button
                onClick={handleGetMaps}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Get Maps
              </button>
            </div>

            {users.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mt-4 text-blue-700">Users:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {users.map((u) => (
                    <div key={u.id} className="bg-blue-100 p-4 rounded-xl shadow text-left">
                      <h3 className="font-bold text-blue-800">{u.name}</h3>
                      <p className="text-sm text-gray-600">
                        <strong>Role:</strong> {u.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {commands.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mt-4 text-green-700">Robot Commands:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {commands.map((c) => (
                    <div key={c.id} className="bg-green-100 p-4 rounded-xl shadow text-left">
                      <h3 className="font-bold text-green-800">{c.name}</h3>
                      <p>{c.description}</p>
                      <p className="text-sm text-gray-600">
                        Type: {c.isMoveCommand ? 'Move' : 'Static'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mapData.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mt-4 text-purple-700">Maps:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {mapData.map((m) => (
                    <div key={m.id} className="bg-purple-100 p-4 rounded-xl shadow text-left">
                      <h3 className="font-bold text-purple-800">{m.name}</h3>
                      <p>{m.rows}x{m.columns} grid</p>
                      <p className="text-sm text-gray-600">{m.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
