"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaFileAlt,
  FaBriefcase,
  FaPlus,
  FaUserCog,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userStats, setUserStats] = useState({
    total: 0,
    working: 0,
    notWorking: 0,
    recentGraduates: 0,
    careerServices: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchUserStats();
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      // Get all users for stats (first 1000 should be enough for stats)
      const response = await fetch("/api/users?page=1&limit=1000");
      const data = await response.json();

      if (response.ok) {
        const users = data.users;
        const working = users.filter(
          (user: any) => user.workingInField === "Bəli"
        ).length;
        const notWorking = users.filter(
          (user: any) => user.workingInField === "Xeyr"
        ).length;

        // Recent graduates (last 2 years)
        const currentYear = new Date().getFullYear();
        const recentGraduates = users.filter((user: any) => {
          const gradYear = parseInt(user.graduationYear || "0");
          return gradYear >= currentYear - 2 && gradYear <= currentYear;
        }).length;

        // Users interested in career services
        const careerServices = users.filter(
          (user: any) =>
            user.careerServices && user.careerServices.trim() !== ""
        ).length;

        setUserStats({
          total: data.total, // Use total from API response
          working,
          notWorking,
          recentGraduates,
          careerServices,
        });
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">
                SDU Karyera Portalı İdarəetmə Paneli
              </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaUsers className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Ümumi İstifadəçilər
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {loading ? "..." : userStats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaBriefcase className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">İşləyən</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {loading ? "..." : userStats.working}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FaFileAlt className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Son 2 İl Məzunları
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {loading ? "..." : userStats.recentGraduates}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaChartBar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Karyera Xidmətləri
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {loading ? "..." : userStats.careerServices}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Sürətli Əməliyyatlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-white rounded-lg shadow p-4 text-left hover:shadow-md transition duration-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaPlus className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Yeni Elan</p>
                  <p className="text-sm text-gray-600">Elan əlavə et</p>
                </div>
              </div>
            </button>

            <button className="bg-white rounded-lg shadow p-4 text-left hover:shadow-md transition duration-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FaBriefcase className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Vakansiya</p>
                  <p className="text-sm text-gray-600">Vakansiya əlavə et</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => router.push("/admin/users")}
              className="bg-white rounded-lg shadow p-4 text-left hover:shadow-md transition duration-200"
            >
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaUserCog className="w-5 h-5 text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">İstifadəçilər</p>
                  <p className="text-sm text-gray-600">
                    İstifadəçiləri idarə et
                  </p>
                </div>
              </div>
            </button>

            <button className="bg-white rounded-lg shadow p-4 text-left hover:shadow-md transition duration-200">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FaChartBar className="w-5 h-5 text-orange-600" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Statistika</p>
                  <p className="text-sm text-gray-600">Statistikaları gör</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Son Fəaliyyətlər
          </h2>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Məlumatlar yüklənir...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        Ümumi {userStats.total} istifadəçi qeydiyyatdan keçib
                      </p>
                      <p className="text-xs text-gray-500">
                        Google Sheets-dən güncəl məlumat
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {userStats.working} istifadəçi ixtisasına uyğun işləyir
                      </p>
                      <p className="text-xs text-gray-500">
                        İş vəziyyəti statistikası
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {userStats.recentGraduates} məzun son 2 ildə məzun olub
                      </p>
                      <p className="text-xs text-gray-500">
                        Məzuniyyət ili statistikası
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {userStats.careerServices} istifadəçi karyera
                        xidmətlərindən istifadə edir
                      </p>
                      <p className="text-xs text-gray-500">
                        Karyera xidmətləri statistikası
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
