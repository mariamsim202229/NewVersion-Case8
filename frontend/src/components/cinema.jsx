import React from 'react';

//using function Cinema in order to display json information about name and descritpion of the cinema 
//using props in the function order to fetch through the useCinemaData.js file by useEffect hook
export default function Cinema({ cinemaData }) {

  if (!cinemaData) {
    return null;
  }

  return (
    // fetching data from json file from the component useCinemaData.js about the name and description about the cinema
    <div>
      <h1> {cinemaData.cinema.name} </h1>
      <p className='text'> {cinemaData.cinema.description} </p>
    </div>
  )
}






