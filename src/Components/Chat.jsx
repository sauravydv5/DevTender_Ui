// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import { useSelector } from "react-redux";

// let socket;

// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isTargetOnline, setIsTargetOnline] = useState(false);
//   const user = useSelector((store) => store.user);
//   const userId = user._id;

//   useEffect(() => {
//     if (!userId) return;

//     socket = createSocketConnection();

//     socket.emit("joinChat", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//     });

//     socket.on("messageReceived", ({ firstName, text }) => {
//       setMessages((prev) => {
//         if (
//           firstName === user.firstName &&
//           prev.some((msg) => msg.text === text)
//         ) {
//           return prev;
//         }
//         return [...prev, { firstName, text }];
//       });
//     });

//     // Listen for online status of target user
//     socket.on("userOnline", ({ userId: onlineUserId }) => {
//       if (onlineUserId === targetUserId) setIsTargetOnline(true);
//     });

//     socket.on("userOffline", ({ userId: offlineUserId }) => {
//       if (offlineUserId === targetUserId) setIsTargetOnline(false);
//     });

//     // You can request initial online status here if you implement such API

//     return () => {
//       socket.off("messageReceived");
//       socket.off("userOnline");
//       socket.off("userOffline");
//     };
//   }, [userId, targetUserId]);

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     socket.emit("sendMessage", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//       text: newMessage,
//     });

//     setMessages((prev) => [...prev, { firstName: "You", text: newMessage }]);
//     setNewMessage("");
//   };

//   return (
//     <div className="w-[70%] h-[70vh] bg-gray-900 text-white mx-auto mt-10 rounded-lg shadow-lg flex flex-col p-4">
//       {/* Header */}
//       <div className="flex items-center justify-between pb-2 mb-4 text-xl font-semibold text-center border-b border-gray-700">
//         <span>Chat</span>
//         <span
//           className={`text-sm ${
//             isTargetOnline ? "text-green-400" : "text-gray-600"
//           }`}
//         >
//           {isTargetOnline ? "Online" : "Offline"}
//         </span>
//       </div>

//       {/* Chat Body */}
//       <div className="flex-1 px-2 space-y-4 overflow-y-auto">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex flex-col ${
//               msg.firstName === "You" ? "items-end" : "items-start"
//             }`}
//           >
//             <span className="mb-1 text-sm text-gray-400">{msg.firstName}</span>
//             <div
//               className={`px-4 py-2 rounded-lg max-w-[60%] ${
//                 msg.firstName === "You" ? "bg-blue-600" : "bg-gray-700"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Chat Input */}
//       <div className="flex mt-4">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 p-2 text-black rounded-l-lg outline-none"
//         />
//         <button
//           onClick={sendMessage}
//           className="px-6 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

let socket;

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTargetOnline, setIsTargetOnline] = useState(false);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    // ✅ localStorage se token leke socket connect
    const token = localStorage.getItem("authToken");
    socket = createSocketConnection(token);

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    socket.on("userOnline", ({ userId: onlineUserId }) => {
      if (onlineUserId === targetUserId) setIsTargetOnline(true);
    });

    socket.on("userOffline", ({ userId: offlineUserId }) => {
      if (offlineUserId === targetUserId) setIsTargetOnline(false);
    });

    return () => {
      socket.off("messageReceived");
      socket.off("userOnline");
      socket.off("userOffline");
      socket.disconnect();
    };
  }, [userId, targetUserId, user?.firstName]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setMessages((prev) => [...prev, { firstName: "You", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="w-[70%] h-[70vh] bg-gray-900 text-white mx-auto mt-10 rounded-lg shadow-lg flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-4 text-xl font-semibold border-b border-gray-700">
        <span>Chat</span>
        <span
          className={`text-sm ${
            isTargetOnline ? "text-green-400" : "text-gray-600"
          }`}
        >
          {isTargetOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 px-2 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.firstName === "You" ? "items-end" : "items-start"
            }`}
          >
            <span className="mb-1 text-sm text-gray-400">{msg.firstName}</span>
            <div
              className={`px-4 py-2 rounded-lg max-w-[60%] ${
                msg.firstName === "You" ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 text-black rounded-l-lg outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-6 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
