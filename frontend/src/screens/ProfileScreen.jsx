import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Row, Col, Form, Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../components/Messager";
import Loader from "../components/Loader";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" value={name} readOnly></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} readOnly></Form.Control>
          </Form.Group>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Order</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {" "}
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
export default ProfileScreen;
