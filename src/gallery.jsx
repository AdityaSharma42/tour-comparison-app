import React,{useState, useEffect} from 'react';

const Gallery=()=>{
const [tours, setTours]=useState([]); //tours will store data about the tours,it will initially be an empty array and later updated after fetching data from the API
const [loading, setLoading]= useState(true); //loading will initially be true and be set to false after the data has been fetched
const [error, setError]= useState(null); //like loading, error will be initially set as null; if there is an error, an error message can be shown

useEffect(()=>{
    document.title= "Tour Comparison App";
    fetch ('https://course-api.com/react-tours-project') //fetching data from the API
        .then ((response)=>{
            if (!response.ok){
                throw new Error ('Error'); //error will be thrown if it can not get a response
            }
    
        return response.json();
    })
    .then ((data)=>{
        setTours(data); //update tours state with the data that was fetched
        setLoading(false); //data has finished loading, set loading to false
    })
    .catch ((e)=>{
        setError(e.message);
        setLoading(false);
    });
},[]);

if (loading){
    //display the loading message when loading
    return <div> Loading....</div>
}

if (error){
    //display error message if cant properly fetch message
    return <div> Error: {error}</div>;
}

//display the list of tours
return(
    <div>
        <h1>Tour gallery </h1>
        {tours.map((tour)=>(
            <div key= {tour.id}>
                <h3> {tour.name}</h3>
                <p> {tour.price}</p>
                <img src={tour.image} alt= {tour.name} width ="150"/>
                <p>{tour.info}</p>
                <button> Not interested</button>
            </div>
        ))}
    </div>
); 
};
export default Gallery;
        