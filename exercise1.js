// Using https://jscomplete.com/repl/ to run this exercise.

// Write JavaScript here and press Ctrl+Enter to execute

class Button extends React.Component { 
	render() {
  	return (
    	<button onClick={this.props.onClickFunc}>
      	+1
      </button>
    );
  }
}

const Result = (props) => {
	return (
    	<div>{props.label}</div>
  );
}

class App extends React.Component {
	state = { counter: 0};
  
  incrementCounter = () => {
  	this.setState((prevState) => ({
    	counter : prevState.counter + 1
    }));
  }
  
	render() {
  	return (
    	<div>
      	<Button onClickFunc={this.incrementCounter}/>
        <Result label={this.state.counter} />
      </div>
    );
  }
}

ReactDOM.render(<App/>, mountNode);