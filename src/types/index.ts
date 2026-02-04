export interface User {
  uid: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  date_of_birth: string;
  role: 'customer' | 'manager' | 'admin';
  verification_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  weekly_rate: number;
  status: 'available' | 'rented' | 'maintenance';
  images: string[];
  description: string;
  specs: Record<string, any>;
  published: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  car_id: string;
  customer_id: string;
  start_date: string;
  end_date: string;
  weeks_rented: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  customer_snapshot: {
    name: string;
    email: string;
    phone: string;
  };
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface RegisterData {
  email: string;
  password: string;
}