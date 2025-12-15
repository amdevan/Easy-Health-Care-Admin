import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Menu, Search, Bell, CheckCircle, Clock, XCircle, AlertCircle, Settings, ChevronDown, ChevronUp, Eye, FileText, Edit2, Trash2, Save, Plus, UserPlus, User, CalendarDays, CheckSquare, Package, Ambulance, Star, Phone, Mail, Stethoscope, Truck, MapPin, Users, Key, CreditCard, Activity, ArrowLeft, Pill, DollarSign, TrendingUp, BarChart3, Filter, Shield, Lock, Upload, Check, RefreshCw, Image as ImageIcon, Video, File, Crown } from 'lucide-react';
import { generateAppointments, generateArticles, generateCMSContent, generateMembershipRequests, generatePatients, generateHealthPackageRequests, generateNemtRequests, generateDoctors, generateVehicles, generateHealthPackages, generateRoles, generateUsers, generateMediaItems } from './services/geminiService';
import { Appointment, Article, CMSItem, MembershipRequest, Patient, HealthPackageRequest, NemtRequest, Doctor, Vehicle, HealthPackage, Role, User as UserType, MediaItem } from './types';

// --- Page Components ---

const DashboardHome = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  useEffect(() => {
    const fetch = async () => {
        // Fetch appointments for the "Today's Appointments" widget
        const data = await generateAppointments();
        setAppointments(data.slice(0, 5)); 
    };
    fetch();
  }, []);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500">Welcome back, Dr. Alex Morgan</p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm flex items-center gap-2">
            <CalendarDays size={16} className="text-orange-500" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Patients', value: '14,205', trend: '+12%', trendUp: true, icon: Users, color: 'bg-blue-500' },
          { label: 'Appointments Today', value: '105', trend: '+5%', trendUp: true, icon: CalendarDays, color: 'bg-orange-500' },
          { label: 'Pending Requests', value: '28', trend: '-2%', trendUp: false, icon: Clock, color: 'bg-red-500' },
          { label: 'Total Earnings', value: '$24,500', trend: '+18%', trendUp: true, icon: CreditCard, color: 'bg-purple-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1 duration-200">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white shadow-md`}>
                    <stat.icon size={24} />
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {stat.trend}
                </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area (Simulated) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Hospital Survey</h3>
                <select className="text-sm border-gray-200 border rounded-md px-2 py-1 outline-none text-gray-500 bg-transparent cursor-pointer hover:border-orange-200 transition-colors">
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                </select>
            </div>
            
            {/* Simple CSS Bar Chart Simulation */}
            <div className="h-64 flex items-end justify-between gap-2 px-2 border-b border-gray-100 pb-2">
                {[40, 65, 45, 80, 55, 70, 40, 60, 75, 50, 65, 85].map((h, i) => (
                    <div key={i} className="w-full bg-blue-50 rounded-t-sm relative group h-full flex flex-col justify-end">
                        <div 
                            className="w-full bg-blue-500 rounded-t-sm transition-all duration-500 group-hover:bg-blue-600 relative" 
                            style={{ height: `${h}%` }}
                        >
                            {/* Tooltip */}
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded pointer-events-none transition-opacity whitespace-nowrap z-10">
                                {h}% Activity
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium px-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                    <span key={m}>{m}</span>
                ))}
            </div>
          </div>

          {/* Recent Appointments / Activity */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Today's Schedule</h3>
                <span className="text-xs font-medium text-orange-500 cursor-pointer hover:underline">View All</span>
             </div>
             
             <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {appointments.length === 0 ? (
                    <div className="text-center text-gray-400 py-10 flex flex-col items-center">
                        <div className="w-6 h-6 border-2 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-2"></div>
                        <span className="text-xs">Loading schedule...</span>
                    </div>
                ) : (
                    appointments.map((apt, idx) => (
                        <div key={apt.id || idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 group cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm shrink-0 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                                {apt.patientName.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h4 className="font-semibold text-gray-800 text-sm truncate">{apt.patientName}</h4>
                                    <span className="text-xs font-bold text-gray-900">{apt.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-gray-500 truncate w-2/3">{apt.specialty}</p>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                        apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                                        apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                                        apt.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-600'
                                    }`}>
                                        {apt.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
             </div>
          </div>
      </div>

      {/* Quick Actions Row */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to your command center</h2>
                  <p className="text-blue-100 max-w-lg">Manage your hospital operations efficiently. Create records, book appointments, or manage reports instantly from here.</p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                  <button className="bg-white text-blue-700 px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-50 hover:scale-105 transition-all flex items-center gap-2 text-sm">
                      <CalendarDays size={18} /> Book Appointment
                  </button>
                  <button className="bg-blue-500/30 backdrop-blur-sm border border-blue-400 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-500/50 transition-all flex items-center gap-2 text-sm">
                      <UserPlus size={18} /> Register Patient
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

const PatientDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(location.state?.patient || null);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'medications'>('overview');
  
  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
      name: '',
      age: '',
      gender: 'Male',
      contact: '',
      condition: '',
      status: 'Active'
  });

  // Simulation of detailed data
  const patientDetails = {
    bloodType: 'O+',
    height: '178 cm',
    weight: '75 kg',
    allergies: ['Penicillin', 'Peanuts'],
    address: '123 Health Avenue, Medical District, NY',
    email: 'patient@example.com',
    emergencyContact: 'Jane Doe (Wife) - 555-0199',
    insuranceProvider: 'BlueCross Health',
    policyNumber: 'HC-99887766'
  };

  useEffect(() => {
    if (!patient) {
       // Mock fallback for direct URL access
       setPatient({
           id: id || '1',
           name: 'Loaded Patient ' + (id || ''),
           age: 35,
           gender: 'Female' as any,
           contact: '555-0123',
           lastVisit: '2023-11-01',
           condition: 'Routine Checkup',
           status: 'Active' as any
       });
    }
  }, [id, patient]);

  const handleEditOpen = () => {
    if (patient) {
        setFormData({
            name: patient.name,
            age: patient.age.toString(),
            gender: patient.gender,
            contact: patient.contact,
            condition: patient.condition,
            status: patient.status
        });
        setIsEditModalOpen(true);
    }
  };

  const handleSaveProfile = () => {
      if (patient) {
          setPatient({
              ...patient,
              ...formData,
              age: parseInt(formData.age) || 0,
              gender: formData.gender as any,
              status: formData.status as any
          });
          setIsEditModalOpen(false);
      }
  };

  if (!patient) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
        {/* Navigation */}
        <button 
            onClick={() => navigate('/patients')} 
            className="group flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-6 transition-colors"
        >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Patient List</span>
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-orange-500 text-3xl font-bold border-4 border-white shadow-lg">
                        {patient.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{patient.name}</h1>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><User size={16} /> {patient.age} yrs, {patient.gender}</span>
                            <span className="flex items-center gap-1"><MapPin size={16} /> {patientDetails.address}</span>
                            <span className="flex items-center gap-1"><Phone size={16} /> {patient.contact}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                     <button 
                        onClick={handleEditOpen}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
                     >
                        Edit Profile
                     </button>
                     <button className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 shadow-lg shadow-orange-200">
                        Book Appointment
                     </button>
                </div>
            </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Quick Stats & Info */}
            <div className="space-y-8">
                {/* Vitals Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Activity size={18} className="text-orange-500" /> Vitals & Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Blood Type</p>
                            <p className="font-semibold text-gray-800">{patientDetails.bloodType}</p>
                        </div>
                         <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Height</p>
                            <p className="font-semibold text-gray-800">{patientDetails.height}</p>
                        </div>
                         <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Weight</p>
                            <p className="font-semibold text-gray-800">{patientDetails.weight}</p>
                        </div>
                         <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Status</p>
                            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {patient.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Medical Info */}
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <AlertCircle size={18} className="text-orange-500" /> Medical Info
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Primary Condition</p>
                            <p className="font-medium text-gray-800">{patient.condition}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Allergies</p>
                            <div className="flex flex-wrap gap-2">
                                {patientDetails.allergies.map(a => (
                                    <span key={a} className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-md border border-red-100">{a}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Insurance</p>
                            <p className="font-medium text-gray-800">{patientDetails.insuranceProvider}</p>
                            <p className="text-xs text-gray-400">{patientDetails.policyNumber}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Tabs */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                    {/* Tabs Header */}
                    <div className="flex border-b border-gray-100">
                        {['overview', 'history', 'medications'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-6 py-4 text-sm font-medium capitalize transition-colors relative ${
                                    activeTab === tab ? 'text-orange-500 bg-orange-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {tab}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'overview' && (
                           <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-3">Recent Activity</h4>
                                    <div className="border-l-2 border-gray-100 ml-3 space-y-6 py-2">
                                        <div className="relative pl-6">
                                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-100 border-2 border-green-500"></div>
                                            <p className="text-sm text-gray-500 mb-0.5">{patient.lastVisit}</p>
                                            <p className="font-medium text-gray-900">General Checkup with Dr. House</p>
                                            <p className="text-sm text-gray-600 mt-1">Patient reported feeling better. BP 120/80.</p>
                                        </div>
                                         <div className="relative pl-6">
                                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                                            <p className="text-sm text-gray-500 mb-0.5">2023-09-15</p>
                                            <p className="font-medium text-gray-900">Lab Results Uploaded</p>
                                            <p className="text-sm text-gray-600 mt-1">Complete Blood Count (CBC) results available.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-3">Upcoming Appointments</h4>
                                     <div className="p-4 bg-orange-50 rounded-lg border border-orange-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-orange-500 shadow-sm">
                                                <CalendarDays size={20} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">Cardiology Consultation</p>
                                                <p className="text-xs text-gray-600">Nov 24, 2023 at 10:00 AM</p>
                                            </div>
                                        </div>
                                        <button className="text-sm text-orange-600 font-medium hover:underline">Reschedule</button>
                                     </div>
                                </div>
                           </div>
                        )}

                        {activeTab === 'medications' && (
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 mb-2">Active Prescriptions</h4>
                                {[
                                    { name: 'Lisinopril', dosage: '10mg', freq: 'Once daily', doctor: 'Dr. House', date: '2023-10-01' },
                                    { name: 'Atorvastatin', dosage: '20mg', freq: 'Before bed', doctor: 'Dr. House', date: '2023-10-01' },
                                    { name: 'Metformin', dosage: '500mg', freq: 'Twice daily with meals', doctor: 'Dr. Cuddy', date: '2023-09-15' }
                                ].map((med, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-orange-200 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                                <Pill size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{med.name} <span className="text-sm font-normal text-gray-500">({med.dosage})</span></p>
                                                <p className="text-xs text-gray-500">{med.freq}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">Prescribed by {med.doctor}</p>
                                            <p className="text-xs text-gray-400">{med.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div>
                                <h4 className="font-bold text-gray-800 mb-4">Visit History</h4>
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-500">
                                        <tr>
                                            <th className="px-4 py-3 rounded-l-lg">Date</th>
                                            <th className="px-4 py-3">Doctor</th>
                                            <th className="px-4 py-3">Type</th>
                                            <th className="px-4 py-3">Diagnosis</th>
                                            <th className="px-4 py-3 rounded-r-lg text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { date: '2023-11-01', doctor: 'Dr. House', type: 'Checkup', diag: 'Hypertension' },
                                            { date: '2023-09-15', doctor: 'Dr. Cuddy', type: 'Specialist', diag: 'Diabetes T2' },
                                            { date: '2023-06-10', doctor: 'Dr. Wilson', type: 'Oncology', diag: 'Screening (Negative)' },
                                            { date: '2023-01-20', doctor: 'Dr. House', type: 'Emergency', diag: 'Migraine' },
                                        ].map((visit, i) => (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-gray-600">{visit.date}</td>
                                                <td className="px-4 py-3 font-medium text-gray-900">{visit.doctor}</td>
                                                <td className="px-4 py-3 text-gray-600">{visit.type}</td>
                                                <td className="px-4 py-3 text-gray-600">{visit.diag}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button className="text-orange-500 hover:text-orange-600 text-xs font-medium">View Report</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-gray-900">Edit Patient Profile</h3>
                        <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <XCircle size={20} />
                        </button>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input 
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                <input 
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select 
                                    value={formData.gender}
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                            <input 
                                type="text"
                                value={formData.contact}
                                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Condition</label>
                            <input 
                                type="text"
                                value={formData.condition}
                                onChange={(e) => setFormData({...formData, condition: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                        <button 
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSaveProfile}
                            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                        >
                            <Save size={16} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    generateAppointments().then(data => {
      setAppointments(data);
      setLoading(false);
    });
  }, []);

  const filteredAppointments = appointments.filter(apt => {
      const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
      const matchesDate = dateFilter === '' || apt.date === dateFilter;
      return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search appointments..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 w-full md:w-64 transition-all shadow-sm"
                />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
                 <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                 <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 cursor-pointer appearance-none shadow-sm"
                 >
                    <option value="All">All Status</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                 </select>
                 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Date Filter */}
             <div className="relative">
                <input 
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 text-gray-600 cursor-pointer shadow-sm"
                />
                {dateFilter && (
                    <button 
                        onClick={() => setDateFilter('')}
                        className="absolute right-8 top-1/2 -translate-y-1/2 hover:text-red-500 text-gray-400"
                        title="Clear Date"
                    >
                        <XCircle size={14} />
                    </button>
                )}
            </div>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">{apt.patientName}</td>
                      <td className="px-6 py-4 text-gray-600">{apt.doctorName}<br/><span className="text-xs text-gray-400">{apt.specialty}</span></td>
                      <td className="px-6 py-4 text-gray-600">{apt.date} at {apt.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                          apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          apt.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>{apt.status}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{apt.notes}</td>
                    </tr>
                  ))
              ) : (
                  <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                          <div className="flex flex-col items-center gap-2">
                                <Search size={24} className="opacity-20" />
                                <p>No appointments found matching filters.</p>
                          </div>
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
};

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [bulkData, setBulkData] = useState('');

  const [formData, setFormData] = useState({
      name: '',
      specialty: '',
      contact: '',
      email: '',
      availability: '',
      status: 'Active',
      rating: 5,
      experience: '',
      image: ''
  });

  useEffect(() => {
    generateDoctors().then(setDoctors);
  }, []);

  const handleCreate = () => {
      setEditingDoctor(null);
      setFormData({
          name: '',
          specialty: '',
          contact: '',
          email: '',
          availability: '',
          status: 'Active',
          rating: 5,
          experience: '',
          image: ''
      });
      setIsModalOpen(true);
  };

  const handleEdit = (doc: Doctor) => {
      setEditingDoctor(doc);
      setFormData({
          name: doc.name,
          specialty: doc.specialty,
          contact: doc.contact,
          email: doc.email,
          availability: doc.availability,
          status: doc.status,
          rating: doc.rating,
          experience: doc.experience,
          image: doc.image || ''
      });
      setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
      if (window.confirm('Are you sure you want to delete this doctor?')) {
          setDoctors(doctors.filter(d => d.id !== id));
          if (selectedDocs.has(id)) {
              const newSelected = new Set(selectedDocs);
              newSelected.delete(id);
              setSelectedDocs(newSelected);
          }
      }
  };

  const handleSave = () => {
      if (!formData.name || !formData.specialty) return;

      if (editingDoctor) {
          setDoctors(doctors.map(d => d.id === editingDoctor.id ? {
              ...d,
              ...formData,
              status: formData.status as any
          } : d));
      } else {
          const newDoc: Doctor = {
              id: Math.random().toString(36).substr(2, 9),
              ...formData,
              status: formData.status as any
          };
          setDoctors([newDoc, ...doctors]);
      }
      setIsModalOpen(false);
  };

  // Selection Logic
  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedDocs);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedDocs(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedDocs.size === filteredDoctors.length) {
      setSelectedDocs(new Set());
    } else {
      setSelectedDocs(new Set(filteredDoctors.map(d => d.id)));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedDocs.size} doctors?`)) {
        setDoctors(doctors.filter(d => !selectedDocs.has(d.id)));
        setSelectedDocs(new Set());
    }
  };

  const handleBulkImport = () => {
      if (!bulkData.trim()) return;
      
      const lines = bulkData.trim().split('\n');
      const newDocs: Doctor[] = [];
      
      lines.forEach(line => {
          // Simple CSV: Name, Specialty, Email
          const parts = line.split(',');
          if (parts.length >= 2) {
             const name = parts[0].trim();
             const specialty = parts[1].trim();
             const email = parts[2] ? parts[2].trim() : `${name.toLowerCase().replace(/\s/g, '.')}@example.com`;
             
             newDocs.push({
                 id: Math.random().toString(36).substr(2, 9),
                 name,
                 specialty,
                 email,
                 contact: '555-0000',
                 availability: 'Mon-Fri 9-5',
                 status: 'Active',
                 rating: 5.0,
                 experience: '1 year'
             });
          }
      });
      
      setDoctors([...doctors, ...newDocs]);
      setBulkData('');
      setIsBulkModalOpen(false);
  };

  const generateRandomAvatar = () => {
      setFormData({...formData, image: `https://i.pravatar.cc/150?u=${Math.random()}`});
  };

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Doctors Directory</h1>
            <p className="text-gray-500 text-sm">Manage medical staff, schedules, and profiles.</p>
        </div>
        <div className="flex gap-3">
             <button 
                onClick={() => setIsBulkModalOpen(true)}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
            >
                <Upload size={16} /> Bulk Import
            </button>
            <button 
                onClick={handleCreate}
                className="bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2"
            >
                <Plus size={16} /> Add Doctor
            </button>
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
                type="text" 
                placeholder="Search by name, specialty, or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 w-full shadow-sm"
            />
        </div>
        
        {selectedDocs.size > 0 && (
            <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-right-4 duration-200">
                <span className="text-sm text-blue-700 font-medium">{selectedDocs.size} Selected</span>
                <div className="h-4 w-px bg-blue-200"></div>
                <button onClick={handleBulkDelete} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
                    <Trash2 size={14} /> Delete Selected
                </button>
            </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div 
            onClick={handleSelectAll}
            className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                selectedDocs.size === filteredDoctors.length && filteredDoctors.length > 0
                ? 'bg-blue-500 border-blue-500 text-white' 
                : 'border-gray-300 bg-white hover:border-blue-300'
            }`}
        >
            {selectedDocs.size === filteredDoctors.length && filteredDoctors.length > 0 && <Check size={14} />}
        </div>
        <span className="text-sm text-gray-500 select-none">Select All Doctors</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div 
            key={doc.id} 
            className={`bg-white p-6 rounded-xl shadow-sm border transition-all relative group ${
                selectedDocs.has(doc.id) ? 'border-blue-300 ring-1 ring-blue-100' : 'border-gray-100 hover:border-orange-200'
            }`}
          >
            {/* Checkbox */}
            <div 
                onClick={(e) => { e.stopPropagation(); toggleSelect(doc.id); }}
                className={`absolute top-4 left-4 z-10 w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                    selectedDocs.has(doc.id) 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-white border-gray-200 opacity-0 group-hover:opacity-100 hover:border-blue-300'
                }`}
            >
                {selectedDocs.has(doc.id) && <Check size={12} />}
            </div>

            <div className="flex items-start justify-between pl-8">
               {/* Avatar Image */}
               {doc.image ? (
                   <img src={doc.image} alt={doc.name} className="w-14 h-14 rounded-full object-cover border border-gray-100 shadow-sm" />
               ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shadow-sm border border-white">
                    {doc.name.charAt(4)}
                  </div>
               )}
              
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => handleEdit(doc)} className="text-gray-400 hover:text-blue-600 p-1 bg-gray-50 rounded-md"><Edit2 size={16}/></button>
                 <button onClick={() => handleDelete(doc.id)} className="text-gray-400 hover:text-red-500 p-1 bg-gray-50 rounded-md"><Trash2 size={16}/></button>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-start mb-1">
                 <h3 className="font-bold text-gray-900 text-lg">{doc.name}</h3>
              </div>
              <p className="text-sm text-orange-500 font-medium mb-3">{doc.specialty}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    doc.status === 'Active' ? 'bg-green-100 text-green-700' : 
                    doc.status === 'On Leave' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                 }`}>{doc.status}</span>
                 <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                    <Clock size={10} /> {doc.availability || 'Not Set'}
                 </span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-500 pt-4 border-t border-gray-50">
               <div className="flex items-center gap-2 truncate" title={doc.contact}><Phone size={14} className="text-gray-400"/> {doc.contact}</div>
               <div className="flex items-center gap-2 truncate" title={doc.email}><Mail size={14} className="text-gray-400"/> {doc.email}</div>
            </div>
            
            <div className="mt-3 flex justify-between items-center text-sm">
                <span className="flex items-center gap-1 text-yellow-500 font-medium"><Star size={14} fill="currentColor"/> {doc.rating}</span>
                <span className="text-gray-400 text-xs">{doc.experience || 'N/A'} exp</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Import Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900">Bulk Import Doctors</h3>
                    <button onClick={() => setIsBulkModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <XCircle size={20} />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">Paste doctor data in CSV format:</p>
                    <div className="bg-gray-50 p-2 rounded border border-gray-200 text-xs font-mono text-gray-500 mb-3">
                        Name, Specialty, Email (Optional)<br/>
                        Dr. John Smith, Cardiology, john@example.com<br/>
                        Dr. Jane Doe, Neurology
                    </div>
                    <textarea 
                        value={bulkData}
                        onChange={(e) => setBulkData(e.target.value)}
                        placeholder="Paste data here..."
                        className="w-full h-40 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm font-mono resize-none"
                    />
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button onClick={() => setIsBulkModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
                    <button onClick={handleBulkImport} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-2">
                        <Upload size={16} /> Import Data
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Doctor Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900">{editingDoctor ? 'Edit Doctor Profile' : 'Add New Doctor'}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <XCircle size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {/* Image Section */}
                    <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center text-gray-400 border border-gray-300">
                            {formData.image ? <img src={formData.image} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon size={24} />}
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-700 mb-1">Profile Image URL</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                                    placeholder="https://example.com/doctor.jpg"
                                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                                />
                                <button 
                                    onClick={generateRandomAvatar}
                                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 text-xs font-medium flex items-center gap-1"
                                    title="Generate Random Avatar"
                                >
                                    <RefreshCw size={14} /> Random
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input 
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                            <input 
                                type="text"
                                value={formData.specialty}
                                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                            <input 
                                type="text"
                                value={formData.contact}
                                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input 
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Availability / Schedule</label>
                            <input 
                                type="text"
                                value={formData.availability}
                                onChange={(e) => setFormData({...formData, availability: e.target.value})}
                                placeholder="e.g. Mon-Fri 9AM-5PM"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white"
                            >
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                            <input 
                                type="number"
                                min="0" max="5" step="0.1"
                                value={formData.rating}
                                onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                            <input 
                                type="text"
                                value={formData.experience}
                                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                placeholder="e.g. 10 years"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                    >
                        <Save size={16} />
                        {editingDoctor ? 'Save Changes' : 'Add Doctor'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    generatePatients().then(setPatients);
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.contact.includes(searchTerm) || 
    p.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-auto">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 w-full sm:w-64 text-sm transition-all shadow-sm"
             />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Age/Gender</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Condition</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {filteredPatients.length > 0 ? (
                    filteredPatients.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                        <td className="px-6 py-4 text-gray-600">{p.age}, {p.gender}</td>
                        <td className="px-6 py-4 text-gray-600">{p.contact}</td>
                        <td className="px-6 py-4 text-gray-600">{p.condition}</td>
                        <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                            p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>{p.status}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                        <button 
                            onClick={() => navigate(`/patients/${p.id}`, { state: { patient: p } })}
                            className="text-orange-500 hover:text-orange-600 font-medium text-sm"
                        >
                            View Details
                        </button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                            <div className="flex flex-col items-center gap-2">
                                <Search size={24} className="opacity-20" />
                                <p>No patients found matching "{searchTerm}"</p>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

const MembershipRequestsPage = () => {
  const [requests, setRequests] = useState<MembershipRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<MembershipRequest | null>(null);
  const [formData, setFormData] = useState<MembershipRequest>({
      id: '',
      memberName: '',
      email: '',
      planType: 'Basic',
      status: 'Pending',
      joinDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    generateMembershipRequests().then(data => {
        setRequests(data);
        setLoading(false);
    });
  }, []);

  const handleCreate = () => {
      setEditingRequest(null);
      setFormData({
          id: Math.random().toString(36).substr(2, 9),
          memberName: '',
          email: '',
          planType: 'Basic',
          status: 'Pending',
          joinDate: new Date().toISOString().split('T')[0]
      });
      setIsModalOpen(true);
  };

  const handleEdit = (req: MembershipRequest) => {
      setEditingRequest(req);
      setFormData({ ...req });
      setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
      if (window.confirm('Are you sure you want to delete this request?')) {
          setRequests(requests.filter(r => r.id !== id));
      }
  };

  const handleSave = () => {
      if (!formData.memberName || !formData.email) return;

      if (editingRequest) {
          setRequests(requests.map(r => r.id === editingRequest.id ? formData : r));
      } else {
          setRequests([formData, ...requests]);
      }
      setIsModalOpen(false);
  };

  // Helper for Plan Badge Colors
  const getPlanBadgeColor = (plan: string) => {
      switch (plan) {
          case 'Platinum': return 'bg-slate-800 text-white border-slate-600';
          case 'Gold': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
          case 'Silver': return 'bg-gray-100 text-gray-700 border-gray-200';
          default: return 'bg-blue-50 text-blue-700 border-blue-100';
      }
  };

  // Helper for Status Badge Colors
  const getStatusBadgeColor = (status: string) => {
      switch (status) {
          case 'Active': return 'bg-green-100 text-green-700';
          case 'Pending': return 'bg-yellow-100 text-yellow-700';
          case 'Expired': return 'bg-red-100 text-red-700';
          case 'Cancelled': return 'bg-gray-100 text-gray-600';
          default: return 'bg-gray-100 text-gray-600';
      }
  };

  const filteredRequests = requests.filter(req => {
      const matchesSearch = req.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            req.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
      const matchesPlan = planFilter === 'All' || req.planType === planFilter;
      return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Membership Management</h1>
            <p className="text-gray-500 text-sm">Manage member applications, renewals, and statuses.</p>
        </div>
        <button 
            onClick={handleCreate}
            className="bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2 shadow-sm transition-colors"
        >
            <Plus size={16} /> New Membership
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
                <div className="relative flex-1 w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search members..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 w-full md:w-64 shadow-sm bg-white"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                     <select 
                        value={planFilter}
                        onChange={(e) => setPlanFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 text-gray-600 cursor-pointer shadow-sm"
                    >
                        <option value="All">All Plans</option>
                        <option value="Platinum">Platinum</option>
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                        <option value="Basic">Basic</option>
                    </select>
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 text-gray-600 cursor-pointer shadow-sm"
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Expired">Expired</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4">Member Name</th>
                        <th className="px-6 py-4">Contact Info</th>
                        <th className="px-6 py-4">Plan Type</th>
                        <th className="px-6 py-4">Join Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading ? (
                        <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">Loading memberships...</td></tr>
                    ) : filteredRequests.length === 0 ? (
                        <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">No members found matching filters.</td></tr>
                    ) : (
                        filteredRequests.map(req => (
                            <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{req.memberName}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-gray-400" />
                                        {req.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getPlanBadgeColor(req.planType)}`}>
                                        {req.planType === 'Platinum' || req.planType === 'Gold' ? <Crown size={12} fill="currentColor" /> : <Shield size={12} />}
                                        {req.planType}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 font-mono text-xs">{req.joinDate}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(req.status)}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => handleEdit(req)}
                                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                            title="Edit Membership"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(req.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            title="Remove Member"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
          </div>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900">{editingRequest ? 'Edit Membership' : 'New Membership'}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <XCircle size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Member Name</label>
                        <input 
                            type="text"
                            value={formData.memberName}
                            onChange={(e) => setFormData({...formData, memberName: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
                            <select 
                                value={formData.planType}
                                onChange={(e) => setFormData({...formData, planType: e.target.value as any})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white"
                            >
                                <option value="Basic">Basic</option>
                                <option value="Silver">Silver</option>
                                <option value="Gold">Gold</option>
                                <option value="Platinum">Platinum</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Active">Active</option>
                                <option value="Expired">Expired</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                        <input 
                            type="date"
                            value={formData.joinDate}
                            onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm text-gray-600"
                        />
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                    >
                        <Save size={16} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const HealthPackagesPage = () => {
    const [packages, setPackages] = useState<HealthPackage[]>([]);
    const [requests, setRequests] = useState<HealthPackageRequest[]>([]);
    const [stats, setStats] = useState({ totalPackages: 0, totalRequests: 0, pendingRequests: 0, estimatedRevenue: 0 });
    const [activeTab, setActiveTab] = useState<'dashboard' | 'requests'>('dashboard');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterDate, setFilterDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const pkgData = await generateHealthPackages();
            const reqData = await generateHealthPackageRequests();
            setPackages(pkgData);
            setRequests(reqData);

            // Calculate Stats
            const revenue = reqData.reduce((acc, req) => {
                // Find package price, rough estimation
                const pkg = pkgData.find(p => p.name === req.packageName);
                const priceString = pkg ? pkg.price : '0';
                const price = parseInt(priceString.replace(/[^0-9]/g, '')) || 0;
                return acc + (req.status !== 'Cancelled' ? price : 0);
            }, 0);

            setStats({
                totalPackages: pkgData.length,
                totalRequests: reqData.length,
                pendingRequests: reqData.filter(r => r.status === 'Pending').length,
                estimatedRevenue: revenue
            });
        };
        fetchData();
    }, []);

    const filteredRequests = requests.filter(req => 
        (filterStatus === 'All' || req.status === filterStatus) &&
        (filterDate === '' || req.preferredDate === filterDate) &&
        (req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
         req.packageName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-8">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Health Packages Dashboard</h1>
                    <p className="text-gray-500 text-sm">Manage packages, view requests, and track revenue</p>
                </div>
                <div className="flex items-center gap-2">
                     <div className="flex bg-gray-100 p-1 rounded-lg">
                        {['dashboard', 'requests'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-2 text-sm font-medium capitalize rounded-md transition-all ${activeTab === tab ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {tab}
                            </button>
                        ))}
                     </div>
                     <button className="bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2">
                        <Plus size={16} /> <span className="hidden md:inline">Create Package</span>
                    </button>
                </div>
             </div>

             {activeTab === 'dashboard' && (
                <div className="space-y-8">
                     {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Packages', value: stats.totalPackages, icon: Package, color: 'bg-blue-500' },
                            { label: 'Total Requests', value: stats.totalRequests, icon: FileText, color: 'bg-indigo-500' },
                            { label: 'Pending Requests', value: stats.pendingRequests, icon: Clock, color: 'bg-amber-500' },
                            { label: 'Est. Revenue', value: `$${stats.estimatedRevenue}`, icon: DollarSign, color: 'bg-emerald-500' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white shadow-md`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Requests Table (Preview) */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2"><Activity size={18} className="text-orange-500"/> Recent Requests</h3>
                                <button onClick={() => setActiveTab('requests')} className="text-xs text-orange-500 font-medium hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-500">
                                        <tr>
                                            <th className="px-6 py-3">Patient</th>
                                            <th className="px-6 py-3">Package</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {requests.slice(0, 5).map(req => (
                                            <tr key={req.id} className="hover:bg-gray-50/50">
                                                <td className="px-6 py-3 font-medium text-gray-900">{req.patientName}</td>
                                                <td className="px-6 py-3 text-gray-600">{req.packageName}</td>
                                                <td className="px-6 py-3 text-gray-500">{req.preferredDate}</td>
                                                <td className="px-6 py-3">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                        req.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                        req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        req.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                                    }`}>{req.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                         {/* Top Packages */}
                         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-orange-500"/> Popular Packages</h3>
                            <div className="space-y-4">
                                {packages.slice(0, 3).map(pkg => (
                                    <div key={pkg.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-orange-200 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs">
                                            {pkg.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-800 text-sm truncate">{pkg.name}</h4>
                                            <p className="text-xs text-gray-500">{pkg.numTests} Tests • {pkg.price}</p>
                                        </div>
                                        <ChevronDown className="-rotate-90 text-gray-400" size={16} />
                                    </div>
                                ))}
                            </div>
                         </div>
                    </div>
                </div>
             )}

            {activeTab === 'requests' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/30">
                        <h3 className="font-bold text-gray-800">All Package Requests</h3>
                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:flex-none">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search requests..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 w-full md:w-48 shadow-sm"
                                />
                            </div>
                            <div className="relative flex items-center">
                                <Filter size={16} className="absolute left-3 text-gray-400 pointer-events-none" />
                                <select 
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 text-gray-600 cursor-pointer shadow-sm w-full md:w-auto"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="relative flex items-center">
                                <input 
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 text-gray-600 cursor-pointer shadow-sm w-full md:w-auto"
                                />
                                {filterDate && (
                                    <button 
                                        onClick={() => setFilterDate('')}
                                        className="absolute right-8 hover:text-red-500 text-gray-400"
                                        title="Clear Date"
                                    >
                                        <XCircle size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Request ID</th>
                                <th className="px-6 py-4">Patient Name</th>
                                <th className="px-6 py-4">Package</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Requested Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredRequests.map(req => (
                                <tr key={req.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">#{req.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{req.patientName}</td>
                                    <td className="px-6 py-4 text-gray-600">{req.packageName}</td>
                                    <td className="px-6 py-4 text-gray-600">{req.contact}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <div className="flex flex-col">
                                            <span>{req.preferredDate}</span>
                                            <span className="text-[10px] text-gray-400">Created: {req.requestDate}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            req.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                            req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                            req.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                        }`}>{req.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-orange-500 hover:text-orange-600 font-medium text-xs">View</button>
                                    </td>
                                </tr>
                            ))}
                            {filteredRequests.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <Filter size={24} className="opacity-20" />
                                            <p>No requests found matching filters</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const NemtRequestsPage = () => {
    const [requests, setRequests] = useState<NemtRequest[]>([]);
    
    useEffect(() => {
        generateNemtRequests().then(setRequests);
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">NEMT Requests</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Patient</th>
                            <th className="px-6 py-4">Locations</th>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4">Vehicle</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {requests.map(req => (
                            <tr key={req.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-medium text-gray-900">{req.patientName}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> {req.pickupLocation}</div>
                                    <div className="flex items-center gap-1 mt-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> {req.dropoffLocation}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{req.appointmentTime}</td>
                                <td className="px-6 py-4 text-gray-600">{req.vehicleType}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        req.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 
                                        req.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                        req.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>{req.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const ArticlesPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    
    useEffect(() => {
        generateArticles().then(setArticles);
    }, []);

    return (
        <div className="p-8">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Articles & News</h1>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2">
                    <Plus size={16} /> Write Article
                </button>
             </div>
             <div className="space-y-4">
                 {articles.map(art => (
                     <div key={art.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                 <FileText size={24} />
                             </div>
                             <div>
                                 <h3 className="font-bold text-gray-900">{art.title}</h3>
                                 <p className="text-sm text-gray-500">{art.category} • by {art.author}</p>
                             </div>
                         </div>
                         <div className="flex items-center gap-6">
                             <div className="text-right">
                                 <p className="text-xs text-gray-400">{art.publishDate}</p>
                                 <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                     art.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                 }`}>{art.status}</span>
                             </div>
                             <div className="flex items-center gap-2">
                                 <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16}/></button>
                                 <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
};

const GenericCMSPage = () => {
    const location = useLocation();
    const pageTitle = location.pathname.split('/').pop()?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || "CMS Page";
    const [items, setItems] = useState<CMSItem[]>([]);

    useEffect(() => {
        generateCMSContent(pageTitle).then(setItems);
    }, [pageTitle]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">{pageTitle} Content</h1>
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Description/Subtitle</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Last Updated</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                                <td className="px-6 py-4 text-gray-600">{item.subtitle}</td>
                                <td className="px-6 py-4">
                                     <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                    }`}>{item.status}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{item.lastUpdated}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const RolesPage = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'Active',
        permissions: [] as string[]
    });

    const AVAILABLE_PERMISSIONS = [
        "Read Patients", "Write Patients", 
        "Manage Appointments", "Manage Users", 
        "Manage Roles", "View Reports", 
        "System Settings", "Manage CMS",
        "Write Prescriptions", "Read Lab Results"
    ];

    useEffect(() => {
        generateRoles().then(setRoles);
    }, []);

    const handleCreate = () => {
        setEditingRole(null);
        setFormData({
            name: '',
            description: '',
            status: 'Active',
            permissions: []
        });
        setIsModalOpen(true);
    };

    const handleEdit = (role: Role) => {
        setEditingRole(role);
        setFormData({
            name: role.name,
            description: role.description,
            status: role.status,
            permissions: role.permissions
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
            setRoles(roles.filter(r => r.id !== id));
        }
    };

    const handleSave = () => {
        if (!formData.name) return;

        if (editingRole) {
            setRoles(roles.map(r => r.id === editingRole.id ? {
                ...r,
                name: formData.name,
                description: formData.description,
                status: formData.status as 'Active' | 'Inactive',
                permissions: formData.permissions,
                lastUpdated: new Date().toISOString().split('T')[0]
            } : r));
        } else {
            const newRole: Role = {
                id: Math.random().toString(36).substr(2, 9),
                name: formData.name,
                description: formData.description,
                status: formData.status as 'Active' | 'Inactive',
                permissions: formData.permissions,
                usersCount: 0,
                lastUpdated: new Date().toISOString().split('T')[0]
            };
            setRoles([...roles, newRole]);
        }
        setIsModalOpen(false);
    };

    const togglePermission = (perm: string) => {
        setFormData(prev => {
            const newPerms = prev.permissions.includes(perm)
                ? prev.permissions.filter(p => p !== perm)
                : [...prev.permissions, perm];
            return { ...prev, permissions: newPerms };
        });
    };

    return (
        <div className="p-8">
             <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">User Roles & Permissions</h1>
                    <p className="text-gray-500 text-sm">Manage access levels and user roles within the system.</p>
                </div>
                <button 
                    onClick={handleCreate}
                    className="bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2"
                >
                    <Plus size={16} /> Create Role
                </button>
             </div>

             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Role Name</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">Users Assigned</th>
                            <th className="px-6 py-4">Permissions</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {roles.map(role => (
                            <tr key={role.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                                        <Shield size={14} />
                                    </div>
                                    {role.name}
                                </td>
                                <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={role.description}>{role.description}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    <span className="flex items-center gap-1"><Users size={14} className="text-gray-400"/> {role.usersCount}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {role.permissions.slice(0, 2).map((perm, i) => (
                                            <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded border border-gray-200">{perm}</span>
                                        ))}
                                        {role.permissions.length > 2 && (
                                            <span className="px-1.5 py-0.5 bg-gray-50 text-gray-400 text-[10px] rounded">+{role.permissions.length - 2} more</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                     <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        role.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                    }`}>{role.status}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => handleEdit(role)}
                                            className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-colors"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(role.id)}
                                            className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>

             {/* Role Modal */}
             {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-900">{editingRole ? 'Edit Role' : 'Create New Role'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <XCircle size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                                <input 
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="e.g. Chief Nurse"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea 
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Describe the role's responsibilities..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm h-24 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select 
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                                <div className="space-y-2 border border-gray-100 rounded-lg p-3 max-h-48 overflow-y-auto">
                                    {AVAILABLE_PERMISSIONS.map(perm => (
                                        <div key={perm} className="flex items-center gap-2">
                                            <div 
                                                onClick={() => togglePermission(perm)}
                                                className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                                                    formData.permissions.includes(perm) 
                                                    ? 'bg-orange-500 border-orange-500 text-white' 
                                                    : 'border-gray-300 bg-white hover:border-orange-300'
                                                }`}
                                            >
                                                {formData.permissions.includes(perm) && <CheckSquare size={10} />}
                                            </div>
                                            <span 
                                                onClick={() => togglePermission(perm)}
                                                className="text-sm text-gray-600 cursor-pointer select-none"
                                            >
                                                {perm}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave}
                                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                            >
                                <Save size={16} />
                                {editingRole ? 'Save Changes' : 'Create Role'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const UsersPage = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserType | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Doctor',
        status: 'Active'
    });

    useEffect(() => {
        generateUsers().then(setUsers);
    }, []);

    const handleCreate = () => {
        setEditingUser(null);
        setFormData({
            name: '',
            email: '',
            role: 'Doctor',
            status: 'Active'
        });
        setIsModalOpen(true);
    };

    const handleEdit = (user: UserType) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleSave = () => {
        if (!formData.name || !formData.email) return;

        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? {
                ...u,
                ...formData,
                status: formData.status as 'Active' | 'Inactive' | 'Pending'
            } : u));
        } else {
            const newUser: UserType = {
                id: Math.random().toString(36).substr(2, 9),
                name: formData.name,
                email: formData.email,
                role: formData.role,
                status: formData.status as 'Active' | 'Inactive' | 'Pending',
                lastActive: 'Just now'
            };
            setUsers([newUser, ...users]);
        }
        setIsModalOpen(false);
    };

    const filteredUsers = users.filter(user => 
        (filterRole === 'All' || user.role === filterRole) &&
        (filterStatus === 'All' || user.status === filterStatus) &&
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-8">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">System Users</h1>
                    <p className="text-gray-500 text-sm">Manage user access and accounts.</p>
                </div>
                <button 
                    onClick={handleCreate}
                    className="bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2"
                >
                    <UserPlus size={16} /> Add User
                </button>
             </div>

             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/30">
                    <div className="relative flex-1 w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search users..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 w-full md:w-64 shadow-sm"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                         <select 
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 text-gray-600 cursor-pointer shadow-sm"
                        >
                            <option value="All">All Roles</option>
                            <option value="Super Admin">Super Admin</option>
                            <option value="Admin">Admin</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Nurse">Nurse</option>
                        </select>
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 text-gray-600 cursor-pointer shadow-sm"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </div>

                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Last Active</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs border border-gray-200">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                     <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${
                                            user.status === 'Active' ? 'bg-green-500' : 
                                            user.status === 'Inactive' ? 'bg-gray-400' : 'bg-yellow-500'
                                        }`}></div>
                                        <span className="text-gray-600">{user.status}</span>
                                     </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-xs">
                                    {user.lastActive}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => handleEdit(user)}
                                            className="text-gray-400 hover:text-blue-600 p-1 rounded-md transition-colors"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user.id)}
                                            className="text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>

             {/* User Modal */}
             {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-900">{editingUser ? 'Edit User' : 'Add New User'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <XCircle size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input 
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input 
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <select 
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white"
                                    >
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Nurse">Nurse</option>
                                        <option value="Receptionist">Receptionist</option>
                                        <option value="Lab Technician">Lab Technician</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select 
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave}
                                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                            >
                                <Save size={16} />
                                {editingUser ? 'Save Changes' : 'Create User'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const MediaPage = () => {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [filterCategory, setFilterCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        generateMediaItems().then(setMediaItems);
    }, []);

    const filteredMedia = mediaItems.filter(item => 
        (filterCategory === 'All' || item.category === filterCategory) &&
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Media Library</h1>
                    <p className="text-gray-500 text-sm">Manage images, documents, and videos.</p>
                </div>
                <button className="bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2">
                    <Upload size={16} /> <span className="hidden sm:inline">Upload New</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                 <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search files..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-200 w-full shadow-sm"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                    {['All', 'Patient', 'Staff', 'Marketing', 'Reports'].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                                filterCategory === cat 
                                ? 'bg-gray-800 text-white shadow-sm' 
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredMedia.map(item => (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group relative">
                        <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden relative">
                            {item.type === 'Image' ? (
                                <img src={item.url} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                            ) : (
                                <div className="text-gray-400 flex flex-col items-center gap-2 group-hover:text-orange-500 transition-colors">
                                    {item.type === 'Video' ? <Video size={32} /> : <FileText size={32} />}
                                    <span className="text-xs uppercase font-bold">{item.type}</span>
                                </div>
                            )}
                            
                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                <button className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                                    <Eye size={16} />
                                </button>
                                <button className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 delay-75">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="p-3">
                            <h3 className="text-sm font-medium text-gray-900 truncate mb-1" title={item.name}>{item.name}</h3>
                            <div className="flex justify-between items-center text-[10px] text-gray-500 font-medium">
                                <span>{item.size}</span>
                                <span>{item.date}</span>
                            </div>
                            <div className="mt-2">
                                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-600">
                                    {item.category}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredMedia.length === 0 && (
                     <div className="col-span-full py-12 text-center text-gray-400 flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                             <Search size={24} className="opacity-20" />
                        </div>
                        <p>No media found.</p>
                     </div>
                )}
            </div>
        </div>
    );
};

// --- Main App Component ---

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <HashRouter>
      <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
           {/* Mobile Header */}
           <div className="lg:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-20">
              <span className="font-bold text-gray-800 flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white">E</div>
                  Easy Health
              </span>
              <button onClick={() => setMobileOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Menu size={24} />
              </button>
           </div>
           
           <main className="flex-1 overflow-y-auto custom-scrollbar">
             <Routes>
               <Route path="/" element={<DashboardHome />} />
               <Route path="/appointments" element={<AppointmentsPage />} />
               <Route path="/doctors" element={<DoctorsPage />} />
               <Route path="/patients" element={<PatientsPage />} />
               <Route path="/patients/:id" element={<PatientDetailsPage />} />
               <Route path="/membership-requests" element={<MembershipRequestsPage />} />
               <Route path="/health-packages" element={<HealthPackagesPage />} />
               <Route path="/nemt-requests" element={<NemtRequestsPage />} />
               <Route path="/articles" element={<ArticlesPage />} />
               <Route path="/media" element={<MediaPage />} />
               <Route path="/roles" element={<RolesPage />} />
               <Route path="/users" element={<UsersPage />} />
               {/* CMS Routes */}
               <Route path="/cms/*" element={<GenericCMSPage />} />
               
               {/* Fallback for other routes */}
               <Route path="*" element={<div className="p-12 text-center text-gray-400">Page under construction</div>} />
             </Routes>
           </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;