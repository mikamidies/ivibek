interface BookingSlot {
  date: string;
  time: string;
  mentorId: number;
}

interface CreateBookingRequest {
  mentorId: number;
  slots: string[];
  description?: string;
}

interface BookingResponse {
  id: number;
  mentorId: number;
  slots: string[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

export const useBooking = () => {
  const API_BASE = "https://api.ivybek.com";

  const fetchAvailableSlots = async (
    mentorId: number,
    startDate?: string,
    endDate?: string
  ): Promise<string[]> => {
    try {
      const token = useCookie("access_token");

      const mockData = [
        "2024-11-13T10:00",
        "2024-11-13T11:00",
        "2024-11-13T14:00",
        "2024-11-13T15:00",
        "2024-11-14T10:00",
        "2024-11-14T11:00",
        "2024-11-14T12:00",
        "2024-11-15T13:00",
        "2024-11-15T14:00",
        "2024-11-15T16:00",
      ];

      return mockData;
    } catch (error) {
      console.error("Failed to fetch available slots:", error);
      return [];
    }
  };

  const createBooking = async (
    request: CreateBookingRequest
  ): Promise<BookingResponse | null> => {
    try {
      const token = useCookie("access_token");

      const mockResponse: BookingResponse = {
        id: Math.floor(Math.random() * 1000),
        mentorId: request.mentorId,
        slots: request.slots,
        totalPrice: request.slots.length * 50,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      return mockResponse;
    } catch (error) {
      return null;
    }
  };

  const fetchMyBookings = async (): Promise<BookingResponse[]> => {
    try {
      const token = useCookie("access_token");

      return [];
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      return [];
    }
  };

  const cancelBooking = async (bookingId: number): Promise<boolean> => {
    try {
      const token = useCookie("access_token");

      return true;
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      return false;
    }
  };

  return {
    fetchAvailableSlots,
    createBooking,
    fetchMyBookings,
    cancelBooking,
  };
};
