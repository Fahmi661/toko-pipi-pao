import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Rainbow Cloud Cake",
    price: 150000,
    originalPrice: 185000,
    description: "Layer cake pelangi dengan frosting awan vanilla yang super lembut.",
    image: "https://picsum.photos/400/400?random=1",
    category: "cake",
    popular: true
  },
  {
    id: 2,
    name: "Berry Happy Tart",
    price: 45000,
    description: "Tart buah segar dengan custard lemon yang bikin melek.",
    image: "https://picsum.photos/400/400?random=2",
    category: "pastry",
    popular: true
  },
  {
    id: 3,
    name: "Choco Bear Cupcake",
    price: 25000,
    originalPrice: 35000,
    description: "Cupcake coklat belgian dengan hiasan beruang lucu.",
    image: "https://picsum.photos/400/400?random=3",
    category: "cupcake"
  },
  {
    id: 4,
    name: "Matcha Zen Roll",
    price: 85000,
    originalPrice: 95000,
    description: "Bolu gulung matcha premium dengan isian krim kacang merah.",
    image: "https://picsum.photos/400/400?random=4",
    category: "cake"
  },
  {
    id: 5,
    name: "Pinky Promise Donut",
    price: 15000,
    description: "Donut strawberry glaze dengan taburan sprinkle cinta.",
    image: "https://picsum.photos/400/400?random=5",
    category: "pastry"
  },
  {
    id: 6,
    name: "Galaxy Mousse",
    price: 55000,
    originalPrice: 70000,
    description: "Mousse cake blueberry dengan glaze galaksi yang berkilau.",
    image: "https://picsum.photos/400/400?random=6",
    category: "cake",
    popular: true
  }
];