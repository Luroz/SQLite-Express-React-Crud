import React from "react";
import { Row, Col } from "reactstrap";
import UserTable from "../../components/UserTable/UserTable";
import "./style.css";

const UserInfo = () => {
  return (
    <div className="mt-5">
      <Row>
        <Col xs={12}>
          <UserTable />
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
