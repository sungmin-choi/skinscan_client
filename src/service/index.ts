import axios, { Axios } from "axios";
import { IProduct, IProductAnlyzeResult, IProductRes } from "src/type";

// axios 인스턴스 생성
const client: Axios = axios.create({
  baseURL: "https://api.skinscan.kr",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async (
  keyword: string,
  type: "keyword" | "page"
): Promise<IProductRes> => {
  try {
    const response = await client.get(
      `${type === "keyword" ? `/search?query=${keyword}` : keyword}`
    );
    return response.data.result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchProductDetail = async (
  keyword: string,
  title: string
): Promise<IProductAnlyzeResult> => {
  try {
    const response = await client.get(`/info?query=${keyword}?title=${title}`);
    return response.data.result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
