import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  isActive: boolean;
  role: string;
  email: string;
  teams: string[];
}

interface EditUserModalProps {
  user: User;
  onCancel: () => void;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onCancel, onSave }) => {
  const [formData, setFormData] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit User Details</h2>
        <form onSubmit={handleSave}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full h-11 p-2.5 border rounded mb-2"
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <input
            type="text"
            name="isActive"
            value={formData.isActive.toString()}
            onChange={handleChange}
            placeholder="Status"
            className="w-full h-11 p-2.5 border rounded mb-2"
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full h-11 p-2.5 border rounded mb-2"
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full h-11 p-2.5 border rounded mb-2"
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teams
          </label>
          <input
            type="text"
            name="teams"
            value={formData.teams.join(', ')}
            onChange={handleChange}
            placeholder="Teams"
            className="w-full h-11 p-2.5 border rounded mb-2"
          />
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white font-bold rounded hover:bg-purple-700"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-52 h-11 p-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;