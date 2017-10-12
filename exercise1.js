// Write JavaScript here and press Ctrl+Enter to execute

class Button extends React.Component { 
    
    handleClick = () => {
        this.props.onClickFunc( this.props.incrementValue )
    }

    render() {
        return (
        <button onClick={this.handleClick}>
            +{this.props.incrementValue}
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
    
    incrementCounter = (incrementValue) => {
        this.setState((prevState) => ({
        counter : prevState.counter + incrementValue
    }));
    }
    
    render() {
        return (
        <div>
            <Button incrementValue={1} onClickFunc={this.incrementCounter}/>
            <Button incrementValue={5} onClickFunc={this.incrementCounter}/>
            <Button incrementValue={10} onClickFunc={this.incrementCounter}/>
            <Button incrementValue={100} onClickFunc={this.incrementCounter}/>
        <Result label={this.state.counter} />
        </div>
    );
    }
}

ReactDOM.render(<App/>, mountNode);