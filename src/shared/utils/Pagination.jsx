import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPageConfigAction,
  setPageConfigRecordPerPageAction,
} from "../../store/actions/PaginationAtion";

const PaginationControl = ({ onPageChangeFetch }) => {
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(1);
  const currPage = useSelector((state) => state.pageConfig.currentPage);
  const recordsCount = useSelector((state) => state.pageConfig.totalRecords);
  const recordsPerPage = useSelector((state) => state.pageConfig.itemsPerPage);

  const showingFrom = (currPage - 1) * recordsPerPage + 1;
  const showingTo = Math.min(currPage * recordsPerPage, recordsCount);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      dispatch(setCurrentPageConfigAction(pageNumber));
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-2 border border-gray-300 ${
            i === currPage
              ? "bg-teal-600 text-gray-700 hover:bg-teal-700"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  useEffect(() => {
    setTotalPages(Math.ceil(recordsCount / recordsPerPage));
  }, [recordsCount, recordsPerPage]);

  useEffect(() => {
    onPageChangeFetch();
  }, [recordsPerPage, currPage]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 mb-6">
      {/* Info + Per Page Selector */}
      <div className="text-sm text-white-700 flex flex-wrap gap-3 items-center">
        <p>
          Showing <span className="font-medium">{showingFrom}</span> to{" "}
          <span className="font-medium">{showingTo}</span> of{" "}
          <span className="font-medium">{recordsCount}</span> results
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="recordsPerPage" className="text-sm">
            | View
          </label>
          <select
            id="recordsPerPage"
            className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 "
            value={recordsPerPage}
            onChange={(e) =>
              dispatch(setPageConfigRecordPerPageAction(+e.target.value))
            }
          >
            {[ 10,15, 20, 50].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pagination Buttons */}
      {recordsCount > 0 && (
        <div className="flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button
              className={`px-3 py-2 border border-gray-300 rounded-l-md ${
                currPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => handlePageChange(currPage - 1)}
              disabled={currPage === 1}
            >
              Previous
            </button>

            {renderPageNumbers()}

            <button
              className={`px-3 py-2 border border-gray-300 rounded-r-md ${
                currPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => handlePageChange(currPage + 1)}
              disabled={currPage === totalPages}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PaginationControl;
