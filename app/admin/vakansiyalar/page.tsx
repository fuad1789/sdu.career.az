"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaSignOutAlt,
  FaSuitcase,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  deadline: string;
  status: string;
  applicationLink?: string;
  rowNumber?: number;
}

export default function AdminVakansiyalar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/admin/verify-token", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchVacancies();
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/login");
    }
  };

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/vakansiyalar");

      if (!response.ok) {
        throw new Error("Failed to fetch vacancies");
      }

      const data = await response.json();
      setVacancies(data.vacancies || []);
    } catch (err) {
      console.error("Error fetching vacancies:", err);
      setError("Vakansiyalar yüklənərkən xəta baş verdi");
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

  const handleAddVacancy = () => {
    setEditingVacancy({
      id: "",
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: "",
      experience: "",
      description: "",
      requirements: [],
      benefits: [],
      postedDate: new Date().toISOString().split("T")[0],
      deadline: "",
      status: "Aktiv",
      applicationLink: "",
    });
    setShowAddModal(true);
  };

  const handleEditVacancy = (vacancy: Vacancy) => {
    setEditingVacancy(vacancy);
    setShowAddModal(true);
  };

  const handleDeleteVacancy = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/vakansiyalar/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setVacancies(vacancies.filter((v) => v.id !== id));
        setShowDeleteModal(null);
      } else {
        setError("Vakansiya silinərkən xəta baş verdi");
      }
    } catch (err) {
      console.error("Error deleting vacancy:", err);
      setError("Vakansiya silinərkən xəta baş verdi");
    }
  };

  const handleSaveVacancy = async (vacancy: Vacancy) => {
    try {
      const isEdit = editingVacancy?.id && editingVacancy.id !== "";
      const url = isEdit
        ? `/api/admin/vakansiyalar/${vacancy.id}`
        : "/api/admin/vakansiyalar";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(vacancy),
      });

      if (response.ok) {
        setShowAddModal(false);
        setEditingVacancy(null);
        fetchVacancies();
      } else {
        setError(
          isEdit
            ? "Vakansiya yenilənərkən xəta baş verdi"
            : "Vakansiya əlavə edilərkən xəta baş verdi"
        );
      }
    } catch (err) {
      console.error("Error saving vacancy:", err);
      setError("Vakansiya saxlanılarkən xəta baş verdi");
    }
  };

  const filteredVacancies = vacancies.filter((vacancy) => {
    const matchesSearch =
      vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || vacancy.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("az-AZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
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
                  Vakansiyalar İdarəetməsi
                </h1>
                <p className="text-gray-600">
                  Vakansiyaları əlavə edin, redaktə edin və silin
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
        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Vakansiya axtar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-400 w-4 h-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="all">Bütün statuslar</option>
                  <option value="Aktiv">Aktiv</option>
                  <option value="Bağlı">Bağlı</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleAddVacancy}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
            >
              <FaPlus className="w-4 h-4" />
              <span>Yeni Vakansiya</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        {/* Vacancies List */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Vakansiyalar yüklənir...</p>
            </div>
          ) : filteredVacancies.length === 0 ? (
            <div className="text-center py-12">
              <FaSuitcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Vakansiya tapılmadı</p>
              <p className="text-gray-500">
                Yeni vakansiya əlavə etmək üçün yuxarıdakı düyməni istifadə edin
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vakansiya
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Şirkət
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Maaş
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarix
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Əməliyyatlar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVacancies.map((vacancy) => (
                    <tr key={vacancy.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {vacancy.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {vacancy.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vacancy.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vacancy.salary}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            vacancy.status === "Aktiv"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {vacancy.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(vacancy.postedDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditVacancy(vacancy)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Redaktə et"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteModal(vacancy.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Sil"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showAddModal && editingVacancy && (
        <VacancyModal
          vacancy={editingVacancy}
          onSave={handleSaveVacancy}
          onClose={() => {
            setShowAddModal(false);
            setEditingVacancy(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          onConfirm={() => handleDeleteVacancy(showDeleteModal)}
          onCancel={() => setShowDeleteModal(null)}
          vacancyTitle={
            vacancies.find((v) => v.id === showDeleteModal)?.title || ""
          }
        />
      )}
    </div>
  );
}

// Vacancy Modal Component
function VacancyModal({
  vacancy,
  onSave,
  onClose,
}: {
  vacancy: Vacancy;
  onSave: (vacancy: Vacancy) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(vacancy);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleArrayFieldChange = (
    field: "requirements" | "benefits",
    value: string
  ) => {
    const items = value
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    setFormData((prev) => ({ ...prev, [field]: items }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {vacancy.id ? "Vakansiya Redaktə Et" : "Yeni Vakansiya Əlavə Et"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vakansiya Başlığı *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şirkət *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yer *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İş Növü *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maaş
                </label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, salary: e.target.value }))
                  }
                  placeholder="3000-5000 AZN"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Təcrübə
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                  placeholder="3-5 il"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yerləşdirilmə Tarixi
                </label>
                <input
                  type="date"
                  value={formData.postedDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      postedDate: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Son Müraciət Tarixi
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      deadline: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="Aktiv">Aktiv</option>
                  <option value="Bağlı">Bağlı</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Müraciət Linki
                </label>
                <input
                  type="url"
                  value={formData.applicationLink || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      applicationLink: e.target.value,
                    }))
                  }
                  placeholder="https://example.com/apply"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Təsvir *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tələblər (hər sətirdə bir)
              </label>
              <textarea
                rows={4}
                value={formData.requirements.join("\n")}
                onChange={(e) =>
                  handleArrayFieldChange("requirements", e.target.value)
                }
                placeholder="C# və .NET Core bilik&#10;SQL Server təcrübəsi&#10;Azure cloud platforması"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Üstünlüklər (hər sətirdə bir)
              </label>
              <textarea
                rows={4}
                value={formData.benefits.join("\n")}
                onChange={(e) =>
                  handleArrayFieldChange("benefits", e.target.value)
                }
                placeholder="Rəqabətli maaş&#10;Səhiyyə sığortası&#10;Təlim imkanları"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                {vacancy.id ? "Yenilə" : "Əlavə et"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteModal({
  onConfirm,
  onCancel,
  vacancyTitle,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  vacancyTitle: string;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Vakansiyanı Sil
          </h3>
          <p className="text-gray-600 mb-6">
            "{vacancyTitle}" vakansiyasını silmək istədiyinizə əminsiniz? Bu
            əməliyyat geri alına bilməz.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Ləğv et
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
            >
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
