import React, { useEffect } from 'react';
import { FiEdit, FiTrash } from "react-icons/fi";

interface User {
  id: number;
  name: string;
  isActive: boolean;
  role: string;
  email: string;
  teams: string[];
}

interface UserListProps {
  paginatedUsers: User[]; // Paginated users to be rendered
  selectedUsers: number[];
  onSelectUser: (userId: number, isSelected: boolean) => void;
  onSelectAllUser: (isSelected: boolean) => void;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({
  paginatedUsers,
  selectedUsers,
  onSelectUser,
  onSelectAllUser,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedUsers.length === paginatedUsers.length}
                onChange={(e) => onSelectAllUser(e.target.checked)}
              />
            </th>
            <th>Name</th>
            <th>Status</th>
            <th>Role</th>
            <th>Email</th>
            <th>Teams</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => onSelectUser(user.id, e.target.checked)}
                />
              </td>
              <td>{user.name}</td>
              <td>
                {user.isActive ? (
                  <span className="inline-block bg-green-200 text-green-800 rounded-full px-3 py-1 text-sm font-semibold">
                    Active
                  </span>
                ) : (
                  <span className="inline-block bg-red-200 text-red-800 rounded-full px-3 py-1 text-sm font-semibold">
                    Disabled
                  </span>
                )}
              </td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>
                <div className="flex flex-wrap">
                  {user.teams.map((team, index) => (
                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {team}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <button onClick={() => onDelete(user.id)} >
                  <FiTrash className="w-4 h-4 mr-1" />
                </button>
                <button onClick={() => onEdit(user)} >
                  <FiEdit className="w-4 h-4 mr-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;