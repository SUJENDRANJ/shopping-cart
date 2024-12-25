import { Button, Card, Container } from "react-bootstrap";
import { useCartContext } from "../contexts/Context";
import { useEffect } from "react";

const SingleProduct = ({ prod }) => {
  //
  const {
    state: { cart },
    dispatch,
  } = useCartContext();

  function handleAddToCart(currProduct) {
    dispatch({
      type: "ADD_ITEM",
      payload: currProduct,
    });
  }

  function handleRemoveFromCart(currProduct) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: currProduct,
    });
  }

  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);

  return (
    <Container style={{ margin: "5px" }}>
      <Card style={{ width: "17rem" }}>
        <Card.Img
          variant="top"
          src={prod.thumbnail}
          style={{ height: "200px" }}
        />
        <Card.Body>
          <Card.Title>{prod.title}</Card.Title>

          <Card.Text>Price : $ {prod.price}</Card.Text>
          <Card.Text>Delivery : {prod.weight} days</Card.Text>
          <Card.Text>{prod.stock > 40 ? "In Stock" : "Out of Stock"}</Card.Text>
          <Card.Text>Rating : {"⭐".repeat(prod.rating)}</Card.Text>
          <div>
            {cart.some((c) => c.id === prod.id) ? (
              <Button
                style={{ width: "100%" }}
                variant="danger"
                onClick={() => handleRemoveFromCart(prod)}
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                style={{ width: "100%", marginBottom: "5px" }}
                disabled={prod.stock < 40}
                onClick={() => handleAddToCart(prod)}
              >
                {prod.stock > 40 ? "Add to Cart" : "Out of Stock"}
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SingleProduct;
