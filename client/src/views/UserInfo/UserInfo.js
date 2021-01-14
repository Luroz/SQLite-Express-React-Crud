import React from "react";
import { Button, Row, Col } from "reactstrap";
import UserTable from "../../components/UserTable/UserTable";
import "./style.css";

const UserInfo = () => {
  return (
    <div className="mt-5">
      <Row>
        <Col className="mb-3 text-right">
          <Button color="info">Agregar Usuario</Button>
        </Col>
        <Col xs={12}>
          <UserTable />
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
