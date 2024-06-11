import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderPages = () => {
    return pages.map(page => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`px-4 py-2 border ${page === currentPage ? 'bg-purple-500 text-white' : 'text-gray-700'} hover:bg-purple-700`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-customBackground border border-customBorder shadow-custom1 shadow-custom2 rounded-l-lg"
      >
        Previous
      </button>
      {renderPages()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-customBackground border border-customBorder shadow-custom1 shadow-custom2 rounded-r-lg"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;