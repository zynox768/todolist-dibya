import "./App.scss";
import React, { useState } from "react";
import { Button,Input, Empty } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
interface Todo {
  id: number;
  taskTitle: string;
  details: string;
  date: string;
}
const App: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [details, setDetails] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");
  const handleAddTask = () => {
    if (taskTitle.trim() !== "" && details.trim() !== "") {
      
      if (editId !== null) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === editId ? { ...todo, taskTitle, details } : todo
          )
        );
                toast.success("Task Edited");

        setEditId(null);
      } else {
        const newTodo: Todo = {
          id: new Date().getTime(),
          taskTitle,
          details,
          date: new Date().toLocaleDateString(),
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        toast.success("Task added successfully!");
      }
      setTaskTitle("");
      setDetails("");
    }
  };

  const handleEditTask = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setTaskTitle(todo.taskTitle);
      setDetails(todo.details);
      setEditId(id);


    }
  };

  const handleDeleteTask = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      toast.error("Task deleted!");

  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
  };
  const getRandomColor = () => {
    const colors = ["#fc374e", "#36aeb3", "#162d59", "#f15f0e"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  const filteredTodos = todos.filter(
    (todo) =>
      todo.taskTitle.toLowerCase().includes(searchText) ||
      todo.details.toLowerCase().includes(searchText)
  );
  return (
    <>    <h1 style={{textAlign:"center"}}>Todo List App</h1>
    <ToastContainer />

      <div className="containment">
        <div className="left-side">
          <Input
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
            className="input-field"
          />
          <Input.TextArea
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            style={{ marginBottom: "10px" }}
            className="input-field"
          />
          <div className="buttondiv">
          <Button
            type="primary"
            className="primary-button"
            onClick={handleAddTask}
          >
            {editId !== null ? "Update Task" : "Add Task"}
          </Button></div>
          <Input.Search
            placeholder="Search tasks"
            value={searchText}
            onChange={handleSearch}
            style={{ marginTop: "10px", marginBottom: "10px" }}
            className="input-field"
          />
        </div>
        <div className="right-side">
          {filteredTodos.length === 0 ? (
              <Empty description="No tasks" />
            ) : (
              <ol className="olcards">
                {filteredTodos.map((todo) => (
                  <li
                    key={todo.id}
                    style={{ "--cardColor": getRandomColor() } as any} // Type assertion
                  >
                    <div className="content">
                      <div className="title">{todo.taskTitle}</div>
                      <div className="text">{todo.details}</div>
                      <div>{todo.date}</div>
                      <div className="anticon-sty">
                        <EditOutlined
                          className="icon"
                          onClick={() => handleEditTask(todo.id)}
                        />
                        <DeleteOutlined
                          className="icon"
                          onClick={() => handleDeleteTask(todo.id)}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
        </div>
      </div>
    </>
  );
};
export default App;

// import React, { useState } from "react";
// import { Button, Card, Input, Empty } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import 'bootstrap/dist/css/bootstrap.min.css';

// interface Todo {
//   id: number;
//   taskTitle: string;
//   details: string;
//   date: string;
// }

// const App: React.FC = () => {
//   const [taskTitle, setTaskTitle] = useState("");
//   const [details, setDetails] = useState("");
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [editId, setEditId] = useState<number | null>(null);
//   const [searchText, setSearchText] = useState("");

//   const handleAddTask = () => {
//     if (taskTitle.trim() !== "" && details.trim() !== "") {
//       if (editId !== null) {
//         setTodos((prevTodos) =>
//           prevTodos.map((todo) =>
//             todo.id === editId ? { ...todo, taskTitle, details } : todo
//           )
//         );
//         setEditId(null);
//       } else {
//         const newTodo: Todo = {
//           id: new Date().getTime(),
//           taskTitle,
//           details,
//           date: new Date().toLocaleDateString(),
//         };
//         setTodos((prevTodos) => [...prevTodos, newTodo]);
//       }
//       setTaskTitle("");
//       setDetails("");
//     }
//   };

//   const handleEditTask = (id: number) => {
//     const todo = todos.find((todo) => todo.id === id);
//     if (todo) {
//       setTaskTitle(todo.taskTitle);
//       setDetails(todo.details);
//       setEditId(id);
//     }
//   };

//   const handleDeleteTask = (id: number) => {
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const searchText = e.target.value.toLowerCase();
//     setSearchText(searchText);
//   };

//   const filteredTodos = todos.filter(
//     (todo) =>
//       todo.taskTitle.toLowerCase().includes(searchText) ||
//       todo.details.toLowerCase().includes(searchText)
//   );

//   return (
//     <>
//       <h1 className="text-center">Todo List App</h1>

//       <div className="container">
//         <div className="row">
//           <div className="col-lg-6">
//             <Input
//               placeholder="Task Title"
//               value={taskTitle}
//               onChange={(e) => setTaskTitle(e.target.value)}
//               className="form-control mb-2"
//             />
//             <Input.TextArea
//               placeholder="Details"
//               value={details}
//               onChange={(e) => setDetails(e.target.value)}
//               className="form-control mb-2"
//             />
//             <div className="d-grid">
//               <Button
//                 type="primary"
//                 onClick={handleAddTask}
//                 className="btn btn-primary mb-2"
//               >
//                 {editId !== null ? "Update Task" : "Add Task"}
//               </Button>
//             </div>
//             <Input.Search
//               placeholder="Search tasks"
//               value={searchText}
//               onChange={handleSearch}
//               className="form-control"
//             />
//           </div>

//           <div className="col-lg-6">
//             {filteredTodos.length === 0 ? (
//               <Empty description="No tasks" />
//             ) : (
//               <div className="row row-cols-1 row-cols-md-2 g-4">
//                 {filteredTodos.map((todo) => (
//                   <div className="col" key={todo.id}>
//                     <Card
//                       className="card"
//                       title={todo.taskTitle}
//                       extra={<div>{todo.date}</div>}
//                       actions={[
//                         <EditOutlined
//                           key="edit"
//                           onClick={() => handleEditTask(todo.id)}
//                         />,
//                         <DeleteOutlined
//                           key="delete"
//                           onClick={() => handleDeleteTask(todo.id)}
//                         />,
//                       ]}
//                     >
//                       <p>{todo.details}</p>
//                     </Card>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import { Button, Card, Input, Empty } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import "bootstrap/dist/css/bootstrap.min.css";

// interface Todo {
//   id: number;
//   taskTitle: string;
//   details: string;
//   date: string;
// }

// const App: React.FC = () => {
//   const [taskTitle, setTaskTitle] = useState("");
//   const [details, setDetails] = useState("");
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [editId, setEditId] = useState<number | null>(null);
//   const [searchText, setSearchText] = useState("");

//   const handleAddTask = () => {
//     if (taskTitle.trim() !== "" && details.trim() !== "") {
//       if (editId !== null) {
//         setTodos((prevTodos) =>
//           prevTodos.map((todo) =>
//             todo.id === editId ? { ...todo, taskTitle, details } : todo
//           )
//         );
//         setEditId(null);
//       } else {
//         const newTodo: Todo = {
//           id: new Date().getTime(),
//           taskTitle,
//           details,
//           date: new Date().toLocaleDateString(),
//         };
//         setTodos((prevTodos) => [...prevTodos, newTodo]);
//       }
//       setTaskTitle("");
//       setDetails("");
//     }
//   };

//   const handleEditTask = (id: number) => {
//     const todo = todos.find((todo) => todo.id === id);
//     if (todo) {
//       setTaskTitle(todo.taskTitle);
//       setDetails(todo.details);
//       setEditId(id);
//     }
//   };

//   const handleDeleteTask = (id: number) => {
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const searchText = e.target.value.toLowerCase();
//     setSearchText(searchText);
//   };

//   const getRandomColor = () => {
//     const colors = ["#fc374e", "#36aeb3", "#162d59", "#f15f0e"];
//     const randomIndex = Math.floor(Math.random() * colors.length);
//     return colors[randomIndex];
//   };

//   const filteredTodos = todos.filter(
//     (todo) =>
//       todo.taskTitle.toLowerCase().includes(searchText) ||
//       todo.details.toLowerCase().includes(searchText)
//   );

//   return (
//     <>
//       <h1 className="text-center">Todo List App</h1>

//       <div className="container">
//         <div className="row">
//           <div className="col-lg-6">
//             <Input
//               placeholder="Task Title"
//               value={taskTitle}
//               onChange={(e) => setTaskTitle(e.target.value)}
//               className="form-control mb-2"
//             />
//             <Input.TextArea
//               placeholder="Details"
//               value={details}
//               onChange={(e) => setDetails(e.target.value)}
//               className="form-control mb-2"
//             />
//             <div className="d-grid">
//               <Button
//                 type="primary"
//                 onClick={handleAddTask}
//                 className="btn btn-primary mb-2"
//               >
//                 {editId !== null ? "Update Task" : "Add Task"}
//               </Button>
//             </div>
//             <Input.Search
//               placeholder="Search tasks"
//               value={searchText}
//               onChange={handleSearch}
//               className="form-control"
//             />
//           </div>

//           <div className="col-lg-6">
//             {filteredTodos.length === 0 ? (
//               <Empty description="No tasks" />
//             ) : (
//               <ol className="olcards">
//                 {filteredTodos.map((todo) => (
//                   <li
//                     key={todo.id}
//                     style={{ "--cardColor": getRandomColor() } as any} // Type assertion
//                   >
//                     <div className="content">
//                       <div className="title">{todo.taskTitle}</div>
//                       <div className="text">{todo.details}</div>
//                       <div>{todo.date}</div>
//                       <div>
//                         <EditOutlined
//                           className="icon"
//                           onClick={() => handleEditTask(todo.id)}
//                         />
//                         <DeleteOutlined
//                           className="icon"
//                           onClick={() => handleDeleteTask(todo.id)}
//                         />
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ol>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;
