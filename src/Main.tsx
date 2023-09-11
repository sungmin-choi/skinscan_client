import { Stack } from "@mui/material";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchProductDetail } from "./service";
import { IProduct, IProductAnlyzeResult } from "./type";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import DetailPage from "./components/detail";
import SearchPage from "./components/search";

export default function Main() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IProductAnlyzeResult | null>(null);

  const getDetailInfo = async (url: string, title: string) => {
    try {
      setLoading(true);

      const result = await fetchProductDetail(url, title);

      setResult(result);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<SearchPage handleGetDetail={getDetailInfo} />}
        />
        <Route
          path=":id"
          element={<DetailPage loading={loading} result={result} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
