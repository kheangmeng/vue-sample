import type { PaymentResponse } from '@/types'

export const mapPayments = (res: any): PaymentResponse[] => {
  return res.payments?.map((payment: PaymentResponse) => ({
    id: payment.id,
    order_id: payment.order_id,
    amount: payment.amount,
    payment_date: payment.payment_date,
    payment_method: payment.payment_method,
    invoice: payment.Invoice,
    order: payment.Order,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  }))
}
