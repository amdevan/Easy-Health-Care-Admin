import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  UserPlus, 
  FlaskConical, 
  Image as ImageIcon, 
  ClipboardList, 
  FileText, 
  HelpCircle, 
  Settings, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Users,
  PenTool,
  CreditCard,
  MapPin,
  Video,
  Pill,
  Package,
  Briefcase,
  Info,
  Phone,
  Stethoscope,
  Ambulance,
  HeartHandshake,
  UserCheck,
  User,
  Shield
} from 'lucide-react';
import { NavItem } from '../types';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State to track expanded sections. 
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'UI Setting': true,
    'Users/Roles': true,
    'Settings': false,
  });

  const toggleSection = (label: string) => {
    setExpandedSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const menuItems: NavItem[] = [
    { label: 'Dashboard', path: '/', icon: Home },
    { label: 'Appointments', path: '/appointments', icon: Calendar }, 
    { label: 'Membership', path: '/membership-requests', icon: CreditCard },
    { label: 'Doctors', path: '/doctors', icon: UserPlus },
    { label: 'Patients', path: '/patients', icon: User },
    { label: 'Lab Tests', path: '/lab-tests', icon: FlaskConical },
    { label: 'Health Packages', path: '/health-packages', icon: Package },
    { label: 'NEMT (Transport)', path: '/nemt-requests', icon: Ambulance },
    { label: 'Media', path: '/media', icon: ImageIcon },
    { label: 'Specialties', path: '/specialties', icon: ClipboardList },
  ];

  const uiSettingsItems: NavItem[] = [
    { label: 'Articles', path: '/articles', icon: FileText, badge: 3 },
    { label: 'Lab Tests', path: '/cms/lab-tests', icon: FlaskConical },
    { label: 'Membership', path: '/cms/membership', icon: CreditCard },
    { label: 'Clinics & Locations', path: '/cms/clinics', icon: MapPin },
    { label: 'Primary Health Care', path: '/cms/primary-care', icon: Stethoscope },
    { label: 'Telemedicine', path: '/cms/telemedicine', icon: Video },
    { label: 'Easy Pharmacy', path: '/cms/pharmacy', icon: Pill },
    { label: 'Health Package', path: '/cms/health-packages', icon: Package },
    { label: 'Insurance Partners', path: '/cms/insurance', icon: Shield },
    { label: 'NEMT (Transport)', path: '/cms/nemt', icon: Ambulance },
    { label: 'Community Programs', path: '/cms/community-programs', icon: HeartHandshake },
    { label: 'Our Services', path: '/cms/services', icon: Briefcase },
    { label: 'About Us', path: '/cms/about', icon: Info },
    { label: 'Board of Directors', path: '/cms/board', icon: Users },
    { label: 'Management Team', path: '/cms/management', icon: UserCheck },
    { label: 'Contact', path: '/cms/contact', icon: Phone },
    { label: 'Banners', path: '/banners', icon: ImageIcon, badge: 2 },
    { label: 'Faqs', path: '/faqs', icon: HelpCircle, badge: 2 },
    { label: 'Footer setting', path: '/footer-settings', icon: Settings, badge: 1 },
    { label: 'Header setting', path: '/header-settings', icon: Settings, badge: 1 },
    { label: 'Testimonials', path: '/testimonials', icon: MessageSquare, badge: 2 },
  ];

  const userRoleItems: NavItem[] = [
    { label: 'Roles', path: '/roles', icon: PenTool },
    { label: 'Users', path: '/users', icon: Users, badge: 2 },
  ];

  const renderMenuItem = (item: NavItem, isSubItem = false) => {
    const isActive = location.pathname === item.path;
    
    // Exact styling from the image: 
    // Active: text-orange-500 bg-orange-50 (faint orange bg)
    // Inactive: text-gray-600 hover:bg-gray-50
    const activeClasses = "text-orange-500 bg-orange-50 font-medium";
    const inactiveClasses = "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
    
    return (
      <div 
        key={item.label}
        onClick={() => {
          if (item.path) {
            navigate(item.path);
            if (window.innerWidth < 1024) setMobileOpen(false);
          }
        }}
        className={`
          flex items-center justify-between px-4 py-3 mx-2 rounded-lg cursor-pointer transition-colors duration-200
          ${isActive ? activeClasses : inactiveClasses}
          ${isSubItem ? 'pl-4' : ''}
        `}
      >
        <div className="flex items-center gap-3">
          {item.icon && <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />}
          <span className="text-sm truncate">{item.label}</span>
        </div>
        {item.badge !== undefined && (
          <span className={`
            text-xs font-semibold px-2 py-0.5 rounded-md
            ${isActive ? 'bg-orange-100 text-orange-600' : 'bg-orange-100 text-orange-600'}
          `}>
            {item.badge}
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white border-r border-gray-100 h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3 border-b border-gray-50">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
            E
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <h1 className="font-bold text-base text-gray-800 leading-tight truncate">Easy Health CMS</h1>
            <span className="text-[10px] text-gray-500 font-medium truncate">by IT Relevant</span>
          </div>
        </div>

        {/* Scrollable Menu Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-4">
          
          {/* Main Menu */}
          <div className="space-y-1 mb-2">
            {menuItems.map(item => renderMenuItem(item))}
          </div>

          {/* UI Setting Section (Expanded by default in image) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-6 py-2 cursor-pointer text-gray-400 hover:text-gray-600" onClick={() => toggleSection('UI Setting')}>
                <span className="text-sm">UI Setting</span>
                {expandedSections['UI Setting'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
            
            {expandedSections['UI Setting'] && (
              <div className="pl-2 space-y-1">
                {uiSettingsItems.map(item => renderMenuItem(item, true))}
              </div>
            )}
          </div>

          {/* Users/Roles Section */}
          <div className="mt-4 space-y-1">
             <div className="flex items-center justify-between px-6 py-2 cursor-pointer text-gray-400 hover:text-gray-600" onClick={() => toggleSection('Users/Roles')}>
                <span className="text-sm">Users/Roles</span>
                {expandedSections['Users/Roles'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
            
            {expandedSections['Users/Roles'] && (
              <div className="pl-2 space-y-1">
                {userRoleItems.map(item => renderMenuItem(item, true))}
              </div>
            )}
          </div>

           {/* Settings Section (Collapsed) */}
           <div className="mt-4">
            <div 
                onClick={() => toggleSection('Settings')}
                className="flex items-center justify-between px-6 py-2 cursor-pointer text-gray-400 hover:text-gray-600"
            >
                <span className="text-sm">Settings</span>
                {expandedSections['Settings'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
           </div>

        </div>

        {/* User Profile Snippet at Bottom */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            <img 
              src="https://picsum.photos/40/40" 
              alt="User" 
              className="w-9 h-9 rounded-full object-cover border border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Dr. Alex Morgan</p>
              <p className="text-xs text-gray-500 truncate">Administrator</p>
            </div>
            <Settings size={16} className="text-gray-400" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;