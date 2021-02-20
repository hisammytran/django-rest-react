import React, { Component } from "react";
import { render } from "react-dom";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootStrap/Modal'
import FormControl from 'react-bootstrap/FormControl'
import 'bootstrap/dist/css/bootstrap.min.css';
class Popup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleShow() {
    this.setState({
      show: true
    })
  }
  handleClose() {
    this.setState({
      show: false
    })
    this.forceUpdate()
  }
  render() {
    var toShow = this.props.task
    return (
      <div>
        <Button onClick={this.handleShow}>View Details for {toShow.name}</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{toShow.name}</Modal.Title>

          </Modal.Header>
          <Modal.Body>this is a level {toShow.priority} priority task
            {toShow.summary}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
      </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
      </Button>
          </Modal.Footer>
        </Modal>
      </div>

    )
  }
}
class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {

    var list = this.props.todo

    return (
      <Row>
        <Col>
          <Card bg={'primary'} text={'white'}>
            <Card.Header text={'white'}>Todo</Card.Header>

            <ListGroup variant="flush">
              {list.map(function (task) {
                if (task.priority == 'T') {
                  return (
                    <ListGroup.Item key={task.id}>
                      <Popup task={task}></Popup>

                      {/* <Button className="pull-right">Edit</Button> */}
                    </ListGroup.Item>
                  );
                }
              })}
            </ListGroup>
          </Card>
        </Col>
        <Col>
          <Card bg={'secondary'} text={'white'}>
            <Card.Header>Due</Card.Header>

            <ListGroup variant="flush">
              {list.map(function (task) {
                if (task.priority == 'D') {
                  return (
                    <ListGroup.Item key={task.id}>
                      <Popup task={task}>{task.name}</Popup>

                      {/* <Button className="ml-auto">Edit</Button> */}
                    </ListGroup.Item>
                  );
                }
              })}
            </ListGroup>
          </Card>
        </Col>
        <Col>
          <Card bg={'success'} text={'white'}>
            <Card.Header>Completed</Card.Header>

            <ListGroup variant="flush">
              {list.map(function (task) {
                if (task.priority == 'C') {
                  return (
                    <ListGroup.Item key={task.id}>
                      <Popup task={task}></Popup>

                      {/* <Button className="pull-right">Edit</Button> */}
                    </ListGroup.Item>
                  );
                }
              })}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    )
  }

}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      data: [],
      activeItem: {
        id: null,
        name: '',
        summary: '',
        priority: 'T',
      },
      editing: false,
      loaded: false,
      placeholder: "Loading"
    }
    // handles api task fetching and creating
    this.fetchTasks = this.fetchTasks.bind(this)
    this.createTask = this.createTask.bind(this)
    // handle form controls
    this.handleName = this.handleName.bind(this)
    this.handleSum = this.handleSum.bind(this)
    this.handlePri = this.handlePri.bind(this)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    

  }

  componentDidMount() {
    this.fetchTasks()
  }
  handleName(e) {
    var name = e.target.name
    var value = e.target.value
    console.log(name,value)
    this.setState({
      activeItem:{
        ...this.state.activeItem,
        name: value
      }
    })
  }
  handleSum(e){
    var value = e.target.value
    this.setState({
      activeItem:{
        ...this.state.activeItem,
        summary: value
      }
    })
  }
  handlePri(e){
    var value = e.target.value
    value = value[0]
    console.log(e.target.value[0])
    this.setState({
      activeItem:{
        ...this.state.activeItem,
        priority: value
      }
    })
  }
  handleShow() {
    this.setState({
      modalShow: true
    })
    // alert(this.state.modalShow)
    // alert('hi')
  }
  handleClose() {
    this.setState({
      modalShow: false
    })
    this.fetchTasks()
    this.forceUpdate()
  }
  fetchTasks() {
    console.log('fetching...')
    fetch('api/task-list/')
      .then(response => response.json())
      .then(data =>
        this.setState({
          data: data
        }))
      .catch(error=>console.log(error))
  }
  createTask(){
    // if(this.state.activeItem.priority==''){
    //   this.setState({
    //     activeItem:{
    //       ...this.state.activeItem,
    //       priority: 'T'
    //     }
    //   })
    // }
    console.log('creating task...')
    fetch('api/task-create/', {
      method: 'POST',
      body: JSON.stringify({ 
        name: this.state.activeItem.name, 
        summary: this.state.activeItem.summary, 
        priority: this.state.activeItem.priority
    }),
      headers:{
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error=>console.log(error))
    this.setState({
      activeItem:{
        priority:'T'
      }
    })

    this.handleClose()
  }

  render() {
    var tasks = this.state.data

    return (

      <Container fluid>

        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="api">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Button onClick={this.handleShow}>Add Task </Button>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <Modal show={this.state.modalShow} onHide={this.handleClose} centered backdrop='static'>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>

          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Task Name</Form.Label>
                <Form.Control as="textarea" rows={1} onChange={this.handleName}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Task Summary</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={this.handleSum}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Task Priority</Form.Label>
                <Form.Control as="select" onChange={this.handlePri}>
                  <option>Todo</option>
                  <option>Due</option>
                  <option>Complete</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
      </Button>
      {/* change onclick to create a task  */}
            <Button variant="primary" onClick={this.createTask}>
              Create Task
      </Button>
          </Modal.Footer>
        </Modal>
        <Board key ={this.state.data} todo={this.state.data}></Board>

      </Container>

    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);