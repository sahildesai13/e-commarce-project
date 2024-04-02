import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCategory, addData } from "./component/reduxApp/storeSlice";
import Home from "./component/Home/Home";
import { Route, Routes } from "react-router-dom";
import ProductView from "./component/productView/ProductView";
import Header from "./component/Header/Header";
import SearchItems from "./component/SearchItems/SearchItems";
import Category from "./component/Category/Category";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products?limit=100`);
        dispatch(addData(response.data.products));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const getCategory = async ()=>{
        try{
          const category = await axios.get('https://dummyjson.com/products/categories');
          dispatch(addCategory(category.data));
        }catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    getCategory();
    getData();
  }, [dispatch]);

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/item/:id" element={ <ProductView/> } />
        <Route path="/Search" element={<SearchItems/>} />
        <Route path="/category/:id" element={<Category/>} />
      </Routes>
    </div>
  );
}

export default App;
