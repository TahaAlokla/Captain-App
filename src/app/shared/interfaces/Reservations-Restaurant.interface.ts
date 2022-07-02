export interface ReservationsRestaurant {
  name: string,
  phone: string |number,
  numberTable: number,
  dateOfReservation: string,
  note?: string,
  rest_id: string,
  checkSpam: string
}
