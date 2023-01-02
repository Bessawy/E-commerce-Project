import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProductServer } from "../../redux/reducers/productReducer";
import { useAppDispatch } from "../../reduxhook/hooks";
import GridItem from "../../Themes/gridTheme";
import { CreateCategoryType, ProductCreateType } from "../../Types/product";
import { categoryOptions, createproductOptions } from "./product_utils";

const Createproduct = () => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<CreateCategoryType>("Clothes");
  const [urls, setUrls] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createProductHandler = () => {
    const images = urls.trim().split(/\s+/);
    const categoryObj = categoryOptions.find((item) => item.value === category);
    const categoryId = categoryObj ? categoryObj.id : 1;
    const createProduct: ProductCreateType = {
      images: images,
      title: title,
      price: price,
      description: description,
      categoryId: categoryId,
    };

    dispatch(addProductServer(createProduct)).then((data) => {
      if ("error" in data) {
        setMessage("Failed to create Product (Invalid Data)");
        setOpen(true);
      } else {
        navigate("/products");
      }
    });
  };

  return (
    <Box sx={{ m: 15 }}>
      <Paper component="form">
        <TextField
          variant="standard"
          label="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ m: 3, width: "30%" }}
          required
        ></TextField>
        <TextField
          variant="standard"
          label="price"
          type="number"
          sx={{ m: 3, width: "30%" }}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          required
        ></TextField>
        <Box>
          <TextField
            variant="outlined"
            label="Description"
            multiline
            rows={4}
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ m: 3, width: "50%" }}
          ></TextField>
        </Box>
        <TextField
          id="products__select-category"
          select
          size="small"
          label="Category"
          required
          value={category}
          sx={{ margin: 3, width: 160 }}
          onChange={(e) => setCategory(e.target.value as CreateCategoryType)}
        >
          {createproductOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <Box>
          <TextField
            variant="outlined"
            label="Images URL separated by space/enter"
            multiline
            rows={4}
            onChange={(e) => setUrls(e.target.value)}
            sx={{ m: 3, width: "50%" }}
            required
          ></TextField>
        </Box>
        <GridItem>
          <Button
            variant="contained"
            sx={{ m: 3 }}
            onClick={() => createProductHandler()}
          >
            {" "}
            Create Product{" "}
          </Button>
        </GridItem>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={"error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Createproduct;
