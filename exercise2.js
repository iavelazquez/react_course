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

let data = [
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

const CardList = (props) => {
	return (
  	<div>
    	{props.cards.map(card => <Card {...card} />)}
  	</div>
  );
};

ReactDOM.render(<CardList cards={data}/>, mountNode);