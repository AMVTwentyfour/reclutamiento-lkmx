export interface Analytics {
  overview: {
    totalProducts: number;
    totalCategories: number;
    lowStockProducts: number;
    outOfStockProducts: number;
    averagePrice: number;
    totalInventoryValue: number;
  };
  productsByCategory: ProductsByCategory[];
  stockByCategory: StockByCategory[];
  topProducts: TopProduct[];
  timestamp: string;
}

export interface ProductsByCategory {
  categoryId: number;
  categoryName: string;
  productCount: number;
}

export interface StockByCategory {
  categoryName: string;
  totalStock: number;
  averagePrice: number;
}

export interface TopProduct {
  id: number;
  name: string;
  stock: number;
  price: number;
  categoryName: string;
}
