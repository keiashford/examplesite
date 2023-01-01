function displayHome(props){
    return(
<div  key={props.id}>
    <h2>image src {props.image}</h2>
   <h1>Beds:{props.beds}</h1><img src={props.image}></img>
   
   </div>)
}

export default displayHome;