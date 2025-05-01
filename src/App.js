// import logo from './logo.svg';
// // import './App.css';
// import RecipeForm from './Components/RecipeForm/RecipeForm';
// import RecipeFinder from './Components/lakshmiApp/RecipeFinder';

// function App() {
//   return (
//     <div className="App">
//       {/* <RecipeForm/> */}
//       <RecipeFinder/>
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//     </div>
//   );
// }

// export default App;


//create App with BrowserRouter routing to recipefinder and chat
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeFinder from "./Components/lakshmiApp/RecipeFinder";
import Chat from './Components/lakshmiApp/Chat'


function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecipeFinder />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function Home() {
  return (
    <h1>Home</h1>
  )
}
function About() {
  return (
    <h1>About</h1>
  )
}
export default App;