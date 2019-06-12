import React, { Component } from 'react';
import EventList from './EventList'
import Header from './Header'
//import Test from './test'



class App extends Component {
    // let eventsData = eventsData.map(events => <Events key={events.id} 
    // let eventsData = eventsData.map(events => <Events key={events.id} 
    //   name={events.name} description={events.description} />)

  render() {

    return (
      <div className="App">
      <Header />
      <section>
      <EventList  />
      {/* <Test /> */}
      </section>
      </div>
    );
  }
}

export default App;
