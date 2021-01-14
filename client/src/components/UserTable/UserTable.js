import React, {useState, useEffect} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { toast } from 'react-toast'
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

  const localhost = "http://localhost:4000"

  //state
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    fetchUserList();
  }, []);

  console.log(selectedUser)

  //Methods
  const fetchUserList = () => {
    const fetchLink = `${localhost}/api/users`;
    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
    axios.get(fetchLink , options).then((res)=> {
      setUsers([...res.data.data])
    });
  };

  const deleteUser = (email) => {
    const deleteLink = `${localhost}/api/user/delete/?email=${email}`;
    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    };
    axios.delete(deleteLink, options).then((res)=>{
      console.log(res.data)
      setModalDelete(!modalDelete)
      setUsers()
    }).catch((err)=> {
      toast.error(err)
    })
  };

  const selectDelete = (email) => {
    setSelectedUser(email)
    setModalDelete(!modalDelete)
    
  }
  const selectUpdate = (email) => {
    setSelectedUser(email)
    setModalUpdate(!modalUpdate)
    
  }

  //TableSetup
  const ActionButtons = (col, row) => {
    console.log(row)
    return (
      <div className="d-flex  justify-content-around">
        <Button onClick={() => selectDelete(row.email)} color="danger">
          <Icon name="delete" size="20" />
        </Button>
        <Button onClick={()=> selectUpdate(row.email)} color="info">
          <Icon name="edit" />
        </Button>
      </div>
    );
  };

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
    totalSize: users.length,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
    ],
  };
  const { SearchBar } = Search;

  return (
    <React.Fragment>
      <PaginationProvider pagination={paginationFactory(options)}>
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider keyField="email" data={users} columns={columns} search>
            {(toolkitprops) => (
              <div>
                <div className={'d-flex justify-content-end mb-2'}>
                  <Button onClick={() => setModalCreate(!modalCreate)} color="info">Add user</Button>
                </div>
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
      <Modal isOpen={modalCreate} toggle={() => setModalCreate(!modalCreate) }>
        <ModalHeader toggle={() => setModalCreate(!modalCreate)}>Create new user</ModalHeader>
        <ModalBody>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModalCreate(!modalCreate)}>Su</Button>{' '}
          <Button color="secondary" onClick={() => setModalCreate(!modalCreate)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate} toggle={() => setModalUpdate(!modalUpdate)} >
        <ModalHeader toggle={() => setModalUpdate(!modalUpdate)}>Modal title</ModalHeader>
        <ModalBody>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModalUpdate(!modalUpdate)}>Do Something</Button>{' '}
          <Button color="secondary" onClick={() => setModalUpdate(!modalUpdate)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete} toggle={() => setModalDelete(!modalDelete)} >
        <ModalHeader toggle={() => setModalDelete(!modalDelete)}>Delete user</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this user?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => deleteUser(selectedUser) }>Delete</Button>{' '}
          <Button color="secondary" onClick={() => setModalDelete(!modalDelete)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};



export default UserTable;
