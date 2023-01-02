import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import GridItem from "../../Themes/gridTheme";
import EuroIcon from "@mui/icons-material/Euro";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useAppDispatch, useAppSelector } from "../../reduxhook/hooks";
import { addtoCart, removeFromCart } from "../../redux/reducers/cartReducer";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();

  return (
    <Box marginTop={20}>
      {cartItems.map((item, index) => {
        return (
          <Box key={item.id} margin={5}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Box
                  component="img"
                  src={item.images[0]}
                  sx={{ width: "100%", height: "100%" }}
                ></Box>
              </Grid>
              <Grid item xs={9}>
                <GridItem sx={{ height: "70%" }}>
                  <Typography variant="h6"> {item.title} </Typography>
                  <Divider sx={{ margin: 1 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography> Price </Typography>
                      <Divider sx={{ margin: 1 }} />
                      <Typography
                        variant="inherit"
                        sx={{ fontSize: 16, fontWeight: 700 }}
                        color="secondary"
                      >
                        {item.price} <EuroIcon sx={{ fontSize: 12 }} />
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography> Count </Typography>
                      <Divider sx={{ margin: 1 }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            dispatch(removeFromCart(index));
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="h6"> {item.count}</Typography>
                        <IconButton
                          onClick={() => {
                            dispatch(addtoCart(item));
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </GridItem>
                <GridItem sx={{ height: "30%" }}>
                  <Typography>
                    Total Price:
                    <Typography
                      variant="inherit"
                      sx={{ fontSize: 16, fontWeight: 700 }}
                      color="secondary"
                    >
                      {item.price * item.count}{" "}
                      <EuroIcon sx={{ fontSize: 12 }} />
                    </Typography>
                  </Typography>
                </GridItem>
              </Grid>
            </Grid>
          </Box>
        );
      })}
      <Box>
        <GridItem>
          <Typography variant="h6">Total Price</Typography>
          <Divider />
        </GridItem>
        <GridItem>
          <Typography
            variant="inherit"
            sx={{ fontSize: 16, fontWeight: 700 }}
            color="secondary"
          >
            {cartItems.reduce(function (acc, item) {
              return acc + item.price * item.count;
            }, 0)}{" "}
            <EuroIcon sx={{ fontSize: 12 }} />
          </Typography>
        </GridItem>
        <GridItem>
          <Button variant="contained">BUY PRODUCTS</Button>
        </GridItem>
      </Box>
    </Box>
  );
};

export default Cart;
