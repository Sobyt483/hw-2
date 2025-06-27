import { useState } from "react";
import type { User } from "../models/models";
import UserDetailModal from "./UserDetailModal";

interface UserListProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserList = ({ users, setUsers }: UserListProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onUserDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
    // If the deleted user is currently selected in the modal, close the modal
    if (selectedUser && selectedUser.id === userId) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">
              Name/Email
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">
              Address
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">
              Phone
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">
              Website
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">
              Company
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer hover-scale"
            >
              <td className="py-3 px-4" onClick={() => onUserClick(user)}>
                <div className="font-medium text-blue-600">{user.name}</div>
                <div className="text-gray-500 text-sm">{user.email}</div>
              </td>
              <td className="py-3 px-4" onClick={() => onUserClick(user)}>
                <div>
                  {user.address.street}, {user.address.suite}
                </div>
                <div>
                  {user.address.city}, {user.address.zipcode}
                </div>
              </td>
              <td className="py-3 px-4" onClick={() => onUserClick(user)}>
                {user.phone}
              </td>
              <td className="py-3 px-4" onClick={() => onUserClick(user)}>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {user.website}
                </a>
              </td>
              <td className="py-3 px-4" onClick={() => onUserClick(user)}>
                {user.company.name}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUserDelete(user.id);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={onCloseModal}
        />
      )}
    </div>
  );
};

export default UserList;
