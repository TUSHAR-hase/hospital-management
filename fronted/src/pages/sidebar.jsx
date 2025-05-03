import { useState } from 'react';
import { FiHome, FiUser, FiCalendar, FiSettings, FiLogOut, FiChevronLeft, FiMessageSquare, FiFileText } from 'react-icons/fi';
import { RiMedicineBottleLine } from 'react-icons/ri';

const SideNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', icon: <FiHome />, text: 'Dashboard' },
    { id: 'profile', icon: <FiUser />, text: 'Profile' },
    { id: 'appointments', icon: <FiCalendar />, text: 'Appointments', notification: 3 },
    { id: 'prescriptions', icon: <RiMedicineBottleLine />, text: 'Prescriptions' },
    { id: 'reports', icon: <FiFileText />, text: 'Medical Reports' },
    { id: 'messages', icon: <FiMessageSquare />, text: 'Messages' },
    { id: 'settings', icon: <FiSettings />, text: 'Settings' },
  ];

  return (
    <div className={`h-screen bg-gradient-to-b from-indigo-900 to-blue-900 p-6 fixed left-0 top-0 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
      {/* Collapse Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-6 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <FiChevronLeft className={`transition-transform duration-300 ${!isExpanded && 'rotate-180'}`} />
      </button>

      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
          <span className="text-blue-800 font-bold">JD</span>
        </div>
        {isExpanded && (
          <div>
            <h3 className="text-white font-semibold">John Doe</h3>
            <p className="text-blue-200 text-sm">Patient ID: #123456</p>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="space-y-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-white bg-opacity-20 text-white' 
                : 'hover:bg-white hover:bg-opacity-10 text-blue-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {isExpanded && (
              <div className="flex items-center justify-between flex-1">
                <span>{item.text}</span>
                {item.notification && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.notification}
                  </span>
                )}
              </div>
            )}
            {!isExpanded && item.notification && (
              <div className="absolute right-2">
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {item.notification}
                </span>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <button className="w-full flex items-center gap-4 p-3 text-blue-200 hover:bg-white hover:bg-opacity-10 rounded-xl transition-colors">
          <FiLogOut className="text-xl" />
          {isExpanded && 'Logout'}
        </button>
      </div>

      {/* Active Tab Indicator */}
      <div 
        className="absolute right-0 top-0 h-full w-1 bg-white bg-opacity-50 transition-transform duration-300"
        style={{ transform: `translateY(${navItems.findIndex(item => item.id === activeTab) * 56}px)` }}
      />
    </div>
  );
};

export default SideNavbar;