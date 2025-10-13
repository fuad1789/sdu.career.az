"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaSignOutAlt,
  FaArrowLeft,
  FaEye,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

interface Muraciet {
  id: number;
  "Ad Soyad": string;
  "E-Mail": string;
  Telefon: string;
  Mövzu: string;
  Mesaj: string;
  Tarix: string;
  Status: string;
}

export default function MuracietlerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [muracietler, setMuracietler] = useState<Muraciet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMuraciet, setSelectedMuraciet] = useState<Muraciet | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
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
        fetchMuracietler();
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/login");
    }
  };

  const fetchMuracietler = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/muracietler");
      const data = await response.json();

      if (response.ok) {
        setMuracietler(data.applications || []);
      } else {
        setError(data.error || "Müraciətləri yükləmək mümkün olmadı");
      }
    } catch (err) {
      setError("Server xətası baş verdi");
    } finally {
      setLoading(false);
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

  const openModal = (muraciet: Muraciet) => {
    setSelectedMuraciet(muraciet);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMuraciet(null);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      setActionLoading(id.toString());

      const response = await fetch(`/api/admin/muracietler/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state
        setMuracietler((prev) =>
          prev.map((m) => (m.id === id ? { ...m, Status: newStatus } : m))
        );
        setShowModal(false);
      } else {
        setError(data.error || "Status yenilənərkən xəta baş verdi");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Server xətası baş verdi");
    } finally {
      setActionLoading(null);
    }
  };

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
                  <FaEnvelope className="w-6 h-6 mr-2" />
                  Müraciətlər
                </h1>
                <p className="text-gray-600">
                  Əlaqə formasından gələn müraciətlər ({muracietler.length})
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
            <p className="mt-4 text-gray-600">Müraciətlər yüklənir...</p>
          </div>
        )}

        {/* Müraciətlər Table */}
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
                      E-Mail
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mövzu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarix
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Əməliyyatlar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {muracietler.map((muraciet) => (
                    <tr key={muraciet.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {muraciet["Ad Soyad"] || "Məlumat yoxdur"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FaEnvelope className="w-3 h-3 mr-1 text-gray-400" />
                          {muraciet["E-Mail"] || "Məlumat yoxdur"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FaPhone className="w-3 h-3 mr-1 text-gray-400" />
                          {muraciet["Telefon"] || "Məlumat yoxdur"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {muraciet["Mövzu"] || "Məlumat yoxdur"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FaCalendar className="w-3 h-3 mr-1 text-gray-400" />
                          {muraciet["Tarix"] || "Məlumat yoxdur"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            muraciet["Status"] === "Gözləyir"
                              ? "bg-yellow-100 text-yellow-800"
                              : muraciet["Status"] === "Cavablandırılıb"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {muraciet["Status"] || "Gözləyir"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openModal(muraciet)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {muracietler.length === 0 && (
              <div className="text-center py-12">
                <FaEnvelope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Hələ müraciət yoxdur</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && selectedMuraciet && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Müraciət Detalları
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ad Soyad
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedMuraciet["Ad Soyad"]}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      E-Mail
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedMuraciet["E-Mail"]}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Telefon
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedMuraciet["Telefon"]}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mövzu
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedMuraciet["Mövzu"]}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tarix
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedMuraciet["Tarix"]}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedMuraciet["Status"] === "Gözləyir"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedMuraciet["Status"] === "Cavablandırılıb"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedMuraciet["Status"]}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mesaj
                  </label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedMuraciet["Mesaj"]}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() =>
                    updateStatus(selectedMuraciet.id, "Cavablandırılıb")
                  }
                  disabled={actionLoading === selectedMuraciet.id.toString()}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
                >
                  {actionLoading === selectedMuraciet.id.toString() ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <FaCheck className="w-4 h-4 mr-2" />
                  )}
                  Cavablandırıldı olaraq işarələ
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Bağla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
