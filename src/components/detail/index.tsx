import { Chip, CircularProgress, Stack, useMediaQuery } from "@mui/material";
import { IIngredientsInfo, IProductAnlyzeResult } from "src/type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
const columns: GridColDef[] = [
  {
    field: "ingredient",
    headerName: "Ingredients Inside",
    minWidth: 150,
    disableColumnMenu: true,
    flex: 0.5,
    sortable: false,
    hideSortIcons: true,
    renderCell: ({ row }: { row: IIngredientsInfo }) => {
      return (
        <Stack sx={{ textAlign: "left" }}>
          <p
            style={{
              color: row.not_safe_description.length > 0 ? "red" : "#141D57",
            }}
          >
            {row.ingredient_name}
          </p>
          <div>
            <p style={{ wordWrap: "break-word", color: "yellow" }}>
              {row.caution_description}
            </p>
          </div>
          <div>
            <p style={{ wordWrap: "break-word", color: "red" }}>
              {" "}
              {row.not_safe_description}
            </p>
          </div>
        </Stack>
      );
    },
  },
  {
    field: "Role",
    headerName: "EWG CIR Cosmetic Roles",
    minWidth: 150,
    disableColumnMenu: true,
    flex: 0.5,
    sortable: false,
    hideSortIcons: true,
    renderCell: ({ row }: { row: IIngredientsInfo }) => {
      return (
        <Stack sx={{ textAlign: "left" }}>
          <Stack flexDirection={"row"} display={"flex"} gap={1}>
            {row.cir && <Chip label={row.cir} />}
            {row.ewg && <Chip label={row.ewg} />}
          </Stack>
          <p>{row.cosmetic_roles}</p>
        </Stack>
      );
    },
  },
];

type Props = {
  loading: boolean;
  result: IProductAnlyzeResult | null;
};
export default function DetailPage({ loading, result }: Props) {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  return (
    <Stack sx={{ maxWidth: "1024px", margin: "auto", width: "100%" }}>
      <Stack sx={{ px: "24px", my: "50px" }}>
        <Stack
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => {
            navigate(`/`);
          }}
          style={{
            textAlign: "left",
            fontSize: "30px",
            fontWeight: 700,
            lineHeight: "30px",
            color: "#141D57",
            marginBottom: "122px",
          }}
        >
          Skin Scan
        </Stack>

        {loading && (
          <CircularProgress sx={{ margin: "auto", mt: 15 }} size={120} />
        )}
        {!loading && result && (
          <Stack display={"flex"} justifyContent={"center"}>
            <Stack
              display={"flex"}
              flexDirection={isDesktop ? "row" : "column"}
              alignItems={"center"}
            >
              <img
                src={result.product_info.img_url}
                alt={result.product_info.title}
                width={isDesktop ? "438px" : "100px"}
                height={isDesktop ? "438px" : "100px"}
                style={{
                  flex: 0.5,
                  objectFit: "contain",
                }}
              />
              <Stack sx={{ textAlign: "left", flex: 0.5 }}>
                <p>{result.product_info.brand_name}</p>
                <p>{result.product_info.title}</p>
                <p>{result.product_info.prouduct_description}</p>
                <p>{result.product_info.update_info}</p>
              </Stack>
            </Stack>
            <Stack sx={{ width: "100%", my: 10, textAlign: "left" }}>
              <p>Ingredients overview</p>
              <p
                style={{
                  wordBreak: "break-word",
                }}
              >
                {result.product_info.ingredients}
              </p>
            </Stack>
            <DataGrid
              rowHeight={120}
              hideFooter
              disableRowSelectionOnClick
              rows={result.analyze_info.ingredients_info}
              getRowId={(row: IIngredientsInfo) => row.ingredient_name}
              columns={columns}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
