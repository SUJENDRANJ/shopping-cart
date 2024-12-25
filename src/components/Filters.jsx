import { Button, Container, Form } from "react-bootstrap";
import Rating from "./Rating";
import { useCartContext } from "../contexts/Context";
import { useEffect } from "react";

const Filters = () => {
  const {
    productState,
    // productState: { byFastDelivery, byRating, byStock },
    productDispatch,
  } = useCartContext();

  // useEffect(() => {
  //   console.log(productState.by);
  // }, [productState]);

  return (
    <div className="filters bg-dark text-white">
      <Container className="mt-5">
        <h3>Filter Products</h3>
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            // fontSize: "17px",
            marginTop: "20px",
          }}
        >
          <Form.Check
            type="radio"
            label="Ascending"
            name="group1"
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "lowToHigh",
              })
            }
            checked={productState.sort === "lowToHigh" ? true : false}
          />
          <Form.Check
            type="radio"
            label="Descending"
            name="group1"
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "highToLow",
              })
            }
            checked={productState.sort === "highToLow" ? true : false}
          />
          <Form.Check
            label="Include Out of Stack"
            name="group1"
            onChange={() =>
              productDispatch({
                type: "FILTER_BY_STOCK",
              })
            }
            checked={productState.byStock ? true : false}
          />
          <Form.Check
            label="Fast Delivery"
            name="group1"
            onChange={() =>
              productDispatch({
                type: "FILTER_BY_DELIVERY",
              })
            }
            checked={productState.byFastDelivery ? true : false}
          />

          <Rating
            productDispatch={productDispatch}
            productState={productState}
          />

          <Button onClick={() => productDispatch({ type: "CLEAR_FILTER" })}>
            Clear Filter
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Filters;
