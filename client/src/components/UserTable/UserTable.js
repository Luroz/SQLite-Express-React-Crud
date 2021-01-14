import React, {useState, useEffect} from "react";
import { Button, Modal, Row, Col, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, } from "reactstrap";
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

  const localhost = "http://localhost:5003"


  //state
  const [users, setUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  //FormState
  const [nameForm, setNameForm] = useState('')
  const [emailForm, setEmailForm] = useState('')
  const [ageForm, setAgeForm] = useState('')
  //Modal
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    fetchUserList();
  }, []);
  useEffect(()=> {
    setUsers(userList)
  }, [userList,users])

  //Methods
  const fetchUserList = () => {
    const fetchEndpoint = `${localhost}/api/users`;
    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
    axios.get(fetchEndpoint, options).then((res)=> {
      setUserList([...res.data.data])
    }).catch(err => console.log(err))
  };

  const createUser = (name, email, age) => {
    console.log(name, email, age)
    const createEndpoint = `${localhost}/api/user/`
    const options = {
      header: {
        'Access-Control-Allow-Origin': '*'
      },
      body: {
        "name": name,
        "email": email,
        "age": age
      }
    }
    axios.post(createEndpoint, options).then(() => {
      setModalCreate(!modalCreate)
      fetchUserList()
    }).catch(err => console.log(err))
  };

  const deleteUser = (email) => {
    const deleteEndpoint = `${localhost}/api/user/delete/?email=${email}`;
    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    };
    axios.delete(deleteEndpoint, options).then((res)=>{
      console.log(res.data)
      setModalDelete(!modalDelete)
      fetchUserList()
      console.log("The user has been deleted successfully")
    }).catch(err => console.log("An error has ocurred while deleting the user"))
  };

  const updateUser = (name, email, age) => {
    const updateEndpoint = `${localhost}/api/user/:email`
    const options = {
      header: {
        'Access-Control-Allow-Origin': '*'
      },
      body: {
        "name": name,
        "email": email,
        "age": age
      }
    }
    axios.patch(updateEndpoint, options).then((res) => {
      console.log(res)
      fetchUserList()
      setModalUpdate(!modalUpdate)
    }).catch(err => console.log(err))
  }

  const selectDelete = (email) => {
    setSelectedUser(email)
    setModalDelete(!modalDelete)
    
  }
  const selectUpdate = (row) => {
    setSelectedUser(row.email)
    setNameForm(row.name)
    setEmailForm(row.email)
    setAgeForm(row.age)
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
        <Button onClick={()=> selectUpdate(row)} color="info">
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

          <Row>
            <Col md={8} sm={12} className={'d-fex justify-content-center'} >
              <Form>
                <FormGroup>
                  <Label for="name">Name:</Label>
                  <Input value={nameForm} onChange={(e) => setNameForm(e.target.value)} type="text" name="name" id="name" placeholder="eg: Luis Pirela"/>
                </FormGroup>
              </Form>
            </Col>
            <Col md={4} sm={12} className={''} >
              <Form>
                <FormGroup>
                  <Label for="age">Age:</Label>
                  <Input value={ageForm} onChange={(e) => setAgeForm(e.target.value)} type="Number" name="age" id="age" placeholder="eg: 25"/>
                </FormGroup>
              </Form>
            </Col>
            <Col md={12} sm={12} className={''}> 
              <Form>
                <FormGroup>
                  <Label for="email">Email:</Label>
                  <Input value={emailForm} onChange={(e) => setEmailForm(e.target.value)} type="email" name="email" id="email" placeholder="eg: example@gmail.com"/>
                </FormGroup>
              </Form>
            </Col>
          </Row>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => createUser(nameForm, emailForm, ageForm)}>Create</Button>{' '}
          <Button color="secondary" onClick={() => setModalCreate(!modalCreate)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate} toggle={() => setModalUpdate(!modalUpdate)} >
        <ModalHeader toggle={() => setModalUpdate(!modalUpdate)}>Update user</ModalHeader>
        <ModalBody>
          
          <Row>
            <Col md={8} sm={12} className={'d-fex justify-content-center'} >
              <Form>
                <FormGroup>
                  <Label for="name">Name:</Label>
                  <Input value={nameForm} onChange={(e) => setNameForm(e.target.value)} type="text" name="name" id="name" placeholder="eg: Luis Pirela"/>
                </FormGroup>
              </Form>
            </Col>
            <Col md={4} sm={12} className={''} >
              <Form>
                <FormGroup>
                  <Label for="age">Age:</Label>
                  <Input value={ageForm} onChange={(e) => setAgeForm(e.target.value)} type="Number" name="age" id="age" placeholder="eg: 25"/>
                </FormGroup>
              </Form>
            </Col>
            <Col md={12} sm={12} className={''}> 
              <Form>
                <FormGroup>
                  <Label for="email">Email:</Label>
                  <Input value={emailForm} onChange={(e) => setEmailForm(e.target.value)} type="email" name="email" id="email" placeholder="eg: example@gmail.com"/>
                </FormGroup>
              </Form>
            </Col>
          </Row>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => updateUser(nameForm, emailForm, ageForm)}>Accept</Button>{' '}
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
