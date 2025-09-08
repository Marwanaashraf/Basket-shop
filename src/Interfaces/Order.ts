import { CartItem } from './CartItem';
import { IOrderData } from './OrderData';

export interface IOrder {
    orderData : IOrderData,
    cartItems: CartItem[],
}
