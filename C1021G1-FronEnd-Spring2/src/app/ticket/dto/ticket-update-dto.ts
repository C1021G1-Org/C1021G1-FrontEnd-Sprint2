import {FormControl} from '@angular/forms';

export interface TicketUpdateDto {
  id: number
  floor: string
  location: number
  sumPrice: number
  ticketType: number
  endDate: string
}
