let data;

const Card = (props) => {
    return (
        <div id="{props.name}">
            <img width="75" className="avatar" src={props.avatar_url} />
            <div className="info" >
                <div className="name">{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};


const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card {...card} />)}
        </div>
    );
};

class Form extends React.Component {
  
    state = { userName : ''};

    handleSubmit = (event) => {
        event.preventDefault();
        
        axios.get(`https://api.github.com/users/${this.state.userName}`)
        .then(resp => {
            //console.log(resp);
            this.props.onSubmit(resp.data);
        })
      
    }; 
    
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        //ref={(input) => this.userNameInput = input }
                        value={this.state.userName}
                        onChange={(event) => this.setState({userName: event.target.value})}
                        placeholder="Github username" 
                        required
                    />
                    <button type="submit">Add user</button>
                </form>
            </div>
        );
    }
};

class App extends React.Component{
    state = {
        cards: []
    };

    addNewCard = (cardInfo) => {
        console.log(cardInfo);
        this.setState( prevState => ({
            cards: prevState.cards.concat(cardInfo)
        }));
    };
  
    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard}/>
                <CardList cards={this.state.cards}/>
            </div>
        );
    };
};

ReactDOM.render(<App/>, mountNode);