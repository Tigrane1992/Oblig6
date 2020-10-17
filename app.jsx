import React, { Component } from 'react'; 
import {  Button,
          Container,
          ButtonGroup,
          Card,
          CardDeck,
          ListGroup,
          FormControl,
          InputGroup,
          Row,
          Modal,
        } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// Import Components
import Navbar from "./src/components/navbar"
  
class App extends Component  { 
  constructor(props) { 
    super(props); 
    
    // Retriev saved List from LocalStorage
    var list = JSON.parse(localStorage.getItem('list'));
    
    // Setting up state
    this.state = { 
      title : "", 
      content : "",
      author : "",
      list:list?[...list]:[],
      search: "",
      modalState: false
    } 
  }

  // Modal
  openModal(){
    this.setState({ modalState: true })
  }
  closeModal(){
    this.setState({ modalState: false });
  }
  closeModalAndSave(){
    this.addItem()
    this.closeModal()
  }
  
  updateSearch(search){
    this.setState({search});
  }

  // Set a user input value 
  updateTitle(title){ 
    this.setState({title});
  } 
  updateContent(content){ 
      this.setState({ content});
  } 
  updateAuthor(author){ 
      this.setState({author}); 
  }

  //UserInput validator
  isValidInput(){
    return this.state.author && this.state.content && this.state.title;
  }

  // SaveToStorage
  saveToStorage(){
    localStorage.setItem('list', JSON.stringify(this.state.list));
  }

  // Add item if user input in not empty 
  addItem(){ 
    if(this.isValidInput()){ 
      // reset state, save list with new item 
      this.setState({
        // Append to list
        list: [...this.state.list,
          { 
            // Add a random id which is used to delete 
            id :  Math.random(), 
      
            // Add a user value to list 
            title : this.state.title,
            content : this.state.content,
            author : this.state.author,
    
            // Default values
            date: new Date(),
            completed: false,
            
          }
        ], 
        title:"",
        content:"",
        author:""
      },
      this.saveToStorage);
    }
  } 

  // Function to delete item from list use id to delete 
  deleteItem(key){   
    // Filter & Update list in state 
    this.setState(
      {list:this.state.list.filter(item => item.id !== key)},
      this.saveToStorage);
  } 

  completeItem(key){  
    // Map all values and find the searched for and return the list with the modified item & save
    this.setState(
      { list: this.state.list.map(item => item.id !== key ? item : {...item, completed: true, completedDate: new Date()})},
      this.saveToStorage);
  }

  uncompleteItem(key){
    // Map all values and find the searched for and return the list with the modified item & save
    this.setState({
      list:this.state.list.map(item => { return item.id !== key ? item : {...item, completed: false}}),
    },this.saveToStorage);
    
  }

  render(){ 
    return(
      <>
        <Navbar/>
        <Container>
          <Modal show={this.state.modalState} onHide={() => this.closeModal()}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className="mb-5"> 
                <FormControl 
                  placeholder="Title"
                  size="lg"
                  value = {this.state.title}
                  onChange = {item => this.updateTitle(item.target.value)} 
                  aria-label="add something"
                  aria-describedby="basic-addon2"
                />
                <FormControl 
                  placeholder="Content "
                  size="lg"
                  maxLength="50"
                  value = {this.state.content}
                  onChange = {item => this.updateContent(item.target.value)} 
                  aria-label="add something"
                  aria-describedby="basic-addon2"
                />
                <FormControl 
                  placeholder="Author"
                  size="lg"
                  value = {this.state.author}
                  onChange = {item => this.updateAuthor(item.target.value)} 
                  aria-label="add something"
                  aria-describedby="basic-addon2"
                />
              </InputGroup> 
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="dark"
                size="lg"
                onClick = {()=>this.closeModalAndSave()} > 
                ADD 
              </Button>
            </Modal.Footer>
          </Modal>
          <Button variant="primary" className="mb-5 mt-5" onClick={() => this.openModal()}>
            <FontAwesomeIcon icon={faPlus} /> Todo
          </Button> 
          <CardDeck>
            {/* map over and print items */} 
            {this.state.list.filter(item=> item.completed !== true).map( item => { return( 
              <Row key={item.id}>
                <Card style={{ align:"center",backgroundColor: "lightgray",right:"50px",left:"50px"}}>
                  <Card.Body> 
                    <Card.Title variant="dark">{item.title}</Card.Title> 
                    <Card.Text variant="dark">{item.content}</Card.Text> 
                    <Card.Subtitle variant="dark">Created by {item.author}</Card.Subtitle> 
                    <ButtonGroup>
                      <Button size="sm" variant="danger" onClick = { () => this.deleteItem(item.id) }>Delete</Button>
                      <Button size="sm" variant="success" onClick = { () => this.completeItem(item.id) }>Complete</Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card> 
              </Row>
            )})}
          </CardDeck>
          {this.state.list.filter(item=> item.completed !== true).length === 0 ? (<div>List is empty</div>):(<></>)} 

          <h3 className="mt-5 mb-3">Completed Todos</h3>
          <ListGroup  style={{ align:"center",backgroundColor: "lightgray",}}> 
            <InputGroup className="mb-2"> 
              <FormControl 
                placeholder="Search"
                size="lg"
                value = {this.state.value}
                onChange = {search => this.updateSearch(search.target.value)} 
                aria-label="Search something..."
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <Row>
              {/* map over and print items */} 
              {this.state.list.filter(item => (item.title.includes(this.state.search) || item.author.includes(this.state.search)) && item.completed === true).sort((a,b) => {return new Date(a.date) - new Date(b.date)}).map(item => { return(            
                <ListGroup horizontal className="mb-2" style={{ width: "100%" }}  key={item.id}> 
                  <ListGroup.Item className="ml-4" variant="dark">{item.title}</ListGroup.Item> 
                  <ListGroup.Item className="ml-1" variant="dark">{item.content}</ListGroup.Item>
                  <ListGroup.Item className="ml-1" variant="dark">{item.author}</ListGroup.Item>
                  <ListGroup.Item className="ml-1" variant="dark">{item.completedDate ? (new Date(item.completedDate)).toDateString() : ""}</ListGroup.Item>

                  <ButtonGroup>
                    <Button onClick = { () => this.deleteItem(item.id) }  variant="danger">Delete</Button>
                    <Button onClick = { () => this.uncompleteItem(item.id) } variant="primary">Undo</Button>
                  </ButtonGroup>
                </ListGroup>
              )})} 
            </Row>
          </ListGroup>
        </Container>
      </>
    ); 
  } 
}

export default App; 
