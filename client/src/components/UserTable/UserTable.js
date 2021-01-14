import React, {useState, useEffect} from "react";
import { Button, Row, Col } from "reactstrap";
import axios from "axios";
//tableConfig
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
} from "react-bootstrap-table2-paginator";


import Icon from "../Icon/Icon";

const UserTable = () => {

  useEffect(() => {
    fetchUsers()
  }, [])

  //state
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    axios.get("http://localhost:4000/api/users",{
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then((res)=> {
      console.log(res)
      const list = res.data.data
      setUsers(...list)
    })
  };

  console.log(users)

  const userList = [
    {
      name: "Andrea",
      email: "andrea@gmail.com",
      age: "26",
    },
    {
      name: "Romario",
      email: "romario@gmail.com",
      age: "26",
    },
    {
      name: "Romario",
      email: "romrio@gmail.com",
      age: "26",
    },
    {
      name: "Romario",
      email: "roario@gmail.com",
      age: "26",
    },
    {
      name: "Romario",
      email: "rorio@gmail.com",
      age: "26",
    },
    {
      name: "Romario",
      email: "romao@gmail.com",
      age: "26",
    },
    {
      name: "Romario",
      email: "romari88o@gmail.com",
      age: "26",
    },
    {
      name: "Romario",
      email: "roma3rio@gmail.com",
      age: "26",
    },
    {
      name: "Romario",
      email: "rom4ario@gmail.com",
      age: "26",
    },
  ];

  const columns = [
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "age",
      text: "Age",
    },
    {
      dataField: "actions",
      text: "Actions",
      isDummyField: true,
      formatter: ActionButtons,
    },
  ];

  const options = {
    custom: true,
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: "1",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    totalSize: userList.length,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
    ],
  };
  return (
    <PaginationProvider pagination={paginationFactory(options)}>
      {({ paginationProps, paginationTableProps }) => (
        <ToolkitProvider keyField="email" data={userList} columns={columns} search>
          {(toolkitprops) => (
            <div>
              <div className="d-flex justify-content-between">
                <PaginationTotalStandalone {...paginationProps} />
                <SearchBar {...toolkitprops.searchProps} />
              </div>

              <BootstrapTable
                {...toolkitprops.baseProps}
                {...paginationTableProps}
              />
              <div className="d-flex d-flex justify-content-end">
                <PaginationListStandalone {...paginationProps} />
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  );
};

const { SearchBar } = Search;
const ActionButtons = (cell, row) => {

  return (
    <div className="d-flex  justify-content-around">
      <Button color="danger">
        <Icon name="delete" size="20" />
      </Button>
      <Button color="info">
        <Icon name="edit" />
      </Button>
    </div>
  );
};

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing {from} to {to} of {size} Results
  </span>
);

export default UserTable;
