export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number; // Harga sebelum diskon
  description: string;
  image: string;
  category: 'cake' | 'cupcake' | 'pastry';
  popular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AiRecommendation {
  recipeName: string;
  description: string;
  prepTime: string;
  cookingTime: string;
  difficulty: 'Mudah' | 'Sedang' | 'Rumit';
  ingredients: string[];
  steps: string[];
  chefTips: string;
}

export type OrderStatusType = 'confirmed' | 'baking' | 'shipping' | 'delivered';

export interface Order {
  id: string;
  items: CartItem[];
  total: number; // Ini adalah Grand Total (Subtotal + Tax + Ongkir)
  subtotal: number;
  tax: number;
  shipping: number;
  status: OrderStatusType;
  method: 'bank' | 'cod';
  date: Date;
  customerName: string;
  customerAddress: string;
  customerEmail: string; // Field baru untuk alamat email pelanggan
}