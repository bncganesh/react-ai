import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useLocation } from 'react-router-dom';


function Chat() {
    const [userInput, setUserInput] = useState("");
    const location = useLocation();
    const recipe = location.state?.recipe;
    const formData=location.state?.formData;
    const contextMessages=[
        { message: `The suggested recipe:${recipe}`, role: "Chatbot" },
        { message: `The form Data:${formData}`, role: "Chatbot" }
    ]
    const [messages, setMessages] = useState([
        { message: "Please enter your message", role: "Chatbot" }
    ]);



    const handleSend = async () => {
        if (!userInput.trim()) return;


        const newMessage = { role: "User", message: userInput };
        setMessages([...messages, newMessage]);


        try {
            const response = await axios.post("http://127.0.0.1:5000/chat", { message: userInput, chatHistory: [...contextMessages, ...messages] });
            const botMessage = { role: "Chatbot", message: response.data.message };
            setMessages( [...messages, botMessage]);



        } catch (error) {
            console.error("Error sending message:", error);
        }


        setUserInput("");
    };


    return (
        <div className="chat-container">
            <div className="chat-history" id="chat-history">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`${msg.role === "User" ? "user" : "bot"}-message`}
                    >
                        {/* {msg.message.replace(/\n/g, "<br/>")} */}
                        {msg.message && (
                            <div>
                                {msg.message.split('\n').map((item, index) => (
                                    <React.Fragment key={index}>
                                        {item}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <textarea
                    id="user-input"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <button id="send-button" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};


export default Chat;

/* 
console.log(foo()); // ?

var foo = function() {

  return "Hello!";

};

function foo() {

  return "Hi!";

}
 
var a = 1;

(function() {

  console.log(a); // ?

  var a = 2;

})();
 
// Example usage

const objA = { name: "John", age: 30, address: { city: "Delhi" } };

const objB = { name: "John", age: 30, address: { city: "Delhi" } };
 
function objectCompare(obj1, obj2) {
  for (let key in obj1) {
    if (typeof key === 'object') {
      objectCompare(obj1[key], obj2[key])
    }
    if (typeof key !== 'object' && obj1[key] == obj2[key]) {
      return true
    }
  }
  return false
}
 
// Example usage
const objA = { name: "John", age: 32, address: { city: "elhi" } };
const objB = { name: "John", age: 30, address: { city: "Delhi" } };
 
console.log(objectCompare(objA, objB))
 
const nested = {

  name: "John",

  address: {

    city: "Delhi",

    pin: 110001,

    coordinates: {

      lat: 28.6,

      lng: 77.2

    }

  },

  active: true

};
 
{

  "name": "John",

  "address.city": "Delhi",

  "address.pin": 110001,

  "address.coordinates.lat": 28.6,

  "address.coordinates.lng": 77.2,

  "active": true

}
 
<></>
 
*/