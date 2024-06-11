import React from 'react';

interface DeleteSingleUserModalProps {
  onCancel: () => void;
  onDelete: () => void;
  isOpen: boolean;
}

const DeleteSingleUserModal: React.FC<DeleteSingleUserModalProps> = ({ onCancel, onDelete, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Delete User</h2>
        <p className="mb-4">Are you sure you want to delete this user?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSingleUserModal;