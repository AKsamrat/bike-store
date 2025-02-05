export type TProduct = {
  title: string;
  author: string;
  price: number;
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';
  description: string;
  imageUrl?: string;
  quantity: number;
  inStock?: boolean;
  isDeleted?: boolean;
};
