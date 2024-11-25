import React,{useState, useEffect} from 'react';

const Gallery=()=>{
const [tours, setTours]=useState([]); //tours will store data about the tours,it will initially be an empty array and later updated after fetching data from the API
const [loading, setLoading]= useState(true); //loading will initially be true and be set to false after the data has been fetched
const [error, setError]= useState(null); //like loading, error will be initially set as null; if there is an error, an error message can be shown

useEffect(()=>{
    document.title= "Tour Comparison App";
    fetch ('https://www.course-api.com/react-tours-project') //fetching data from the API
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
const handleRemovetour = (id)=>{ //function that removes a tour from the list
    setTours((prevTour)=> prevTour.filter((tour)=> tour.id !== id));
};
const handleToggle= (id)=>{ 
    setTours((prevTours)=>
    prevTours.map((tour)=>
        tour.id===id
    ?{...tour, showMore: !tour.showMore}
    :tour
)
);
};

//display the list of tours
return(
    <div>
        <h1>Tour gallery </h1>
        {tours.map((tour)=>(
            <div key= {tour.id}>
                <h3> {tour.name}</h3>
                <p> Price:${tour.price}</p>
                <img src={tour.image} alt= {tour.name} width ="350"/>
                <p>{tour.showMore? tour.info: `${tour.info.substring(0,100)}...`}</p>
                <button onClick={()=> handleToggle(tour.id)}>{tour.showMore? 'Show Less': 'Read More'} </button>
                <button onClick={()=> handleRemovetour(tour.id)}> Not interested</button>
            </div>
        ))}
    </div>
); 
};
export default Gallery;
        