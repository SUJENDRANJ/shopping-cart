import { useCartContext } from "../contexts/Context";
import { productReducer } from "../contexts/Reducers";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";

const Home = () => {
  const {
    state: { isLoading },
    state: { products },
    productState,
  } = useCartContext();

  const transformProducts = () => {
    let sortedProducts = products;

    // const a = [3, 4, 1, 5, 6, -4];
    // console.log(a.sort((a, b) => b - a));

    if (productState.sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        productState.sort === "highToLow"
          ? b.price - a.price
          : a.price - b.price
      );
    }

    if (!productState.byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.stock > 40);
    }

    if (productState.byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.weight <= 5);
    }

    if (productState.byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.rating >= productState.byRating
      );
    }

    if (productState.searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.title
          .toLowerCase()
          .includes(productState.searchQuery.toLowerCase())
      );
    }

    return sortedProducts;
  };

  return isLoading ? (
    <div
      style={{
        display: "flex",
        backgroundColor: "black",
        width: "100%",
        height: "100vh",
      }}
    >
      <p>Loading...</p>
    </div>
  ) : (
    <div className="home">
      <Filters />
      <div className="productsContainer">
        {transformProducts().map((prod) => (
          <div key={prod.id}>
            <SingleProduct prod={prod} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
