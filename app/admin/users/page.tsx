"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaBriefcase,
  FaSignOutAlt,
  FaArrowLeft,
} from "react-icons/fa";

interface User {
  id: number;
  rowNumber: number;
  timestamp: string;
  fullName: string;
  email: string;
  graduationYear: string;
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

export default function UsersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated via server-side verification
    checkAuthStatus();
  }, [router]);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/admin/verify-token", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchUsers();
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/login");
    }
  };

  // Handle search on Enter key or button click
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/users?search=${encodeURIComponent(searchTerm.trim())}&limit=1000`
      );
      const data: UsersResponse = await response.json();

      if (response.ok) {
        setSearchResults(data.users);
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

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 1000 &&
        !searchTerm.trim() // Only load more if not searching
      ) {
        loadMoreUsers();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadingMore, currentPage, searchTerm]);

  const fetchUsers = async (page: number = 1, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(`/api/users?page=${page}&limit=20`);
      const data: UsersResponse = await response.json();

      if (response.ok) {
        if (append) {
          setUsers((prev) => [...prev, ...data.users]);
        } else {
          setUsers(data.users);
        }
        setCurrentPage(data.page);
        setHasMore(data.hasMore);
        setTotalUsers(data.total);
      } else {
        setError(data.error || "Məlumatları yükləmək mümkün olmadı");
      }
    } catch (err) {
      setError("Server xətası baş verdi");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreUsers = () => {
    if (hasMore && !loadingMore) {
      fetchUsers(currentPage + 1, true);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      router.push("/admin/login");
    }
  };

  const handleBackToDashboard = () => {
    router.push("/admin/dashboard");
  };

  // Determine which users to display - only show search results when actually searching
  const displayUsers =
    isSearching || searchResults.length > 0 ? searchResults : users;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yoxlanılır...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition duration-200"
              >
                <FaArrowLeft className="w-4 h-4" />
                <span>Geri</span>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaUsers className="w-6 h-6 mr-2" />
                  İstifadəçilər
                </h1>
                <p className="text-gray-600">
                  {searchResults.length > 0
                    ? `Axtarış nəticələri: ${searchResults.length}`
                    : `Qeydiyyatdan keçmiş istifadəçilər (${totalUsers})`}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200 flex items-center space-x-2"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Çıxış</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Ad, soyad, email və ya ixtisas üzrə axtar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSearchResults([]);
                        setIsSearching(false);
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-200"
                      title="Axtarışı təmizlə"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                >
                  {isSearching ? "Axtarılır..." : "Axtar"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              İstifadəçi məlumatları yüklənir...
            </p>
          </div>
        )}

        {/* Users Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ad Soyad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Məzuniyyət İli
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İş Vəziyyəti
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İş Sahəsi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qeydiyyat Tarixi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName || "Məlumat yoxdur"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FaEnvelope className="w-3 h-3 mr-1 text-gray-400" />
                          {user.email || "Məlumat yoxdur"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FaCalendar className="w-3 h-3 mr-1 text-gray-400" />
                          {user.graduationYear || "Məlumat yoxdur"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.workingInField === "Bəli"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.workingInField === "Bəli"
                            ? "İşləyir"
                            : "İşləmir"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.workField || "Məlumat yoxdur"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.timestamp
                          ? new Date(user.timestamp).toLocaleDateString("az-AZ")
                          : "Məlumat yoxdur"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {displayUsers.length === 0 && (
              <div className="text-center py-12">
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Axtarış edilir...</p>
                  </>
                ) : (
                  <>
                    <FaUsers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchResults.length === 0 && searchTerm
                        ? "Axtarış nəticəsi tapılmadı"
                        : "Hələ istifadəçi qeydiyyatı yoxdur"}
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Load More Section - Only show when not searching */}
            {searchResults.length === 0 && users.length > 0 && (
              <div className="border-t border-gray-200 px-6 py-4">
                {loadingMore ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">
                      Daha çox məlumat yüklənir...
                    </p>
                  </div>
                ) : hasMore ? (
                  <div className="text-center">
                    <button
                      onClick={loadMoreUsers}
                      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Daha çox göstər
                    </button>
                    <p className="mt-2 text-sm text-gray-500">
                      {users.length} / {totalUsers} istifadəçi göstərilir
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Bütün istifadəçilər göstərildi ({totalUsers})
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Search Results Info - Show when searching */}
            {searchResults.length > 0 && (
              <div className="border-t border-gray-200 px-6 py-4 bg-blue-50">
                <div className="text-center">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">
                      {searchResults.length}
                    </span>{" "}
                    nəticə göstərilir
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Bütün məlumatlar üzərində axtarış edildi
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
