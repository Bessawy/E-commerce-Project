import { Box, Divider, Grid, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageSlider from "./slider/slider";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import WeekendIcon from "@mui/icons-material/Weekend";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IceSkatingOutlinedIcon from "@mui/icons-material/IceSkatingOutlined";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useAppSelector } from "../reduxhook/hooks";
import { ProductType } from "../Types/product";
import ProductItem from "./product/product";
import { width } from "@mui/system";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const imges = [
  "/clothes.jpg",
  "/furniture.jpg",
  "shoes.jpg",
  "electronics.jpg",
];

const advertise = [
"laptop.jpg", "razor.jpg"

]

const Home = () => {
  const products = useAppSelector((state) => state.productReducer);
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    setProductList(products.slice(0, 10));
  }, []);

  const navigate = useNavigate()

  return (
    <Box
      sx={{
        marginTop: 0,
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <Swiper className="mySwiper">
        {advertise.map((item, index)=>{
          return <SwiperSlide>
            <Box component="img" key={index} src={item} sx={{width: "100%", height: 450}}>
            </Box>
          </SwiperSlide>
        })}
      </Swiper>
      <Divider sx={{ margin: 5 }} />
      <Grid
        container
        spacing={10}
        sx={{ height: 500, minWidth: 1000, margin: "auto" }}
      >
        <Grid item xs={3}>
          <Typography variant="h5" color="#FF5F1F">
            Product Categories
          </Typography>
          <Divider />
          <List>
            <ListItem>
              <IceSkatingOutlinedIcon sx={{ marginRight: 2 }} /> Shoes
            </ListItem>
            <ListItem>
              <LaptopChromebookIcon sx={{ marginRight: 2 }} /> Electronics
            </ListItem>
            <ListItem>
              <WeekendIcon sx={{ marginRight: 2 }} /> Furniture
            </ListItem>
            <ListItem>
              <CheckroomIcon sx={{ marginRight: 2 }} />
              Clothes
            </ListItem>
            <ListItem>
              <AddOutlinedIcon sx={{ marginRight: 2 }} /> Others
            </ListItem>
          </List>
          <Divider />
          <Typography variant="h6" marginTop={6}>
            More Product are added on a daily basis
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <ImageSlider slides={imges} />
        </Grid>
      </Grid>
      <Divider sx={{ margin: 10 }} />
      <Box>
        <Typography textAlign="center" variant="h5" color="#FF5F1F">
          {" "}
          Most Famous Products
        </Typography>
      </Box>
      <Box sx={{border: 2, marginTop: 2, boxShadow: 3, borderRadius:10, padding: 2, borderColor:"#FF5F1F" }}>
        <Swiper
          slidesPerView={3.5}
          spaceBetween={20}
          centeredSlides={true}
          modules={[Pagination]}
          className="mySwiper"
        >
          {productList.map((item) => {
            return (
              <SwiperSlide>
                <ProductItem Item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
      <Box sx={{display:"flex", justifyContent: "center", marginTop: 1}}>
        <Button variant="contained" onClick={()=> navigate("/products")}> Search for more Product</Button>
      </Box>
    </Box>
  );
};

export default Home;
