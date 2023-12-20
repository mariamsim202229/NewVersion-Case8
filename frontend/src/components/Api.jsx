// import { useState, useEffect } from 'react';



// Api.jsx
export async function Api(bookingData) {
    const endpoint = "http://localhost:4000/bookings"; // Adjust the endpoint URL as needed
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    };
  
    try {
      const response = await fetch(endpoint, options);
      const data = await response.json();
      return data; // Assuming your backend sends back some data
    } catch (error) {
      console.error("Error sending booking data:", error);
      throw error; // Rethrow the error for handling in the component
    }
  }
  

// export async function Api({ bookingData }) {

    // const [bookingData, setBookingData] = useState("");
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:4000/bookings', {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             setBookingData(data);
    //             // setMovies(data?.cinema?.movies || []);
    //             // const allShows = data?.cinema?.movies.flatMap((movie) => movie.shows || []);
    //             // setShows(allShows);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, [token]);


    //ch
//  if (error) {
//     return <div>Error fetching data: {error.message}</div>;
//   }

//   if (!bookingData) {
//     return <div>Loading...</div>;
//   }
//      }

//     const handleRequest = (e) => {
//         e.preventDefault();
//         const endpoint = "http://localhost:4000";

//         const option = {
//             method: "GET",
//             mode: "cors",
//             headers: { "Authorization": token, "Content-Type": "application/json" },
//         }

//         asyncRequest(endpoint, option);
//     }

//     const asyncRequest = (endpoint, option) => {
//         fetch(endpoint, option)
//         .then(response => response.json())
//         .then((bookingData) => {
//             console.log("bookingData", bookingData);
//             setBookingData(bookingData.result);
//         });
//     }

//     return (
//         <>
//             <h3>API request</h3>
//             <form action="/api/resource" method="get" onSubmit={handleRequest}>
//                 <button type="submit">Make API request</button>
//             </form>
//         </>
//     )
// }

