
import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Input } from "@/components/ui/input";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Search } from "lucide-react";

import { Pie, Doughnut } from "react-chartjs-2";
import { ArcElement } from "chart.js";
ChartJS.register(ArcElement);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);
import AdminHomeManager from "../components/admin/AdminHomeManager";
import AdminBlogManager from "../components/admin/AdminBlogManager";
import AdminShopManager from "../components/admin/AdminShopManager";
import AdminSupportManager from "../components/admin/AdminSupportManager";
import AdminSettingsManager from "../components/admin/AdminSettingsManager";
import AdminReferringManager from "../components/admin/AdminReferringManager";
import AdminInvestmentManager from "../components/admin/AdminInvestmentManager";
import AdminFeedbackManager from "../components/admin/AdminFeedbackManager";
import AdminEmploymentManager from "../components/admin/AdminEmploymentManager";
import AdminUploardManager from "@/components/admin/AdminUploardManager";
// import AdminBuyCryptoManager from "../components/admin/AdminBuyCryptoManager";
import "../i18n";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const screens = [
  { label: "Dashboard", key: "dashboard", icon: "📊" },
  //   { label: "Home", key: "home", icon: "🏠" },
  //   { label: "Blog", key: "blog", icon: "📝" },
  { label: "Shop", key: "shop", icon: "🛒" },
  { label: "Support", key: "support", icon: "💬" },
  // { label: "Settings", key: "settings", icon: "⚙️" },
  { label: "Referring", key: "referring", icon: "🔗" },
  { label: "Investment", key: "investment", icon: "💹" },
  { label: "Feedback", key: "feedback", icon: "⭐" },
   { label: "Transaction proofs", key: "proofs", icon: "👔" },
  // { label: "BuyCrypto", key: "buycrypto", icon: "💰" },
];

const AdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  // Set initial dark mode state from localStorage or system preference
  React.useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        // Example data
        const barData = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "New Users",
              data: [65, 59, 80, 81, 56, 55],
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
            {
              label: "Active Users",
              data: [40, 45, 60, 70, 50, 48],
              backgroundColor: "rgba(255, 206, 86, 0.6)",
            },
          ],
        };
        const lineData = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Revenue ($)",
              data: [1200, 1900, 1700, 2200, 2000, 2500],
              fill: false,
              borderColor: "rgba(255, 99, 132, 1)",
              tension: 0.1,
            },
            {
              label: "Expenses ($)",
              data: [800, 1200, 1100, 1500, 1300, 1600],
              fill: false,
              borderColor: "rgba(54, 162, 235, 1)",
              tension: 0.1,
            },
          ],
        };
        const pieData = {
          labels: ["Bitcoin", "Ethereum", "USDT", "Other"],
          datasets: [
            {
              label: "Crypto Distribution",
              data: [40, 30, 20, 10],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)"
              ],
            },
          ],
        };
        const doughnutData = {
          labels: ["Completed", "Pending", "Failed"],
          datasets: [
            {
              label: "Transactions",
              data: [70, 20, 10],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(255, 99, 132, 0.6)"
              ],
            },
          ],
        };
        return (
          <div>
            <h2 className="text-2xl bg-background text-foreground font-semibold mb-4">Site Analytics Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background text-foreground rounded shadow p-4">
                <h3 className="text-lg font-bold mb-2">New vs Active Users</h3>
                <Bar data={barData} />
              </div>
              <div className="bg-background text-foreground rounded shadow p-4">
                <h3 className="text-lg font-bold mb-2">Revenue & Expenses Over Time</h3>
                <Line data={lineData} />
              </div>
              <div className="bg-background text-foreground rounded shadow p-4">
                <h3 className="text-lg font-bold mb-2">Crypto Distribution</h3>
                <Pie data={pieData} />
              </div>
              <div className="bg-background text-foreground rounded shadow p-4">
                <h3 className="text-lg font-bold mb-2">Transaction Status</h3>
                <Doughnut data={doughnutData} />
              </div>
            </div>
          </div>
        );
      case "home":
        return <AdminHomeManager />;
      case "blog":
        return <AdminBlogManager />;
      case "shop":
        return <AdminShopManager />;
      case "support":
        return <AdminSupportManager />;
      case "proofs":
         return <AdminUploardManager />;
      case "referring":
        return <AdminReferringManager />;
      case "investment":
        return <AdminInvestmentManager />;
      case "feedback":
        return <AdminFeedbackManager />;
      // case "employment":
      //   return <AdminEmploymentManager />;
      // case "buycrypto":
      //   return <AdminBuyCryptoManager />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-yellow-900 text-foreground shadow-lg flex flex-col py-8 px-4">
        <h1 className="text-2xl font-bold mb-8 text-blue-700">{t('dashboard')}</h1>
        {/* <LanguageSwitcher /> */}
        <nav className="flex-1">
          {screens.map((screen) => (
            <button
              key={screen.key}
              className={`w-full flex bg-gray-700 items-center gap-3 px-4 py-3 mb-2 rounded-lg text-left transition-all duration-150 font-medium ${activeTab === screen.key ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-200 hover:bg-blue-100"}`}
              onClick={() => setActiveTab(screen.key)}
            >
              <span className="text-xl text-white">{screen.icon}</span>
              {t(screen.key)}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10 ">
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-background shadow-lg rounded-b-xl border-b border-gray-200 dark:border-gray-700 mx-4 mt-2">
          <div className="flex justify-between items-center w-full px-6 py-4">

            {/* Welcome and Title Section */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                CB Admin
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Welcome back, Admin!
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Input */}
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="block w-full rounded-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                title="Toggle dark mode"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {darkMode ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </header>
        {renderTabContent()}
      </main>
    </div>
  );
};

export default AdminPortal;
