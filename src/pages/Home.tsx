import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import DeleteSelectedUserModal from '../components/DeleteSelectedUserModal';
import DeleteSingleUserModal from '../components/DeleteSingleUserModal';
import EditUserModal from '../components/EditUserModal';
import Pagination from '../components/Pagination';
import { getUsers, deleteUser, updateUser } from '../services/userService';

interface User {
  id: number;
  name: string;
  isActive: boolean;
  role: string;
  email: string;
  teams: string[];
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showDeleteSelectedModal, setShowDeleteSelectedModal] = useState(false);
  const [showDeleteSingleModal, setShowDeleteSingleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, [currentPage]);

  const fetchUsers = async (page: number, limit: number) => {
    try {
      const { items, count } = await getUsers(page, limit);
      setUsers(items);
      setTotalCount(count);
      setSelectedUsers([])
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      for (const userId of selectedUsers) {
        await deleteUser(userId);
      }
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error deleting selected users:', error);
    }
  };

  const handleDeleteSingle = async (userId: number) => {
    try {
      await deleteUser(userId);
      setShowDeleteSingleModal(false);
      setDeletingUserId(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleSave = async (updatedUser: User) => {
    try {
      await updateUser(updatedUser);
      setShowEditModal(false);
      setEditingUser(null);
      fetchUsers(currentPage, pageSize);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleSelectUser = (userId: number, isSelected: boolean) => {
    setSelectedUsers((prevSelected) =>
      isSelected ? [...prevSelected, userId] : prevSelected.filter((id) => id !== userId)
    );
  };

  const handleSelectAllUser = (isSelected: boolean) => {
    const allUserIds = users.map(user => user.id);
    setSelectedUsers(isSelected ? allUserIds : []);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-3xl font-semibold">Team Members</h1>
        <button
          className="px-4 py-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-700"
          onClick={() => setShowDeleteSelectedModal(true)}
        >
          Delete Selected Users
        </button>
      </div>
      <UserList
        paginatedUsers={users}
        selectedUsers={selectedUsers}
        onSelectUser={handleSelectUser}
        onSelectAllUser={handleSelectAllUser}
        onEdit={handleEdit}
        onDelete={(userId: number) => {
          setDeletingUserId(userId);
          setShowDeleteSingleModal(true);
        }}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalCount / pageSize)}
        onPageChange={handlePageChange}
      />
      <DeleteSelectedUserModal
        onCancel={() => setShowDeleteSelectedModal(false)}
        onDelete={handleDeleteSelected}
        isOpen={showDeleteSelectedModal}
      />
      <DeleteSingleUserModal
        onCancel={() => setShowDeleteSingleModal(false)}
        onDelete={() => deletingUserId && handleDeleteSingle(deletingUserId)}
        isOpen={showDeleteSingleModal}
      />
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onCancel={() => {
            setShowEditModal(false);
            setEditingUser(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Home;