export interface Payment {
  order_id: number
  amount: number
  payment_method: PaymentMethod
}

export type PaymentMethod = 'Cash' | 'Credit Card' | 'Bank Transfer' | 'Mobile Payment'

export interface PaymentResponse {
  id: number
  order_id: number
  amount: number
  payment_date: string
  payment_method: PaymentMethod
}
