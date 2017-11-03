/*
.mountNode {
  color: #333;
}

.avaftar {
	width: 75px;
}

.info {
	display: inline-block;
    margin-left: 10px;
}
.name {
	fontsize: 1.25em;
    font-weight: bold;
}

.fa-star {
	margin: 0.5em;
    font-size: 24px;
}

span {
	display: inline-block;
    margin: 0.5em;
	text-align: center;
    background-color: #ccc;
    width: 24px;
    border-radius: 50%;
    cursor: pointer;
}

.selected {
	background-color: #eee;
    color: #ddd;
}

.used {
	background-color: #aaddaa;
    color: #99bb99;
    cursor: not-allowed;
}
*/

const Stars = (props) => {

	// Get the numberOfStars as props and map all the values to add the icons.
	return (
  	<div className="col-5">
    	{_.range(props.numberOfStars).map(i =>
      	<i key={i} className="fa fa-star"></i>
      )}
  	</div>
  );
} 

const Button = (props) => {

	let button;
  
  switch(props.answerIsCorrect){
  	case true:
    	button = 
        <button className="btn btn-success" onClick={props.acceptAnswer}>
          <i className="fa fa-check"></i>
        </button>;
    	break;
    case false:
    	button = 
        <button className="btn btn-danger">
          <i className="fa fa-times"></i>
        </button>;
    	break;
    default:
    	button = 
        <button 
        	className="btn" 
          onClick={props.checkAnswer}
        	disabled={props.selectedNumbers.length === 0}>
          =
        </button>;
    	break;
  
  };
  
	return (
  	<div className="col-2">
    	{button}
  	</div>
  );
}

const Answer = (props) => {

	// Receive the array of selectedNumbers and create spans with values.
  // Each span has an "onClick" which unselect the number.
  // Notice this use an arrow function to be called.
	return (
  	<div className="col-5">
    	{props.selectedNumbers.map((number, i) => 
      	<span key={i} onClick={() => props.unSelectNumber(number) } >{number}</span>
      )}
  	</div>
  );
}

// List for 10 numbers using lodash.
Number.list = _.range(1,10)

const Numbers = (props) => {

	// Arrow function to return a 'selected' string 
  // to be added as class.
  // If the number in the map exists in prop.selectedNumbers
  // return 'selected'
  
	const numberClassName = (number) => {
  	if (props.usedNumbers.indexOf(number) >=0) {
    	return 'used'
    }
    if (props.selectedNumbers.indexOf(number) >=0) {
    	return 'selected';
    }
  }
  
	// Inline functions with arrow functions.
  // 
	return (
  	<div className="card text-center">
    	<div>
        {/* 
        	Create numbers from Number.list.
          In className for every span, a function is executed and add 'selected' if the
          number is already in array of selectedNumbers.
          
          When onClick, receives the props and function called "selectNumber".
        */}	
      	{Number.list.map((number, i) =>
        	<span key={i} 
          			className={numberClassName(number)}
                onClick={() => props.selectNumber(number)}>
          	{number}
          </span>
        )}    	
    	</div>
    </div>
  );
}


class Game extends React.Component {
	
  // Set states.
	state = {
  	selectedNumbers : [], // Array for selected numbers.
    usedNumbers : [],
    randomNumberOfStars : 1 + Math.floor(Math.random()*9), // Random number for stars.
    answerIsCorrect : null,
    
  }
  
  selectNumber = (clickedNumber) => {
  	// If number is included in selectedNumbers array, 
    // then prevent default by returning nothing.
  	if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {return;}
  	// Adding new element to array of selectedNumbers.
    this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };
  
  // Unselect number from answers.
  unSelectNumber = (clickedNumber) => {
    this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers
      													.filter(number => number !== clickedNumber)
    }));
  };
  
  checkAnswer = () => {
  	// If randomOfStars is equal to sum of all selectedNumbers, then 'true'
    
    console.log(this.state.selectedNumbers.reduce( (sum, value) => sum + value, 0 ));
    this.setState(prevState => ({
    	answerIsCorrect : prevState.randomNumberOfStars === 
      									prevState.selectedNumbers.reduce( (sum, value) => sum + value, 0 )
    }));
  };

	acceptAnswer = () => {
  	this.setState(prevState => ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars: 1 + Math.floor(Math.random()*9)
    }));
  };
  
	render(){
  
  	const { 
    	selectedNumbers, 
      randomNumberOfStars, 
      answerIsCorrect,
      usedNumbers
    } = this.state; 
  	return (
    	<div className="container">
      	<h3>Play Nine</h3>
        <hr/>
        <div className="row">
        	<Stars numberOfStars={randomNumberOfStars}/>
        	<Button selectedNumbers={selectedNumbers} 
          				checkAnswer={this.checkAnswer}
                  answerIsCorrect={answerIsCorrect}
                  acceptAnswer={this.acceptAnswer}
                  />
          <Answer selectedNumbers={selectedNumbers} 
          				unSelectNumber={this.unSelectNumber}
                  />
        </div>
        <br/>
        <Numbers selectedNumbers={selectedNumbers} 
        				 selectNumber={this.selectNumber}
                 usedNumbers={usedNumbers}/>
    	</div>
      
    );
  }
}

class App extends React.Component {
	render() {
  	return (
    	<div>
    		<Game />
    	</div>
    ); 
  }
}

ReactDOM.render(<App />, mountNode);