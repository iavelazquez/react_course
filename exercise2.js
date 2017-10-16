const Card = (props) => {
	return (
     	<div>
       	<img width="75" className="avatar" src={props.avatar_url} />
         <div className="info" >
         	<div className="name">{props.name}</div>
         	<div>{props.company}</div>
         </div>
      </div>
   );
};

let data;

const CardList = (props) => {
	return (
        <div>
            {props.cards.map(card => <Card {...card} />)}
        </div>
  );
};

class Form extends React.Component {
  
  	handleSubmit = (event) => {
    	event.preventDefault();
        console.log('Test...' + this.userNameInput.value);
    }; 
  	
	render(){
  	return (
  		<div>
    		<form onSubmit={this.handleSubmit}>
      		    <input 
          	        type="text" 
                    ref={(input) => this.userNameInput = input }
                    placeholder="Github username" 
                    required
                />
        	    <button type="submit">Add user</button>
    		</form>
  		</div>
    );
  }
}

class App extends React.Component{
	state = {
  	    cards: [
            {
                name:"Arath V",
                avatar_url:"https://avatars0.githubusercontent.com/u/1779212?v=4",
                company:"iTexico"
            },
            {
                name:"Mike",
                avatar_url:"https://avatars0.githubusercontent.com/u/1779212?v=4",
                company:"Hitss"
            }
	    ]
    } 

	render() {
  	return (
    	<div>
    		<Form />
      	    <CardList cards={this.state.cards}/>
  		</div>
    );
  };
};

ReactDOM.render(<App/>, mountNode);