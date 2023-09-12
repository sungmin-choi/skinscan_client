import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { IIngredientsInfo, IProductAnlyzeResult } from "src/type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ExpandedUp from "src/icons/ExpandedUp";
import ExpandedDown from "src/icons/ExpandedDown";
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
  const [expanded, setExpanded] = useState(false);

  return (
    <Stack sx={{ maxWidth: "1024px", margin: "auto", width: "100%" }}>
      <Stack sx={{ px: "24px", mt: isDesktop ? "40px" : "20px" }}>
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
          <img src="/skinscanLogo.png" alt="logo" width={"180px"} />
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
              mb={"40px"}
            >
              <img
                src={result.product_info.img_url}
                alt={result.product_info.title}
                width={isDesktop ? "438px" : "120px"}
                height={isDesktop ? "438px" : "120px"}
                style={{
                  flex: 0.5,
                  objectFit: "contain",
                }}
              />
              <Stack sx={{ textAlign: "left", flex: 0.5 }}>
                <span
                  style={{
                    color: "#7580C8",
                    fontSize: isDesktop ? "24px" : "20px",
                    fontWeight: 700,
                  }}
                >
                  {result.product_info.brand_name}
                </span>
                <span
                  style={{
                    marginTop: "30px",
                    color: "#141D57",
                    fontFamily: "Pretendard",
                    fontSize: isDesktop ? "32px" : "24px",
                    fontWeight: 700,
                    marginBottom: "40px",
                  }}
                >
                  {result.product_info.title}
                </span>

                <span
                  style={{
                    color: "#515151",
                    fontFamily: "Pretendard",
                    fontSize: isDesktop ? "20px" : "18px",
                    fontWeight: 500,
                    lineHeight: "100%",
                    marginBottom: "10px",
                  }}
                >
                  {result.product_info.prouduct_description}
                </span>
              </Stack>
            </Stack>

            <Accordion
              expanded={expanded}
              onChange={() => setExpanded(!expanded)}
            >
              <AccordionSummary
                expandIcon={expanded ? <ExpandedUp /> : <ExpandedDown />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <span
                  style={{
                    color: "#66697D",
                    fontSize: isDesktop ? "24px" : "18px",
                    fontWeight: 700,
                  }}
                >
                  Ingredients overview
                </span>
              </AccordionSummary>
              <AccordionDetails>
                <p
                  style={{
                    textAlign: "left",
                    wordBreak: "break-word",
                  }}
                >
                  {result.product_info.ingredients}
                </p>
              </AccordionDetails>
            </Accordion>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack
                sx={{
                  borderRadius: "10px",
                  my: "20px",
                  border: "1px solid #A4B0FF",
                  padding: "12px 14px",
                  fontWeight: 700,
                  color: "#141D57",
                  fontSize: "16px",
                  whiteSpace: "nowrap",
                }}
              >
                <div style={{ whiteSpace: "nowrap" }}>
                  Found{" "}
                  {
                    <span
                      style={{
                        color: "#FF4627",
                        fontWeight: "800",
                      }}
                    >
                      {result.analyze_info.danger_count}
                    </span>
                  }{" "}
                  number of ingredients that are known Malassezia/Fungal Acne
                  Triggers
                </div>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
      {!loading && result && (
        <Stack sx={{ px: isDesktop ? "24px" : "4px", mb: "40px" }}>
          <DataGrid
            rowHeight={isDesktop ? 120 : 200}
            hideFooter
            disableRowSelectionOnClick
            rows={result.analyze_info.ingredients_info}
            getRowId={(row: IIngredientsInfo) => row.ingredient_name}
            columns={columns}
          />
        </Stack>
      )}
    </Stack>
  );
}
