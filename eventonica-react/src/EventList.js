import React, {Component} from 'react';
import "./BayEvents.css"




class EventList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //this is where I will store added events to my database
            events: [],
            oneEvent: {},
            //isLoading: false//loading state should be used to indicated that an asynchronous request is happening
            name: " ",
            location: " ",
            description: " ",

            isloading:false,

           
        }

    //    this.handleUpdate = this.addEvent.bind(this);
        // this.deleteHandler = this.deleteHandler.bind(this)
        this.editHandler = this.editHandler.bind(this)
        this.addEvent = this.addEvent.bind(this)
        this.addHandler = this.addHandler.bind(this)
        // this.renderForm = this.renderForm.bind(this)
        // this.renderDisplay = this.renderDisplay.bind(this)
        this.deleteEvent = this.deleteEvent.bind(this)
    }

    componentDidMount() {
        this.setState({isloading: true})
        fetch('/events')
        .then(res => res.json())
        .then(events => this.setState({events, loading: false}, () => console.log('is it working?', 
        events)
        )
    )

    }


    addHandler = (e) => {
        this.setState({ events: [...e.target.value, ]})
        console.log('something was added?')
    }

//post events but how to get from to post it for you?
addEvent = () => {
    const data = {name: document.getElementById('1').value, description: document.getElementById('2').value, location: document.getElementById('3').value}
    // {name: this.state.name, description: this.state.name, location: this.state.location  }
    fetch('/events', {
        method: 'POST', //add events
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(res => res.json())
    .then(newEvent => this.setState({ events: [...this.state.events, newEvent]}))
}


    //PUT -  editing an event
    editHandler(e) {
        // const data = name: this.state.name, description: this.state.description, location: this.state.location  
        alert('editing  an event')
        fetch('/events')
        .then(res => res.json())
        this.setState({
            e, editing: true
        })
    }

    // //delete -  deleting an event
    // deleteHandler() {
    //     alert('removing an event')
    //     this.deleteEvent(this.event.name)
        
    // }

    //DELETE HTTP REQUEST
    deleteEvent(e) {
        let removeEvent = Number(e.target.value);
        //console.log(e.target.value);
        alert('removing an event')
        fetch('/events/' + e.target.value, {
            method: 'DELETE'
        }).then( () => {
            //console.log("hello")
            // let newState = this.state.events;
            // newState.filter(event => event.id !== removeEvent)
            let newState = this.state.events.filter(event =>{
                //console.log(event, removeEvent, event.id === removeEvent, typeof event.id)
                return event.id !== removeEvent
              }) 
            //console.log(newState, removeEvent)
            this.setState ({events: newState})
            
           // console.log(this.state); 
        })    
    }
 




   

   
//Where file will render once it loads
//https://reactjsexample.com/card-grid-with-react-js/
    render(){
        const { events } = this.props

        const buttonStyle = {
            color: 'whitesmoke',
            background: 'DeepSkyBlue'
     };

    return(
    <div>
        <section className="card">
        {this.state.events.map((event) => {
            return (
                <div key={event.id}>
                
                <h2>{event.name}</h2>
                <img src= {'https://placebear.com/200/200'} alt="placeholder image"></img>
            
                <p>{event.description}</p>  
                <p className="location">Location: {event.location}</p> 
                <button onClick = {this.editHandler}>Edit me!</button>
                <button value={event.id} id="hover" style={buttonStyle} onClick={this.deleteEvent}>Remove me!</button>
                <br/>
                <hr/>
                </div>
                    )
                })}
        
        </section>
        <form> 
            <br/>
            Event: 
            <input 
                type="text"
                name ="event"
                id = '1'
                
                />
            
            Description: 
                <input 
                type="text"
                name ="description"
                id = '2'
               
            />

            Location: 
            <input 
                type="text" 
                name="location"
                id = '3'
                
            />
        </form>
            <button onClick = {this.addEvent} id="add">Add me!</button>
            <button onClick = {this.editHandler} id="edit">Edit me!</button>
            <button onClick = {this.deleteHandler} id="delete">Remove me!</button>
             <form > 
            <br/>
            Event: 
            <input onChange={this.addHandler}
                type="text"
                name ="event"
                value={this.state.name}
                
                />
            
            Description: 
                <input onChange={this.addHandler}
                type="text"
                name ="description"
                value={this.state.description}
               
            />

            Location: 
            <input onChange={this.addHandler}
                type="text" 
                name="location"
                value={this.state.location}
                
            />

            <button onClick = {this.addEvent} id="add">Add new Event!</button>
          
        </form>
      </div>
    );
    }

    // render(){
    
    //     if(this.state.editing){
    //         return this.renderForm()
    //     } else {
    //         return this.renderdisplay()
    //     }
    // }
}






export default EventList


