import { useState } from "react";
import axios from 'axios';
import { setConstantValue } from "typescript";



function DisplayHome(props){
   
   const[editable,changedEditable] =useState(false);
   const[visible,changedVisible] =useState(true);
   const[inputs,setInputs]=useState(props);
   if (visible==false)
   {return (null)}
    return(
<div  key={props.id}>
    <div className='proportionedImageContainer'>
    <img  className='proportionedImage'src={props.image}></img>
    </div>

    <div className="homeDisplayFlex"><div className="boldText">Title:</div><div className="boldText">{inputs.title}</div></div>
    {
     editable==true && 
    <input  name="title" type="text"  onChange={changeStringValue}/>
    }

   <div className="homeDisplayFlex"><div className="boldText">Price:</div><div>{inputs.price}</div></div>
   {
     editable==true && 
    <input name="price" type="text"  onChange={changeIntValue} />
   }

   <div className="homeDisplayFlex"><div className="boldText">Beds:</div><div>{inputs.beds}</div></div>
    {
     editable==true &&
    <input name="beds" type="text"  onChange={changeIntValue} />
    }

    <div className="homeDisplayFlex"><div className="boldText">Guests:</div><div>{inputs.guests}</div></div>
    {
     editable==true &&
    <input name="guests" type="text"  onChange={changeIntValue} />
    }
    
    <div className="homeDisplayFlex"><div className="boldText">Baths:</div><div>{inputs.baths}</div></div>
    {
     editable==true &&
    <input name="baths" type="text"  onChange={changeIntValue} />
    }

    <div className="homeDisplayFlex" ><div className="boldText">Description:</div></div>
    <div className="homeDisplayFlex">{inputs.description}</div>
    {
    editable==true &&
    <input name="description" type="text"  onChange={changeStringValue} />
    }
   
   { editable==true &&
    <div className="homeDisplayFlex"
    onClick={deleteThis}
    ><span className="redbutton">Delete</span></div> 
    }


    
    
    
   
    <div  className="homeDisplayFlex" onClick={()=>{
        

      if (editable==true)
      {changedEditable(false)}  
      else
      {changedEditable(true)}
    }}><span className="greenbutton">Edit</span></div>
   </div>)



async function changeIntValue(e)
{
    var thisVal=0;
if(!(isNaN(parseInt(e.target.value))))
{thisVal=parseInt(e.target.value);}
    setInputs({...inputs,[e.target.name]:thisVal});
    const { data } =await axios.put('/api/homes', {action:'update',theid:props.id,stat:e.target.name,statvalue:thisVal });

}
async function changeStringValue(e)
{
    var thisVal=e.target.value;
    setInputs({...inputs,[e.target.name]:thisVal});
     axios.put('/api/homes', {action:'update',theid:props.id,stat:e.target.name,statvalue:thisVal });


}


async function deleteThis(e)
{
    changedVisible(false);
    const { data } =await axios.put('/api/homes', {action:'delete',theid:props.id });
}

}

export default DisplayHome;