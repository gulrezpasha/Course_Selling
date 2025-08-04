// import React, { useState } from 'react'
// import toast from 'react-hot-toast';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// function Buy() {
//   const {courseId}=useParams();
//   const[loading,setloading]=useState(false);
//   const navigate=useNavigate();


//   const token = localStorage.getItem("user");


// console.log("Token:", token);

// const handlePurchase = async () => {
//   if (!token) {
//     toast.error("Please login to purchase the course");
//     return;
//   }

//   try {
//     setloading(true);
//     const { data } = await axios.post(
//       `http://localhost:4001/api/v1/course/buyCourse/${courseId}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       }
//     );

//     toast.success(data.message || "Course purchased successfully!");
//     navigate("/purchases");
//   }  catch (error) {
//   if (error?.response?.status === 400) {
//     toast.error("You have already purchased this course");
//      navigate("/purchases");
//   } else if (error?.response?.status === 401) {
//     localStorage.clear(); // Clear invalid/stale token
//     toast.error("Session expired. Please login again.");
//     navigate("/login");
//   } else {
//     toast.error(error?.response?.data?.errors || "Something went wrong");
//   }
// } finally {
//   setloading(false);
// }
// };



//   return (
//     <div className='flex h-screen items-center justify-center'>
//       <button className='bg-orange-500 text-white py-2 px-4 rounded-md hover::bg-orange-800 duration-300' onClick={handlePurchase} disabled={loading} > 
//         {loading ? "processing..." : "Buy Now"}
//       </button>
//     </div>
//   )
// }

// export default Buy




// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// function Buy() {
//   const { courseId } = useParams();
//   const [loading, setloading] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("user");

//   const handlePurchase = async () => {
//     try {
//       const { data } = await axios.post(
//         `http://localhost:4001/api/v1/course/buyCourse/${courseId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message || "Course purchased successfully!");
//       navigate("/purchases");
//     } catch (error) {
//       if (error?.response?.status === 400) {
//         toast.error("You have already purchased this course");
//         navigate("/purchases");
//       } else if (error?.response?.status === 401) {
//         localStorage.clear(); // Clear invalid/stale token
//         toast.error("Session expired. Please login again.");
//         navigate("/login");
//       } else {
//         toast.error(error?.response?.data?.errors || "Something went wrong");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen items-center justify-center gap-6">
//       <h1 className="text-2xl font-semibold">Buy Course</h1>

//       <PayPalScriptProvider options={{ "client-id": "AXea4w9V-0EFsgPecafSmmFs1Qn27emfWD7Hcj4NuXwWMc5yNX6JJxkxq-kD9_L_X8NfccSoZMLaa3Ia" }}>
//         <PayPalButtons
//           style={{ layout: "vertical", shape: "rect" }}
//           createOrder={(data, actions) => {
//             return actions.order.create({
//               purchase_units: [
//                 {
//                   amount: {
//                     value: "499", // Replace with dynamic price if needed
//                   },
//                 },
//               ],
//             });
//           }}
//           onApprove={async (data, actions) => {
//             const details = await actions.order.capture();
//             if (details.status === "COMPLETED") {
//               toast.success("✅ Payment successful!");
//               handlePurchase(); // 🔁 Now call your existing course purchase API
//             } else {
//               toast.error("❌ Payment failed.");
//             }
//           }}
//           onError={(err) => {
//             console.error(err);
//             toast.error("❌ Payment error occurred");
//           }}
//         />
//       </PayPalScriptProvider>

//       <p className="text-gray-500">Price: ₹499 (via PayPal)</p>
//     </div>
//   );
// }

// export default Buy;





// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// function Buy() {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("user");

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const { data } = await axios.get(`http://localhost:4001/api/v1/course/${courseId}`);
//         setCourse(data.course); // assuming you return { course: {...} }
//         setLoading(false);
//       } catch (error) {
//         toast.error("Course not found!");
//         navigate("/");
//       }
//     };

//     fetchCourse();
//   }, [courseId, navigate]);

//   const handlePurchase = async () => {
//     try {
//       const { data } = await axios.post(
//         `http://localhost:4001/api/v1/course/buyCourse/${courseId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );

//       toast.success(data.message || "Course purchased successfully!");
//       navigate("/purchases");
//     } catch (error) {
//       if (error?.response?.status === 400) {
//         toast.error("You have already purchased this course");
//         navigate("/purchases");
//       } else if (error?.response?.status === 401) {
//         localStorage.clear();
//         toast.error("Session expired. Please login again.");
//         navigate("/login");
//       } else {
//         toast.error(error?.response?.data?.errors || "Something went wrong");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white shadow-xl rounded-xl max-w-2xl w-full p-8">
//         {loading ? (
//           <p className="text-center text-lg text-gray-500">Loading course...</p>
//         ) : (
//           <>
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h2>
//             <p className="text-gray-600 mb-4">{course.description}</p>
//             <div className="mb-6">
//               <span className="text-xl font-semibold text-orange-600">
//                 ₹{course.price}
//               </span>
//               <span className="text-sm text-gray-500 ml-2">one-time payment</span>
//             </div>

//             <div className="mb-4">
//               <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
//                 <PayPalButtons
//                   style={{ layout: "horizontal", color: "gold", shape: "rect", label: "paypal" }}
//                   createOrder={(data, actions) => {
//                     return actions.order.create({
//                       purchase_units: [
//                         {
//                           amount: { value: course.price.toString() },
//                         },
//                       ],
//                     });
//                   }}
//                   onApprove={async (data, actions) => {
//                     const details = await actions.order.capture();
//                     if (details.status === "COMPLETED") {
//                       toast.success("✅ Payment successful!");
//                       handlePurchase();
//                     } else {
//                       toast.error("❌ Payment failed.");
//                     }
//                   }}
//                   onError={(err) => {
//                     toast.error("❌ Payment error occurred");
//                     console.error(err);
//                   }}
//                 />
//               </PayPalScriptProvider>
//             </div>

//             <button
//               onClick={() => navigate("/courses")}
//               className="text-blue-600 hover:underline text-sm"
//             >
//               ← Back to Courses
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Buy;




import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Buy() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const navigate = useNavigate();
  // const token = localStorage.getItem("user");
 


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/v1/course/${courseId}`
        );
        

        setCourse(data.course);
        setLoading(false);
      } catch (error) {
        toast.error("Course not found!",error);
        navigate("/");
      }
    };
    fetchCourse();
  }, [courseId, navigate]);

  const handlePurchase = async () => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        `http://localhost:4001/api/v1/course/buyCourse/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success(data.message || "Course purchased successfully!");
      navigate("/purchases");
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error("You have already purchased this course");
        navigate("/purchases");
      } else if (error?.response?.status === 401) {
        localStorage.clear();
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(error?.response?.data?.errors || "Something went wrong");
      }
    }
  };

const handleDemoPurchase = async () => {
  try {
    setLoading(true);  // capital L
    // const user = JSON.parse(localStorage.getItem("user"));
    // const token = user?.token;
    const token = localStorage.getItem("token");


    console.log("Token:", token);

    const { data } = await axios.post(
      `http://localhost:4001/api/v1/course/buyCourse/${courseId}`,
      { demo: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    toast.success(data.message || "Demo purchase successful!");
    navigate("/purchases?demo=true");
  } catch (error) {
    console.error("❌ Demo Purchase Error:", error.response?.data || error.message);
    toast.error("Demo purchase failed");
  } finally {
    setLoading(false);  // capital L
  }
};



  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading course...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 gap-6">
      <div className="bg-white shadow-xl rounded-xl max-w-xl w-full p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="mb-6">
          <span className="text-xl font-semibold text-orange-600">
            ₹{course.price}
          </span>
          <span className="text-sm text-gray-500 ml-2">one-time payment</span>
        </div>

        {!demoMode && (
          <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
            <PayPalButtons
              style={{ layout: "horizontal", color: "gold", shape: "rect" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: course.price.toString() } }],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                if (details.status === "COMPLETED") {
                  toast.success("✅ Payment successful!");
                  handlePurchase();
                } else {
                  toast.error("❌ Payment failed.");
                }
              }}
              onError={(err) => {
                toast.error("❌ Payment error occurred");
                console.error(err);
              }}
            />
          </PayPalScriptProvider>
        )}

        {demoMode && (
          <button
            onClick={handleDemoPurchase}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition"
          >
            {loading ? "Processing..." : "Demo Purchase (Free)"}
          </button>
        )}

        <button
          onClick={() => setDemoMode(!demoMode)}
          className="mt-6 text-blue-600 hover:underline"
        >
          {demoMode
            ? "Switch to Real PayPal Payment"
            : "Switch to Demo Purchase (No Payment)"}
        </button>
      </div>
    </div>
  );
}

export default Buy;







