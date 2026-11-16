export interface BarberType {
  id: string; // UUID
  shopName: string;
  location: string;
  bio: string; // optional ho sakta hai agar DB me nullable ho
  price: number;
  createdAt: string; // ISO Date string (frontend)
  updatedAt: string; // ISO Date string (frontend)
}
export interface PaymentType {
  id: string; // UUID
  amount: number; // payment amount
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
  transactionId?: string | null;
}

export interface AppointmentType {
  id: string;
  username: string;
  phone: string;
  barberId: string;
  date: string; // ISO string

  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

  barber?: BarberType;
  payment?: PaymentType | null;

  createdAt: string;
  updatedAt: string;
}
