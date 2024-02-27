import  { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  phone: string;
  address?: {
    city: string;
  };
}

const TableThree = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Fetch user data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>('https://epicbazaar.onrender.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter users based on search query
  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.name.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone.includes(searchQuery)
      )
    );
  }, [searchQuery, users]);

  // Function to remove a user
  const removeUser = async (id: string) => {
    try {
      await axios.delete(`https://epicbazaar.onrender.com/users/${id}`);
      // After successfully removing the user, update the state to reflect the changes
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <input
        style={{ border: '2px solid black', color: "black", borderRadius: "8px", width: "300px", marginBottom: "10px", height: "40px" }}
        type="text"
        placeholder="Search by name, email, or phone"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          {/* Table headers */}
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Name</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Phone</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Email</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">City</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.name.firstname} {user.name.lastname}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.phone}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.email}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.address && user.address.city}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <button className="text-red-500 hover:text-red-700" onClick={() => removeUser(user.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
