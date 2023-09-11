export interface IProduct {
  id: number;
  title: string;
  url: string;
}

export interface IProductRes {
  products: IProduct[];
  route_pages: IProduct[];
}

export interface IProductDetail {
  title: string;
  brand_name: string;
  img_url: string;
  ingredients: string;
  prouduct_description: string;
  update_info: string;
}

export interface IAnalyzeInfo {
  danger: string;
  danger_count: number;
  ingredients_info: IIngredientsInfo[];
}

export interface IProductAnlyzeResult {
  analyze_info: IAnalyzeInfo;
  product_info: IProductDetail;
}

export interface IIngredientsInfo {
  caution_description: string;
  cir: string;
  cosmetic_roles: string;
  ewg: string;
  ingredient_name: string;
  isCuation: boolean;
  not_safe_description: string;
  not_safe_rating: string;
}
