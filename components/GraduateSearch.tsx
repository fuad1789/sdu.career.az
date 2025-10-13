"use client";

import { useState, useEffect } from "react";
import {
  FaSearch,
  FaUsers,
  FaCalendar,
  FaTimes,
  FaSpinner,
  FaEnvelope,
  FaBriefcase,
  FaBuilding,
  FaGraduationCap,
  FaUser,
  FaEye,
  FaWindowClose,
} from "react-icons/fa";

interface User {
  id: number;
  rowNumber: number;
  timestamp: string;
  fullName: string;
  email: string;
  graduationYear: string;
  specialty: string;
  workingInField: string;
  workField: string;
  workplace: string;
  careerServices: string;
  additionalNotes: string;
}

interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
  limit: number;
  lastUpdated: string;
  error?: string;
}

export default function GraduateSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Handle search
  const handleSearch = async (page: number = 1) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setError("");

    try {
      const response = await fetch(
        `/api/users?search=${encodeURIComponent(
          searchTerm.trim()
        )}&limit=10&page=${page}`
      );
      const data: UsersResponse = await response.json();

      if (response.ok) {
        setSearchResults(data.users);
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
        setHasMore(data.hasMore);
        setShowResults(true);
      } else {
        setError(data.error || "Axtarış zamanı xəta baş verdi");
        setSearchResults([]);
      }
    } catch (err) {
      setError("Server xətası baş verdi");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
    setError("");
    setCurrentPage(1);
    setTotalPages(1);
    setHasMore(false);
  };

  // Handle user click
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Load next page
  const loadNextPage = () => {
    if (hasMore && !isSearching) {
      handleSearch(currentPage + 1);
    }
  };

  // Load previous page
  const loadPreviousPage = () => {
    if (currentPage > 1 && !isSearching) {
      handleSearch(currentPage - 1);
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Məzun Axtarışı
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SDU məzunlarını ad, soyad və ya ixtisas üzrə axtarın
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Ad, soyad və ya ixtisas üzrə axtar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-200"
                  title="Axtarışı təmizlə"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={isSearching || !searchTerm.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center space-x-2"
            >
              {isSearching ? (
                <FaSpinner className="w-4 h-4 animate-spin" />
              ) : (
                <FaSearch className="w-4 h-4" />
              )}
              <span>{isSearching ? "Axtarılır..." : "Axtar"}</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Search Results */}
        {showResults && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Results Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaUsers className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Axtarış Nəticələri
                    </h3>
                  </div>
                  <span className="text-sm text-gray-600">
                    {searchResults.length} nəticə tapıldı
                  </span>
                </div>
              </div>

              {/* Results Table */}
              {searchResults.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ad Soyad
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Əməliyyat
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {searchResults.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                          onClick={() => handleUserClick(user)}
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {user.fullName || "Məlumat yoxdur"}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center text-blue-600 hover:text-blue-800">
                              <FaEye className="w-4 h-4 mr-1" />
                              <span className="text-sm">Ətraflı</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaUsers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Axtarış nəticəsi tapılmadı</p>
                </div>
              )}

              {/* Pagination */}
              {searchResults.length > 0 && totalPages > 1 && (
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={loadPreviousPage}
                      disabled={currentPage === 1 || isSearching}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-sm font-medium"
                    >
                      {isSearching ? "Yüklənir..." : "Geri"}
                    </button>

                    <div className="text-sm text-gray-600">
                      Səhifə {currentPage} / {totalPages}
                    </div>

                    <button
                      onClick={loadNextPage}
                      disabled={!hasMore || isSearching}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-sm font-medium"
                    >
                      {isSearching ? "Yüklənir..." : "İrəli"}
                    </button>
                  </div>
                </div>
              )}

              {/* Close Results Button */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="text-center">
                  <button
                    onClick={clearSearch}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-200"
                  >
                    Axtarışı bağla
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Details Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-gray-200/50 animate-in zoom-in-95 duration-300 flex flex-col mx-2">
              {/* Modal Header */}
              <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100/80 bg-gradient-to-r from-gray-50 to-white flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <FaUser className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Məzun Məlumatları
                      </h3>
                      <p className="text-sm text-gray-500">Ətraflı məlumat</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-all duration-200 group"
                  >
                    <FaTimes className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="px-4 sm:px-6 py-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="space-y-3 pt-2 pb-4">
                  {/* Personal Information */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <FaUser className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">
                        Məzun Məlumatları
                      </h4>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">
                        Ad, Ata adı, Soyad
                      </p>
                      <p className="text-gray-900 font-medium text-sm">
                        {selectedUser.fullName || "Məlumat yoxdur"}
                      </p>
                    </div>
                  </div>

                  {/* Education Information */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <FaGraduationCap className="w-4 h-4 text-green-600" />
                      <h4 className="font-semibold text-gray-900">
                        Təhsil Məlumatları
                      </h4>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">
                          Məzun olduğunuz il
                        </p>
                        <div className="flex items-center space-x-1">
                          <FaCalendar className="w-3 h-3 text-gray-400" />
                          <p className="text-gray-900 font-medium text-sm">
                            {selectedUser.graduationYear || "Məlumat yoxdur"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">İxtisas</p>
                        <p className="text-gray-900 font-medium text-sm">
                          {selectedUser.specialty || "Məlumat yoxdur"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-100/80 bg-gradient-to-r from-gray-50 to-white flex-shrink-0">
                <button
                  onClick={closeModal}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3.5 rounded-2xl hover:from-gray-800 hover:to-gray-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Bağla
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
