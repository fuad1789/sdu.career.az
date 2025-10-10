"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheck, FaTimes, FaEye, FaSignOutAlt } from "react-icons/fa";

interface PendingRegistration {
  id: string;
  timestamp: string;
  fullName: string;
  email: string;
  graduationYear: string;
  phone: string;
  specialty: string;
  workingInField: string;
  workField: string;
  workplace: string;
  careerServices: string;
  additionalNotes: string;
}

export default function PendingRegistrations() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingRegistrations, setPendingRegistrations] = useState<
    PendingRegistration[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] =
    useState<PendingRegistration | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchPendingRegistrations();
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  const fetchPendingRegistrations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/pending-registrations");
      const data = await response.json();

      if (response.ok) {
        setPendingRegistrations(data.registrations || []);
      } else {
        console.error("Failed to fetch pending registrations:", data.error);
      }
    } catch (error) {
      console.error("Error fetching pending registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (registrationId: string) => {
    try {
      setActionLoading(registrationId);
      const response = await fetch(
        `/api/admin/approve-registration/${registrationId}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        // Remove from pending list
        setPendingRegistrations((prev) =>
          prev.filter((reg) => reg.id !== registrationId)
        );
        setShowModal(false);
        setSelectedRegistration(null);
      } else {
        const data = await response.json();
        alert(`Xəta: ${data.error}`);
      }
    } catch (error) {
      console.error("Error approving registration:", error);
      alert("Xəta baş verdi");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (registrationId: string, reason: string) => {
    try {
      setActionLoading(registrationId);
      const response = await fetch(
        `/api/admin/reject-registration/${registrationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason }),
        }
      );

      if (response.ok) {
        // Remove from pending list
        setPendingRegistrations((prev) =>
          prev.filter((reg) => reg.id !== registrationId)
        );
        setShowModal(false);
        setSelectedRegistration(null);
      } else {
        const data = await response.json();
        alert(`Xəta: ${data.error}`);
      }
    } catch (error) {
      console.error("Error rejecting registration:", error);
      alert("Xəta baş verdi");
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  const openModal = (registration: PendingRegistration) => {
    setSelectedRegistration(registration);
    setShowModal(true);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Pending Qeydiyyatlar
              </h1>
              <p className="text-sm text-gray-600">
                Gözləyən məzun qeydiyyatları
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                Çıxış
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : pendingRegistrations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Gözləyən qeydiyyat yoxdur
            </h3>
            <p className="text-gray-600">
              Hal-hazırda təsdiq gözləyən məzun qeydiyyatı yoxdur.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Gözləyən Qeydiyyatlar ({pendingRegistrations.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarix
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ad Soyad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Məzun İli
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İxtisas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Əməliyyatlar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingRegistrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registration.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registration.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registration.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registration.graduationYear}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registration.specialty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openModal(registration)}
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
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedRegistration && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Qeydiyyat Detalları
                </h3>
                <button
                  onClick={() => setShowModal(false)}
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
                      {selectedRegistration.fullName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedRegistration.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Telefon
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedRegistration.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Məzun İli
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedRegistration.graduationYear}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      İxtisas
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedRegistration.specialty}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      İxtisasa Uyğun İşləyir
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedRegistration.workingInField}
                    </p>
                  </div>
                  {selectedRegistration.workField && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        İş Sahəsi
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedRegistration.workField}
                      </p>
                    </div>
                  )}
                  {selectedRegistration.workplace && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        İş Yeri
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedRegistration.workplace}
                      </p>
                    </div>
                  )}
                  {selectedRegistration.careerServices && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Karyera Xidmətləri
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedRegistration.careerServices}
                      </p>
                    </div>
                  )}
                  {selectedRegistration.additionalNotes && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Əlavə Qeyd
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedRegistration.additionalNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    if (confirm("Rədd etmək istədiyinizdən əminsiniz?")) {
                      handleReject(
                        selectedRegistration.id,
                        "Admin tərəfindən rədd edildi"
                      );
                    } else {
                      return;
                    }
                  }}
                  disabled={actionLoading === selectedRegistration.id}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
                >
                  {actionLoading === selectedRegistration.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <FaTimes className="w-4 h-4 mr-2" />
                  )}
                  Rədd Et
                </button>
                <button
                  onClick={() => {
                    if (confirm("Təsdiq etmək istədiyinizdən əminsiniz?")) {
                      handleApprove(selectedRegistration.id);
                    } else {
                      return;
                    }
                  }}
                  disabled={actionLoading === selectedRegistration.id}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
                >
                  {actionLoading === selectedRegistration.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <FaCheck className="w-4 h-4 mr-2" />
                  )}
                  Təsdiq Et
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
