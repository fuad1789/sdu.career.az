"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaSignOutAlt,
  FaArrowLeft,
  FaGraduationCap,
  FaBriefcase,
  FaHandshake,
} from "react-icons/fa";

interface Announcement {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: string;
  priority: string;
  rowNumber: number;
}

export default function AdminAnnouncements() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Sertifikat",
    date: "",
    status: "Aktiv",
    priority: "Orta",
  });
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
        fetchAnnouncements();
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/login");
    }
  };

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/elanlar");
      const data = await response.json();

      if (response.ok) {
        setAnnouncements(data.announcements);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Sertifikat":
        return FaGraduationCap;
      case "Təcrübə":
        return FaBriefcase;
      case "Əməkdaşlıq":
        return FaHandshake;
      default:
        return FaGraduationCap;
    }
  };

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const response = await fetch("/api/admin/elanlar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAddForm(false);
        setFormData({
          title: "",
          description: "",
          category: "Sertifikat",
          date: "",
          status: "Aktiv",
          priority: "Orta",
        });
        await fetchAnnouncements();
      }
    } catch (error) {
      console.error("Error adding announcement:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleEditAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement) return;

    try {
      setUpdating(true);
      const response = await fetch(
        `/api/admin/elanlar/${editingAnnouncement.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setEditingAnnouncement(null);
        setFormData({
          title: "",
          description: "",
          category: "Sertifikat",
          date: "",
          status: "Aktiv",
          priority: "Orta",
        });
        await fetchAnnouncements();
      }
    } catch (error) {
      console.error("Error updating announcement:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm("Bu elanı silmək istədiyinizə əminsiniz?")) return;

    try {
      setUpdating(true);
      const response = await fetch(`/api/admin/elanlar/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchAnnouncements();
        alert("Elan uğurla silindi!");
      } else {
        alert("Elan silinə bilmədi. Xəta baş verdi.");
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
      alert("Elan silinə bilmədi. Xəta baş verdi.");
    } finally {
      setUpdating(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Aktiv" ? "Deaktiv" : "Aktiv";

    try {
      setUpdating(true);
      const response = await fetch(`/api/admin/elanlar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchAnnouncements();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const startEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      description: announcement.description,
      category: announcement.category,
      date: announcement.date,
      status: announcement.status,
      priority: announcement.priority,
    });
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
                onClick={() => router.push("/admin/dashboard")}
                className="text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Elanlar İdarəetməsi
                </h1>
                <p className="text-gray-600">
                  Elanları əlavə edin, redaktə edin və silin
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
        {/* Add/Edit Form */}
        {(showAddForm || editingAnnouncement) && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {editingAnnouncement ? "Elanı Redaktə Et" : "Yeni Elan Əlavə Et"}
            </h2>
            <form
              onSubmit={
                editingAnnouncement
                  ? handleEditAnnouncement
                  : handleAddAnnouncement
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlıq
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kateqoriya
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  >
                    <option value="Sertifikat">Sertifikat</option>
                    <option value="Təcrübə">Təcrübə</option>
                    <option value="Əməkdaşlıq">Əməkdaşlıq</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tarix
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  >
                    <option value="Aktiv">Aktiv</option>
                    <option value="Deaktiv">Deaktiv</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioritet
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  >
                    <option value="Yüksək">Yüksək</option>
                    <option value="Orta">Orta</option>
                    <option value="Aşağı">Aşağı</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Təsvir
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
              <div className="mt-6 flex space-x-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {updating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Yenilənir...</span>
                    </>
                  ) : (
                    <span>{editingAnnouncement ? "Yenilə" : "Əlavə Et"}</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingAnnouncement(null);
                    setFormData({
                      title: "",
                      description: "",
                      category: "Sertifikat",
                      date: "",
                      status: "Aktiv",
                      priority: "Orta",
                    });
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                >
                  Ləğv Et
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Elanlar ({announcements.length})
          </h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
          >
            <FaPlus className="w-4 h-4" />
            <span>Yeni Elan</span>
          </button>
        </div>

        {/* Announcements List */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Məlumatlar yüklənir...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Hələ heç bir elan yoxdur</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Elan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kateqoriya
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarix
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prioritet
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Əməliyyatlar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {announcements.map((announcement) => {
                    const IconComponent = getCategoryIcon(
                      announcement.category
                    );
                    return (
                      <tr key={announcement.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <IconComponent className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                {announcement.title}
                              </div>
                              <div className="text-sm text-gray-500 max-w-xs truncate">
                                {announcement.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {announcement.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(announcement.date).toLocaleDateString(
                            "az-AZ"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleToggleStatus(
                                announcement.id,
                                announcement.status
                              )
                            }
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              announcement.status === "Aktiv"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {announcement.status}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              announcement.priority === "Yüksək"
                                ? "bg-red-100 text-red-800"
                                : announcement.priority === "Orta"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {announcement.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEdit(announcement)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <FaEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteAnnouncement(announcement.id)
                              }
                              disabled={updating}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {updating ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                              ) : (
                                <FaTrash className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
