import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  path?: string;
  icon?: LucideIcon;
  badge?: number;
  children?: NavItem[];
  isOpen?: boolean; // For default open state
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  notes: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  lastVisit: string;
  condition: string;
  status: 'Active' | 'Inactive';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  contact: string;
  email: string;
  availability: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  rating: number;
  experience: string; // e.g., "12 years"
  image?: string;
}

export interface MembershipRequest {
  id: string;
  memberName: string;
  email: string;
  planType: 'Silver' | 'Gold' | 'Platinum' | 'Basic';
  status: 'Active' | 'Pending' | 'Cancelled' | 'Expired';
  joinDate: string;
}

export interface HealthPackage {
  id: string;
  name: string;
  description: string;
  price: string;
  numTests: number;
  status: 'Active' | 'Inactive';
}

export interface HealthPackageRequest {
  id: string;
  patientName: string;
  packageName: string;
  contact: string;
  requestDate: string;
  preferredDate: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface Vehicle {
  id: string;
  type: 'Wheelchair Van' | 'Sedan' | 'Ambulance';
  plateNumber: string;
  status: 'Active' | 'Maintenance' | 'In Use';
  capacity: string;
  lastMaintenance: string;
}

export interface NemtRequest {
  id: string;
  patientName: string;
  pickupLocation: string;
  dropoffLocation: string;
  appointmentTime: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Pending';
  driverName?: string;
  vehicleType: 'Wheelchair Van' | 'Sedan' | 'Ambulance';
  // Assignment fields
  assignedVehicleId?: string; // Links to a Vehicle
  supportTeam?: string[]; // e.g. ["Nurse Joy", "Tech Brock"]
}

export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  publishDate: string;
  status: 'Published' | 'Draft' | 'Archived';
  views: number;
}

export interface CMSItem {
  id: string;
  title: string;       // Primary text (e.g., Clinic Name, Package Name)
  subtitle: string;    // Secondary text (e.g., Location, Price)
  status: 'Active' | 'Inactive' | 'Draft';
  lastUpdated: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  permissions: string[]; // e.g. "Read Patients", "Manage Users"
  status: 'Active' | 'Inactive';
  lastUpdated: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastActive: string;
}

export interface DashboardStats {
  totalPatients: number;
  appointmentsToday: number;
  pendingReports: number;
  revenue: number;
}