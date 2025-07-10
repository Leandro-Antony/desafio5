import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import CircularProgress from '@mui/material/CircularProgress';
import { ShoppingCart } from 'lucide-react';

export function ProductList() {
  const category = "laptops";
  const limit = 12;
  const apiURL = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description,stock`;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>TRJ MEGASTORE</h1>
      {products.map((products) => (
        <div key={products.id} className={styles.product}>
          <img src={products.thumbnail} alt={products.title} />
          <h2 className={styles.title}>{products.title}</h2>
          <p className={styles.description}>{products.description}</p>
          <p className={styles.price}>R$ {products.price.toFixed(2)}</p>
          <button className={styles.btn}>ADD TO CART <ShoppingCart /></button>
        </div>
      ))}

      {loading && (
        <div>
            <CircularProgress
            size="10rem"
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{
                color: "#001111",
            }}/>
            <p>Loading products...</p>
        </div>
      )
      }
    </div>
  );
}
