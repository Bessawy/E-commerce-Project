import {
  Box,
  Divider,
  Button,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../reduxhook/hooks";
import SearchIcon from "@mui/icons-material/Search";
import { Container } from "@mui/system";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import ProductItem from "./product";
import { ProductListType, ProductType, SortType } from "../../Types/product";
import {
  getCategoryId,
  getPagesNo,
  productOptions,
  scrollUp,
  sortOptions,
} from "./product_utils";


const Products = () => {
  const products: ProductType[] = useAppSelector(
    (state) => state.productReducer
  );

  const ItemsInPage: number = 9;

  const [list, setList] = useState<ProductListType>("All");
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("None");
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pages_no = getPagesNo(productList.length, ItemsInPage);

  const filterItemsHandler = () => {
    setCurrentPage(1);
    const id = getCategoryId(list);
    let productSearch = products.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "Lowest") {
      productSearch = productSearch.sort((a, b) => a.price - b.price);
    } else if (sort === "Highest") {
      productSearch = productSearch.sort((a, b) => b.price - a.price);
    }

    if (id === 0) {
      setProductList(productSearch);
    } else {
      setProductList(productSearch.filter((item) => item.category.id === id));
    }
  };

  useEffect(() => {
    setProductList(products);
  }, [products]);

  return (
    <Container sx={{ marginTop: 15 }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="products__sort-price"
          select
          size="small"
          style={{ width: 120 }}
          label="Sort"
          defaultValue="None"
          helperText="Sort products"
          onChange={(e) => setSort(e.target.value as SortType)}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="products__select-category"
          select
          size="small"
          label="Category"
          defaultValue="All"
          helperText="Filter products"
          style={{ width: 160 }}
          onChange={(e) => setList(e.target.value as ProductListType)}
        >
          {productOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <Paper
          sx={{
            p: "0px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            height: 40,
          }}
          variant="outlined"
        >
          <InputBase
            sx={{ flex: 1, p: 2 }}
            placeholder="Products"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Divider
            sx={{ height: 1, m: 0.5, borderWidth: 1 }}
            orientation="vertical"
          />
          <IconButton
            type="button"
            aria-label="search"
            onClick={(e) => filterItemsHandler()}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Grid container spacing={3} m={2} p={2}>
        {productList
          .slice((currentPage - 1) * 9, (currentPage - 1) * 9 + 9)
          .map((item) => {
            return (
              <Grid item key={item.id}>
                {" "}
                <ProductItem Item={item} />{" "}
              </Grid>
            );
          })}
      </Grid>

      <Paper
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <IconButton
          type="button"
          aria-label="NavLeft"
          disabled={currentPage - 1 < 1}
          onClick={(e) => {setCurrentPage(currentPage - 1)}}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <Button
          variant="pages"
          disabled={currentPage - 1 < 1}
          onClick={(e) => {
            setCurrentPage(currentPage - 1)
          }}
        >
          {currentPage - 1}
        </Button>
        <Button variant="pages" sx={{ backgroundColor: "#FF5F1F" }}>
          {currentPage}
        </Button>
        <Button
          variant="pages"
          disabled={currentPage + 1 > pages_no}
          onClick={(e) => {
            setCurrentPage(currentPage + 1);
            scrollUp();
          }}
        >
          {currentPage + 1}
        </Button>

        <IconButton
          type="button"
          aria-label="NavRight"
          disabled={currentPage + 1 > pages_no}
          onClick={(e) => {
            setCurrentPage(currentPage + 1);
            scrollUp();
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Paper>
    </Container>
  );
};

export default Products;
