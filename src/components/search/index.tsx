import { CircularProgress, Grid, Stack } from "@mui/material";
import { useState } from "react";
import SearchBar from "src/SearchBar";
import { fetchProducts } from "src/service";
import { IProduct, IProductRes } from "src/type";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import GoogleAdvertise from "../GoogleAdvertise";
type Props = {
  handleGetDetail: (url: string, title: string) => void;
};

const ADProps = {
  className: "adsbygoogle",
  client: "ca-pub-4082325421346977",
  slot: "7723512196",
  format: "auto",
  responsive: "true",
};

export default function SearchPage({ handleGetDetail }: Props) {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [routePages, setRoutePages] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [resultTitle, setResultTitle] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  const getProducts = async (type: "keyword" | "page", text: string) => {
    try {
      setLoading(true);

      const result: IProductRes = await fetchProducts(text, type);
      setIsSearch(true);
      if (type === "keyword") setResultTitle(text);

      setProducts(result.products);
      setRoutePages(result.route_pages);
    } catch (error: any) {
      setIsSearch(false);
      setResultTitle("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack sx={{ maxWidth: "1024px", margin: "auto", width: "100%" }}>
      {/* <GoogleAdvertise {...ADProps} /> */}
      <Stack sx={{ px: "24px", mt: isDesktop ? "40px" : "20px" }}>
        <Stack mb={isDesktop ? "166px" : "137px"}>
          <img src="/skinscanLogo.png" alt="logo" width={"180px"} />
        </Stack>

        <Stack
          sx={{
            color: "#141D57",
            marginBottom: "80px",
            fontWeight: 700,
            fontSize: isDesktop ? "36px" : "20px",
            lineHeight: isDesktop ? "36px" : "28px",
            display: "flex",
            textAlign: "left",
            flexDirection: isDesktop ? "row" : "column",
          }}
        >
          <span>어떤 화장품의 &nbsp;</span>
          <span> 어떤 성분이 궁금하신가요?</span>
        </Stack>
        <SearchBar
          value={text}
          setValue={setText}
          handleSearch={() => getProducts("keyword", text)}
        />
        {loading && (
          <CircularProgress sx={{ margin: "auto", mt: 15 }} size={120} />
        )}
        {!loading && isSearch && resultTitle && (
          <>
            <Stack>
              <p
                style={{
                  marginTop: "40px",

                  color: "#141D57",
                  fontWeight: 700,
                  fontSize: isDesktop ? "36px" : "20px",
                  lineHeight: isDesktop ? "36px" : "28px",
                }}
              >
                "{resultTitle}" 검색결과
              </p>
              <Grid sx={{ my: "40px" }} container>
                {products.map((product, index) => (
                  <Grid xs={12} md={6} key={product.id}>
                    <Stack
                      onClick={() => {
                        handleGetDetail(product.url, product.title);
                        navigate(`/${product.id}`);
                      }}
                      sx={{
                        "&:hover": {
                          color: "blue",
                          cursor: "pointer",
                        },
                        px: isDesktop ? 1.5 : 0,
                        my: isDesktop ? 2 : 0.5,
                        height: "50px",
                        color: "#141D57",
                        textAlign: "left",
                        fontWeight: 500,
                        fontSize: isDesktop ? "24px" : "16px",
                        lineHeight: isDesktop ? "24px" : "16px",
                      }}
                    >
                      {index + 1}. {product.title}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
              <Stack
                sx={{
                  margin: "auto",
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                }}
              >
                {routePages.map((item) => (
                  <Stack
                    onClick={() => getProducts("page", item.url)}
                    sx={{
                      "&:hover": {
                        color: "blue",
                        cursor: "pointer",
                      },
                      px: isDesktop ? 1.5 : 0,
                      my: isDesktop ? 2 : 0.5,
                      height: "50px",
                      color: "#141D57",
                      textAlign: "left",
                      fontWeight: 500,
                      fontSize: isDesktop ? "24px" : "16px",
                      lineHeight: isDesktop ? "24px" : "16px",
                    }}
                    key={item.id}
                  >
                    {item.title}
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
}
