import { CartItem, RestaurantSettings } from '../types';

export function formatPrice(amount: number): string {
  return `৳${amount.toLocaleString('en-BD')}`;
}

export function generateWhatsAppOrderUrl(
  items: CartItem[],
  customerName: string,
  customerPhone: string,
  deliveryAddress: string,
  orderType: string,
  subtotal: number,
  deliveryCharge: number,
  totalAmount: number,
  specialNotes: string | undefined,
  orderNumber: string,
  whatsappNumber: string
): string {
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  let text = `*🍽️ NEW ORDER — SKY BITE RESTAURANT*\n`;
  text += `*Order ID:* ${orderNumber}\n`;
  text += `--------------------------------\n`;
  text += `*Customer:* ${customerName}\n`;
  text += `*Phone:* ${customerPhone}\n`;
  text += `*Order Type:* ${orderType.toUpperCase()}\n`;
  if (orderType === 'delivery') {
    text += `*Delivery Address:* ${deliveryAddress}\n`;
  }
  text += `\n*Ordered Items:*\n`;

  items.forEach((ci, idx) => {
    text += `${idx + 1}. *${ci.item.name}* x ${ci.quantity} = ${formatPrice(ci.item.price * ci.quantity)}\n`;
    if (ci.specialNotes) {
      text += `   _Note: ${ci.specialNotes}_\n`;
    }
  });

  text += `--------------------------------\n`;
  text += `*Subtotal:* ${formatPrice(subtotal)}\n`;
  if (orderType === 'delivery') {
    text += `*Delivery Charge:* ${formatPrice(deliveryCharge)}\n`;
  }
  text += `*TOTAL AMOUNT:* ${formatPrice(totalAmount)}\n`;

  if (specialNotes) {
    text += `*Special Instructions:* ${specialNotes}\n`;
  }

  text += `\n*Location:* Kushtia, Bangladesh\n`;
  text += `_Please confirm my order & estimated delivery time. Thank you!_`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function generateWhatsAppReservationUrl(
  name: string,
  phone: string,
  date: string,
  time: string,
  guests: number,
  seating: string,
  notes: string | undefined,
  reservationNumber: string,
  whatsappNumber: string
): string {
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  let text = `*🪑 TABLE RESERVATION REQUEST — SKY BITE RESTAURANT*\n`;
  text += `*Booking Ref:* ${reservationNumber}\n`;
  text += `--------------------------------\n`;
  text += `*Name:* ${name}\n`;
  text += `*Phone:* ${phone}\n`;
  text += `*Date:* ${date}\n`;
  text += `*Time:* ${time}\n`;
  text += `*Guests:* ${guests} Person(s)\n`;
  text += `*Seating:* ${seating}\n`;
  if (notes) {
    text += `*Special Request:* ${notes}\n`;
  }
  text += `--------------------------------\n`;
  text += `_Please let me know if my reservation is confirmed. Thank you!_`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function generateWhatsAppStatusUpdateUrl(
  customerName: string,
  customerPhone: string,
  reservationNumber: string,
  status: 'confirmed' | 'cancelled' | 'completed',
  date: string,
  time: string,
  guests: number,
  seating: string,
  adminNotes?: string
): string {
  const cleanPhone = customerPhone.replace(/[^0-9]/g, '');

  let text = `*🛎️ SKY BITE RESTAURANT — RESERVATION UPDATE*\n`;
  text += `*Booking Ref:* ${reservationNumber}\n`;
  text += `--------------------------------\n`;
  text += `Dear *${customerName}*,\n\n`;

  if (status === 'confirmed') {
    text += `🎉 Great news! Your table reservation is *CONFIRMED*.\n\n`;
    text += `📅 *Date:* ${date}\n`;
    text += `⏰ *Time:* ${time}\n`;
    text += `👥 *Guests:* ${guests} Person(s)\n`;
    text += `🪑 *Seating:* ${seating}\n`;
    if (adminNotes) {
      text += `📌 *Table / Note:* ${adminNotes}\n`;
    }
    text += `\n📍 *Address:* 5 Rasta More, 1 No. R. A. Khan Road, Kushtia.\n`;
    text += `We look forward to welcoming you to Kushtia's premier rooftop dining!`;
  } else if (status === 'cancelled') {
    text += `⚠️ Your table reservation for *${date} at ${time}* has been *CANCELLED*.\n\n`;
    if (adminNotes) {
      text += `Reason/Note: ${adminNotes}\n\n`;
    }
    text += `If this was done in error or you would like to reschedule for another time, please reply to this chat or call us directly.`;
  } else if (status === 'completed') {
    text += `✨ Your reservation visit has been marked as *COMPLETED*.\n\n`;
    text += `Thank you for dining with Sky Bite Restaurant at Kushtia 5 Rasta More! We hope you enjoyed the food and rooftop ambience.\n`;
    text += `We look forward to hosting you and your loved ones again soon!`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function generateWhatsAppOrderStatusUrl(
  customerName: string,
  customerPhone: string,
  orderNumber: string,
  status: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'confirmed',
  orderType: string,
  totalAmount: number,
  adminNotes?: string
): string {
  const cleanPhone = customerPhone.replace(/[^0-9]/g, '');

  let text = `*🍽️ SKY BITE RESTAURANT — ORDER STATUS UPDATE*\n`;
  text += `*Order ID:* ${orderNumber}\n`;
  text += `--------------------------------\n`;
  text += `Dear *${customerName}*,\n\n`;

  if (status === 'preparing') {
    text += `🍳 Great news! Your order is now being *PREPARED FRESH* in our kitchen by our executive chefs.\n`;
    text += `Type: ${orderType.toUpperCase()} | Total: ${formatPrice(totalAmount)}\n`;
    if (adminNotes) {
      text += `_Kitchen Note: ${adminNotes}_\n`;
    }
    text += `\nWe will notify you the moment it leaves for delivery!`;
  } else if (status === 'out_for_delivery') {
    text += `🛵 Your food is *OUT FOR DELIVERY*!\n`;
    text += `Our delivery rider is on the way to your address in Kushtia.\n`;
    text += `Total Payable: *${formatPrice(totalAmount)}*\n`;
    if (adminNotes) {
      text += `_Rider/Delivery Note: ${adminNotes}_\n`;
    }
    text += `\nPlease keep your phone reachable. Enjoy your meal!`;
  } else if (status === 'delivered') {
    text += `✅ Your order has been successfully *DELIVERED / COMPLETED*.\n\n`;
    text += `Thank you for choosing Sky Bite Restaurant! We hope you love the taste and service.\n`;
    text += `Have feedback or want to leave a review? We'd love to hear from you!`;
  } else if (status === 'cancelled') {
    text += `⚠️ Your order has been marked as *CANCELLED*.\n`;
    if (adminNotes) {
      text += `Reason: ${adminNotes}\n`;
    }
    text += `\nIf you have any questions or would like to re-order, please reply to this message.`;
  } else {
    text += `⏳ Your order is currently *PENDING* confirmation from restaurant staff.\n`;
    text += `Total: ${formatPrice(totalAmount)}\n`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function getGoogleMapsUrl(settings: RestaurantSettings): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`;
}
