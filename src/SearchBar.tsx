import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Stack, useMediaQuery } from "@mui/material";
import SearchMdIcon from "./icons/SearchMdIcon";
import SearchSmIcon from "./icons/SearchSmIcon";

type Props = {
  value: string;
  setValue: (value: string) => void;
  handleSearch: () => void;
};

export default function SearchBar({ value, setValue, handleSearch }: Props) {
  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <Stack
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        borderBottom: "3px solid #141D57",
      }}
    >
      <InputBase
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            handleSearch();
          }
        }}
        value={value}
        onChange={(v) => setValue(v.target.value)}
        sx={{
          ml: 1,
          flex: 1,
          fontSize: isDesktop ? "24px" : "18px",
          fontWeight: 600,
        }}
        placeholder="영어로 입력해주세요. ex) skin food"
      />
      <IconButton onClick={handleSearch} type="button" aria-label="search">
        {isDesktop ? <SearchMdIcon /> : <SearchSmIcon />}
      </IconButton>
    </Stack>
  );
}
