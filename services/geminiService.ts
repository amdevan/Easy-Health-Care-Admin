import { GoogleGenAI, Type } from "@google/genai";
import { Appointment, Article, CMSItem, MembershipRequest, Patient, HealthPackage, HealthPackageRequest, NemtRequest, Doctor, Vehicle, Role, User } from "../types";

// --- Fallback Data ---
// Used when API keys are missing or network requests fail

const FALLBACK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    patientName: "Sarah Connor",
    doctorName: "Dr. Silberman",
    specialty: "Psychiatry",
    date: "2023-10-27",
    time: "10:00 AM",
    status: "Confirmed",
    notes: "Regular checkup"
  },
  {
    id: "2",
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    specialty: "General",
    date: "2023-10-28",
    time: "11:30 AM",
    status: "Pending",
    notes: "Flu symptoms"
  },
  {
      id: "3",
      patientName: "Emily Blunt",
      doctorName: "Dr. House",
      specialty: "Diagnostician",
      date: "2023-10-29",
      time: "02:00 PM",
      status: "Completed",
      notes: "Follow-up on leg pain"
  },
  {
      id: "4",
      patientName: "Michael Scott",
      doctorName: "Dr. O'Malley",
      specialty: "Dentistry",
      date: "2023-10-30",
      time: "09:00 AM",
      status: "Confirmed",
      notes: "Routine cleaning"
  },
  {
      id: "5",
      patientName: "James Bond",
      doctorName: "Dr. No",
      specialty: "Cardiology",
      date: "2023-10-31",
      time: "04:15 PM",
      status: "Cancelled",
      notes: "Patient emergency overseas"
  }
];

const FALLBACK_DOCTORS: Doctor[] = [
  { id: "1", name: "Dr. Gregory House", specialty: "Diagnostician", contact: "555-0199", email: "house@ppth.org", availability: "Mon-Fri, 9AM-5PM", status: "Active", rating: 4.9, experience: "20 years" },
  { id: "2", name: "Dr. Meredith Grey", specialty: "General Surgery", contact: "555-0123", email: "grey@gsm.org", availability: "Mon-Sat, 8AM-8PM", status: "Active", rating: 4.7, experience: "15 years" },
  { id: "3", name: "Dr. Derek Shepherd", specialty: "Neurosurgery", contact: "555-0124", email: "shepherd@gsm.org", availability: "On Call", status: "On Leave", rating: 4.8, experience: "18 years" },
  { id: "4", name: "Dr. John Dorian", specialty: "Internal Medicine", contact: "555-0155", email: "jd@sacredheart.org", availability: "Mon-Fri, 10AM-6PM", status: "Active", rating: 4.5, experience: "8 years" },
  { id: "5", name: "Dr. Stephen Strange", specialty: "Neurology", contact: "555-0999", email: "strange@metro.org", availability: "Tue-Thu, 11AM-4PM", status: "Inactive", rating: 5.0, experience: "12 years" },
];

const FALLBACK_MEMBERSHIPS: MembershipRequest[] = [
  { id: "1", memberName: "Alice Johnson", email: "alice.j@example.com", planType: "Gold", status: "Active", joinDate: "2023-01-15" },
  { id: "2", memberName: "Bob Smith", email: "bob.smith@test.com", planType: "Silver", status: "Pending", joinDate: "2023-11-20" },
  { id: "3", memberName: "Charlie Brown", email: "charlie@corp.com", planType: "Platinum", status: "Active", joinDate: "2023-05-10" },
  { id: "4", memberName: "Diana Prince", email: "diana@amazon.com", planType: "Gold", status: "Expired", joinDate: "2022-08-01" },
  { id: "5", memberName: "Evan Wright", email: "evan@write.com", planType: "Basic", status: "Cancelled", joinDate: "2023-09-12" },
];

const FALLBACK_PATIENTS: Patient[] = [
  { id: "1", name: "Sarah Connor", age: 35, gender: "Female", contact: "555-0101", lastVisit: "2023-10-27", condition: "Anxiety", status: "Active" },
  { id: "2", name: "John Doe", age: 45, gender: "Male", contact: "555-0102", lastVisit: "2023-10-28", condition: "Flu", status: "Active" },
  { id: "3", name: "Emily Blunt", age: 29, gender: "Female", contact: "555-0103", lastVisit: "2023-09-15", condition: "Chronic Pain", status: "Inactive" },
  { id: "4", name: "Michael Scott", age: 52, gender: "Male", contact: "555-0104", lastVisit: "2023-10-30", condition: "Dental", status: "Active" },
];

const FALLBACK_HEALTH_PACKAGES: HealthPackage[] = [
    { id: "1", name: "Basic Wellness", description: "Essential health checkup", price: "$99", numTests: 15, status: "Active" },
    { id: "2", name: "Executive Male", description: "Comprehensive screening for men", price: "$249", numTests: 45, status: "Active" },
    { id: "3", name: "Executive Female", description: "Comprehensive screening for women", price: "$249", numTests: 48, status: "Active" },
    { id: "4", name: "Cardiac Care", description: "Focused heart health screening", price: "$199", numTests: 25, status: "Active" },
    { id: "5", name: "Senior Citizen", description: "Geriatric care package", price: "$150", numTests: 30, status: "Inactive" },
];

const FALLBACK_HEALTH_PACKAGE_REQUESTS: HealthPackageRequest[] = [
    { id: "1", patientName: "Robert De Niro", packageName: "Cardiac Care", contact: "555-0201", requestDate: "2023-11-10", preferredDate: "2023-11-15", status: "Pending" },
    { id: "2", patientName: "Al Pacino", packageName: "Executive Male", contact: "555-0202", requestDate: "2023-11-09", preferredDate: "2023-11-14", status: "Confirmed" },
    { id: "3", patientName: "Meryl Streep", packageName: "Senior Citizen", contact: "555-0203", requestDate: "2023-11-08", preferredDate: "2023-11-12", status: "Completed" },
    { id: "4", patientName: "Tom Hanks", packageName: "Basic Wellness", contact: "555-0204", requestDate: "2023-11-11", preferredDate: "2023-11-20", status: "Cancelled" },
];

const FALLBACK_VEHICLES: Vehicle[] = [
    { id: "V1", type: "Wheelchair Van", plateNumber: "MED-101", status: "Active", capacity: "2 Wheelchairs + 2 Seats", lastMaintenance: "2023-10-01" },
    { id: "V2", type: "Ambulance", plateNumber: "AMB-999", status: "In Use", capacity: "1 Stretcher", lastMaintenance: "2023-10-15" },
    { id: "V3", type: "Sedan", plateNumber: "CAR-555", status: "Active", capacity: "3 Seats", lastMaintenance: "2023-09-20" },
    { id: "V4", type: "Wheelchair Van", plateNumber: "MED-102", status: "Maintenance", capacity: "2 Wheelchairs", lastMaintenance: "2023-11-01" },
];

const FALLBACK_NEMT_REQUESTS: NemtRequest[] = [
    { id: "1", patientName: "Martha Kent", pickupLocation: "123 Farm Lane, Smallville", dropoffLocation: "Metropolis General", appointmentTime: "2023-11-20 09:00 AM", status: "Scheduled", driverName: "Clark", vehicleType: "Wheelchair Van", assignedVehicleId: "V1", supportTeam: ["Nurse Joy"] },
    { id: "2", patientName: "Bruce Wayne", pickupLocation: "Wayne Manor", dropoffLocation: "Gotham City Hospital", appointmentTime: "2023-11-21 02:00 PM", status: "Pending", vehicleType: "Sedan" },
    { id: "3", patientName: "Peter Parker", pickupLocation: "20 Ingram St, Queens", dropoffLocation: "Mount Sinai", appointmentTime: "2023-11-19 10:30 AM", status: "Completed", driverName: "Happy", vehicleType: "Sedan", assignedVehicleId: "V3" },
    { id: "4", patientName: "Tony Stark", pickupLocation: "Stark Tower", dropoffLocation: "Lenox Hill", appointmentTime: "2023-11-22 08:00 AM", status: "Cancelled", vehicleType: "Ambulance" },
];

const FALLBACK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "The Future of Telemedicine",
    category: "Technology",
    author: "Dr. Emily Chen",
    publishDate: "2023-11-01",
    status: "Published",
    views: 1240
  },
  {
    id: "2",
    title: "Understanding Seasonal Allergies",
    category: "Wellness",
    author: "Dr. Mark Sloan",
    publishDate: "2023-10-25",
    status: "Published",
    views: 856
  },
  {
    id: "3",
    title: "New Advances in Cardiology",
    category: "Medical Research",
    author: "Dr. Preston Burke",
    publishDate: "2023-10-20",
    status: "Draft",
    views: 0
  },
  {
    id: "4",
    title: "Healthy Eating Habits for 2024",
    category: "Nutrition",
    author: "Dr. Lisa Cuddy",
    publishDate: "2023-10-15",
    status: "Archived",
    views: 3420
  }
];

const FALLBACK_CMS_ITEMS: CMSItem[] = [
  { id: "1", title: "Sample Item 1", subtitle: "Description or Location", status: "Active", lastUpdated: "2023-11-05" },
  { id: "2", title: "Sample Item 2", subtitle: "Details here", status: "Inactive", lastUpdated: "2023-11-02" },
  { id: "3", title: "Sample Item 3", subtitle: "More info", status: "Draft", lastUpdated: "2023-10-28" },
];

const FALLBACK_ROLES: Role[] = [
    { id: "1", name: "Super Admin", description: "Full system access including user management and system settings.", usersCount: 3, permissions: ["All Access"], status: "Active", lastUpdated: "2023-11-01" },
    { id: "2", name: "Doctor", description: "Access to patient records, appointments, and prescriptions.", usersCount: 24, permissions: ["Read Patients", "Write Prescriptions", "Manage Appointments"], status: "Active", lastUpdated: "2023-10-15" },
    { id: "3", name: "Nurse", description: "Access to patient vitals, care plans, and basic records.", usersCount: 45, permissions: ["Read Patients", "Update Vitals"], status: "Active", lastUpdated: "2023-09-20" },
    { id: "4", name: "Receptionist", description: "Manage front desk, scheduling, and patient registration.", usersCount: 8, permissions: ["Manage Appointments", "Register Patients"], status: "Active", lastUpdated: "2023-11-05" },
    { id: "5", name: "Lab Technician", description: "Access to lab results and test management.", usersCount: 12, permissions: ["Write Lab Results", "Read Patients"], status: "Active", lastUpdated: "2023-08-30" },
];

const FALLBACK_USERS: User[] = [
    { id: "1", name: "Dr. Alex Morgan", email: "alex.morgan@easyhealth.com", role: "Super Admin", status: "Active", lastActive: "Just now" },
    { id: "2", name: "Dr. Gregory House", email: "g.house@easyhealth.com", role: "Doctor", status: "Active", lastActive: "15 mins ago" },
    { id: "3", name: "Nurse Joy", email: "joy@easyhealth.com", role: "Nurse", status: "Active", lastActive: "1 hour ago" },
    { id: "4", name: "Admin Sherlock", email: "sherlock@easyhealth.com", role: "Admin", status: "Inactive", lastActive: "3 days ago" },
    { id: "5", name: "Dr. Watson", email: "watson@easyhealth.com", role: "Doctor", status: "Pending", lastActive: "Never" },
];

// Helper to safely get API key
const getApiKey = (): string | undefined => {
  try {
    return process.env.API_KEY;
  } catch (e) {
    return undefined;
  }
};

export const generateAppointments = async (): Promise<Appointment[]> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API Key is missing. Returning fallback appointment data.");
    return FALLBACK_APPOINTMENTS;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 8 realistic healthcare appointment records. Include diverse specialties (Cardiology, Dermatology, General, etc.) and statuses.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              patientName: { type: Type.STRING },
              doctorName: { type: Type.STRING },
              specialty: { type: Type.STRING },
              date: { type: Type.STRING },
              time: { type: Type.STRING },
              status: { type: Type.STRING, enum: ['Confirmed', 'Pending', 'Cancelled', 'Completed'] },
              notes: { type: Type.STRING }
            },
            required: ["id", "patientName", "doctorName", "specialty", "date", "time", "status", "notes"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Appointment[];
    }
    return FALLBACK_APPOINTMENTS;
  } catch (error) {
    console.warn("Failed to fetch dynamic appointments (using fallback):", error);
    return FALLBACK_APPOINTMENTS;
  }
};

export const generateDoctors = async (): Promise<Doctor[]> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API Key is missing. Returning fallback doctor data.");
    return FALLBACK_DOCTORS;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 6 realistic doctor profiles for a hospital admin dashboard. Include name, specialty, contact phone, email, availability (e.g. 'Mon-Fri 9-5'), status (Active, On Leave, Inactive), rating (1-5 float), and years of experience.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              specialty: { type: Type.STRING },
              contact: { type: Type.STRING },
              email: { type: Type.STRING },
              availability: { type: Type.STRING },
              status: { type: Type.STRING, enum: ['Active', 'On Leave', 'Inactive'] },
              rating: { type: Type.NUMBER },
              experience: { type: Type.STRING }
            },
            required: ["id", "name", "specialty", "contact", "email", "availability", "status", "rating", "experience"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Doctor[];
    }
    return FALLBACK_DOCTORS;
  } catch (error) {
    console.warn("Failed to fetch dynamic doctors (using fallback):", error);
    return FALLBACK_DOCTORS;
  }
};

export const generateMembershipRequests = async (): Promise<MembershipRequest[]> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API Key is missing. Returning fallback membership data.");
    return FALLBACK_MEMBERSHIPS;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 6 realistic healthcare membership requests/profiles. Include name, email, plan type (Gold, Silver, Platinum), status (Active, Pending, Expired), and join date.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              memberName: { type: Type.STRING },
              email: { type: Type.STRING },
              planType: { type: Type.STRING, enum: ['Silver', 'Gold', 'Platinum', 'Basic'] },
              status: { type: Type.STRING, enum: ['Active', 'Pending', 'Cancelled', 'Expired'] },
              joinDate: { type: Type.STRING }
            },
            required: ["id", "memberName", "email", "planType", "status", "joinDate"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as MembershipRequest[];
    }
    return FALLBACK_MEMBERSHIPS;
  } catch (error) {
    console.warn("Failed to fetch dynamic memberships (using fallback):", error);
    return FALLBACK_MEMBERSHIPS;
  }
};

export const generatePatients = async (): Promise<Patient[]> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API Key is missing. Returning fallback patient data.");
    return FALLBACK_PATIENTS;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 6 realistic patient records for a healthcare dashboard. Include name, age, gender, contact, last visit date, primary condition, and status.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              age: { type: Type.NUMBER },
              gender: { type: Type.STRING, enum: ['Male', 'Female', 'Other'] },
              contact: { type: Type.STRING },
              lastVisit: { type: Type.STRING },
              condition: { type: Type.STRING },
              status: { type: Type.STRING, enum: ['Active', 'Inactive'] }
            },
            required: ["id", "name", "age", "gender", "contact", "lastVisit", "condition", "status"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Patient[];
    }
    return FALLBACK_PATIENTS;
  } catch (error) {
    console.warn("Failed to fetch dynamic patients (using fallback):", error);
    return FALLBACK_PATIENTS;
  }
};

export const generateHealthPackages = async (): Promise<HealthPackage[]> => {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn("API Key is missing. Returning fallback health package data.");
      return FALLBACK_HEALTH_PACKAGES;
    }
  
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Generate 5 realistic healthcare packages. Include name, short description, price, number of included tests, and status (Active/Inactive).",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                price: { type: Type.STRING },
                numTests: { type: Type.NUMBER },
                status: { type: Type.STRING, enum: ['Active', 'Inactive'] }
              },
              required: ["id", "name", "description", "price", "numTests", "status"]
            }
          }
        }
      });
  
      if (response.text) {
        return JSON.parse(response.text) as HealthPackage[];
      }
      return FALLBACK_HEALTH_PACKAGES;
    } catch (error) {
      console.warn("Failed to fetch dynamic health packages (using fallback):", error);
      return FALLBACK_HEALTH_PACKAGES;
    }
  };

export const generateHealthPackageRequests = async (): Promise<HealthPackageRequest[]> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.warn("API Key is missing. Returning fallback health package request data.");
        return FALLBACK_HEALTH_PACKAGE_REQUESTS;
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate 5 realistic health package booking requests. Include patient name, selected package name, contact info, request date, preferred date, and status (Pending, Confirmed, Completed, Cancelled).",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            patientName: { type: Type.STRING },
                            packageName: { type: Type.STRING },
                            contact: { type: Type.STRING },
                            requestDate: { type: Type.STRING },
                            preferredDate: { type: Type.STRING },
                            status: { type: Type.STRING, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'] }
                        },
                        required: ["id", "patientName", "packageName", "contact", "requestDate", "preferredDate", "status"]
                    }
                }
            }
        });

        if (response.text) {
            return JSON.parse(response.text) as HealthPackageRequest[];
        }
        return FALLBACK_HEALTH_PACKAGE_REQUESTS;
    } catch (error) {
        console.warn("Failed to fetch dynamic health package requests (using fallback):", error);
        return FALLBACK_HEALTH_PACKAGE_REQUESTS;
    }
};

export const generateVehicles = async (): Promise<Vehicle[]> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.warn("API Key is missing. Returning fallback vehicle data.");
        return FALLBACK_VEHICLES;
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate 5 realistic medical transport vehicles. Include id, type (Wheelchair Van, Sedan, Ambulance), plateNumber, status (Active, Maintenance, In Use), capacity, and lastMaintenance date.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            type: { type: Type.STRING, enum: ['Wheelchair Van', 'Sedan', 'Ambulance'] },
                            plateNumber: { type: Type.STRING },
                            status: { type: Type.STRING, enum: ['Active', 'Maintenance', 'In Use'] },
                            capacity: { type: Type.STRING },
                            lastMaintenance: { type: Type.STRING },
                        },
                        required: ["id", "type", "plateNumber", "status", "capacity", "lastMaintenance"]
                    }
                }
            }
        });

        if (response.text) {
            return JSON.parse(response.text) as Vehicle[];
        }
        return FALLBACK_VEHICLES;
    } catch (error) {
        console.warn("Failed to fetch dynamic vehicles (using fallback):", error);
        return FALLBACK_VEHICLES;
    }
};

export const generateNemtRequests = async (): Promise<NemtRequest[]> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.warn("API Key is missing. Returning fallback NEMT request data.");
        return FALLBACK_NEMT_REQUESTS;
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate 5 realistic NEMT (Non-Emergency Medical Transport) requests. Include patient name, pickup address, dropoff location (hospital/clinic), appointmentTime, vehicleType (Wheelchair Van, Sedan, Ambulance), status, driverName, assignedVehicleId (e.g. V1), and supportTeam (array of strings e.g. 'Nurse Joy').",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            patientName: { type: Type.STRING },
                            pickupLocation: { type: Type.STRING },
                            dropoffLocation: { type: Type.STRING },
                            appointmentTime: { type: Type.STRING },
                            status: { type: Type.STRING, enum: ['Scheduled', 'Completed', 'Cancelled', 'Pending'] },
                            driverName: { type: Type.STRING },
                            vehicleType: { type: Type.STRING, enum: ['Wheelchair Van', 'Sedan', 'Ambulance'] },
                            assignedVehicleId: { type: Type.STRING },
                            supportTeam: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["id", "patientName", "pickupLocation", "dropoffLocation", "appointmentTime", "status", "vehicleType"]
                    }
                }
            }
        });

        if (response.text) {
            return JSON.parse(response.text) as NemtRequest[];
        }
        return FALLBACK_NEMT_REQUESTS;
    } catch (error) {
        console.warn("Failed to fetch dynamic NEMT requests (using fallback):", error);
        return FALLBACK_NEMT_REQUESTS;
    }
};

export const generateArticles = async (): Promise<Article[]> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API Key is missing. Returning fallback article data.");
    return FALLBACK_ARTICLES;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 5 realistic healthcare news articles or blog posts for a CMS. Include title, category (Health, Wellness, Tech, etc.), author, date, status, and view count.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              author: { type: Type.STRING },
              publishDate: { type: Type.STRING },
              status: { type: Type.STRING, enum: ['Published', 'Draft', 'Archived'] },
              views: { type: Type.INTEGER }
            },
            required: ["id", "title", "category", "author", "publishDate", "status", "views"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Article[];
    }
    return FALLBACK_ARTICLES;
  } catch (error) {
    console.warn("Failed to fetch dynamic articles (using fallback):", error);
    return FALLBACK_ARTICLES;
  }
};

export const generateCMSContent = async (context: string): Promise<CMSItem[]> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn(`API Key is missing. Returning fallback data for ${context}.`);
    return FALLBACK_CMS_ITEMS.map(item => ({...item, title: `${context} Item ${item.id}`}));
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Generate 5 realistic CMS content items for a healthcare website page titled '${context}'. 
    Example for 'Clinics': Title='Downtown Clinic', Subtitle='123 Main St, NY'. 
    Example for 'Membership': Title='Gold Plan', Subtitle='$99/month'.
    Return fields: id, title, subtitle, status (Active, Inactive, Draft), lastUpdated.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              subtitle: { type: Type.STRING },
              status: { type: Type.STRING, enum: ['Active', 'Inactive', 'Draft'] },
              lastUpdated: { type: Type.STRING },
            },
            required: ["id", "title", "subtitle", "status", "lastUpdated"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as CMSItem[];
    }
    return FALLBACK_CMS_ITEMS;
  } catch (error) {
    console.warn(`Failed to fetch dynamic CMS content for ${context} (using fallback):`, error);
    return FALLBACK_CMS_ITEMS;
  }
};

export const generateRoles = async (): Promise<Role[]> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.warn("API Key is missing. Returning fallback roles data.");
        return FALLBACK_ROLES;
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate 6 realistic user roles for a healthcare system. Include name, description, number of users assigned, key permissions (array of strings), status (Active, Inactive), and last updated date.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                            usersCount: { type: Type.NUMBER },
                            permissions: { type: Type.ARRAY, items: { type: Type.STRING } },
                            status: { type: Type.STRING, enum: ['Active', 'Inactive'] },
                            lastUpdated: { type: Type.STRING }
                        },
                        required: ["id", "name", "description", "usersCount", "permissions", "status", "lastUpdated"]
                    }
                }
            }
        });

        if (response.text) {
            return JSON.parse(response.text) as Role[];
        }
        return FALLBACK_ROLES;
    } catch (error) {
        console.warn("Failed to fetch dynamic roles (using fallback):", error);
        return FALLBACK_ROLES;
    }
};

export const generateUsers = async (): Promise<User[]> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.warn("API Key is missing. Returning fallback users data.");
        return FALLBACK_USERS;
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate 6 realistic system users for a healthcare admin dashboard. Include id, name, email, role (Admin, Doctor, Nurse, Receptionist), status (Active, Inactive, Pending), and lastActive (e.g. '2 mins ago').",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            name: { type: Type.STRING },
                            email: { type: Type.STRING },
                            role: { type: Type.STRING },
                            status: { type: Type.STRING, enum: ['Active', 'Inactive', 'Pending'] },
                            lastActive: { type: Type.STRING }
                        },
                        required: ["id", "name", "email", "role", "status", "lastActive"]
                    }
                }
            }
        });

        if (response.text) {
            return JSON.parse(response.text) as User[];
        }
        return FALLBACK_USERS;
    } catch (error) {
        console.warn("Failed to fetch dynamic users (using fallback):", error);
        return FALLBACK_USERS;
    }
};