import {
  Button,
  Card,
  Dropdown,
  DropdownButton,
  Form,
  ListGroup,
} from "react-bootstrap";
import { useCartContext } from "../contexts/Context";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const [total, setTotal] = useState(0);

  const {
    state: { cart },
    dispatch,
  } = useCartContext();

  // function handleQty(eventKey) {
  //   console.log(eventKey);
  //   setValue(eventKey);
  // }

  function handleDeleteItem(currProd) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: currProd,
    });
  }

  function handleTotal() {
    const price = cart.reduce((acc, curr) => (acc += curr.qty * curr.price), 0);
    setTotal(price.toFixed(2));
  }

  useEffect(() => {
    // console.log(cart);
    handleTotal();
  }, [cart]);

  return (
    <div
      style={{
        // paddingTop: "200px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "70%" }}>
        <ListGroup
          style={{
            flex: 1,
            paddingTop: "100px",
            marginLeft: "30px",
            // width: "100%",
          }}
        >
          {cart.map((c, i) => (
            <ListGroup.Item
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginRight: "10px",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <img src={c.thumbnail} alt="" width={"150px"} />
              <div style={{ width: "400px" }}>
                <h6>{c.title}</h6>
                <p>${c.price}</p>
              </div>
              <p>{"⭐".repeat(c.rating)}</p>

              <Dropdown
                onSelect={(eventKey) =>
                  dispatch({
                    type: "CHANGE_CART_QTY",
                    payload: {
                      id: c.id,
                      qty: eventKey,
                    },
                  })
                }
              >
                <Dropdown.Toggle variant="info">{c.qty}</Dropdown.Toggle>

                <Dropdown.Menu>
                  {[...Array(5)].map((_, i) => (
                    <Dropdown.Item key={i} eventKey={i + 1}>
                      {i + 1}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <FaTrashAlt
                color="red"
                style={{ width: "1.5rem", height: "1.5rem" }}
                onClick={() => handleDeleteItem(c)}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div
        style={{ height: "100vh", width: "30%", position: "fixed", right: 0 }}
        className="bg-dark"
      >
        <div
          style={{
            marginTop: "200px",
            marginLeft: "20px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h3>Subtotal ({cart.length}) items</h3>
          <h5>Total : ${total}</h5>
          <Button style={{ width: "200px" }}>Proceed to Payment</Button>

          <Link to="/">
            <Button variant="secondary" style={{ width: "200px" }}>
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
