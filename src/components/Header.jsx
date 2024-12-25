import {
  Navbar,
  Container,
  Form,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/Context";
import { FaTrashAlt } from "react-icons/fa";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = useCartContext();

  function handleDeleteItem(currProd) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: currProd,
    });
  }

  return (
    <div style={{ position: "fixed", zIndex: 2, width: "100%" }}>
      <Navbar variant="dark" bg="dark" className="py-3">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-white text-decoration-none">
              Shopping Cart
            </Link>
          </Navbar.Brand>

          <Form>
            <Form.Control
              placeholder="Search"
              onChange={(e) =>
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                })
              }
            ></Form.Control>
          </Form>

          <Dropdown drop="start" className="me-5" autoClose={"outside"}>
            <Dropdown.Toggle>
              <FaCartShopping className="text-light" size={"20px"} />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {cart.length === 0 ? (
                <Dropdown.Item>Cart is Empty !</Dropdown.Item>
              ) : (
                <>
                  {cart.map((c) => (
                    <Dropdown.Item key={c.id}>
                      <div className="cart">
                        <img src={c.thumbnail} alt="" />
                        <div>
                          <h6>{c.title}</h6>
                          <p>${c.price}</p>
                        </div>

                        <FaTrashAlt
                          color="red"
                          onClick={() => handleDeleteItem(c)}
                        />
                      </div>
                    </Dropdown.Item>
                  ))}
                </>
              )}
              <Link to="/cart" style={{ display: "flex" }}>
                <Button
                  variant="info"
                  style={{
                    fontWeight: "500",
                    width: "90%",
                    margin: "0 auto",
                  }}
                >
                  Go to Cart
                </Button>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
