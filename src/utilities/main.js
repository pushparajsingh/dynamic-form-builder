import React from "react";
const mainIndexFile = (json) => `
import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import Add from "./Add/index";
import Edit from "./Edit/index";
import Delete from "./Delete/index";

function Index({ json }) {
  const [data, setData] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [edittoggle, setEditToggle] = useState(false);
  const [id, setId] = useState("");
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [delId, setDelId] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .post(process.env.REACT_APP_BASE_URL + "getcruds")
      .then((item) => {
        let newData = JSON.parse(JSON.stringify(item.data.data));
        let index = -1;
        for (let obj of newData) {
          index++;
          for (let key in obj) {
            if (Array.isArray(obj[key])) {
              let array = [];
              let length = obj[key].length;
              obj[key].map((element, j) => {
                if (length - 1 != j) {
                  array.push((element += ", "));
                } else array.push(element);
              });
              newData[index][key] = array;
            }
          }
        }
        setData(newData);
     
      })
      .catch((error) => console.log("error", error));
  };

  const openAddModal = () => {
    settoggle(true);
  };

  const closeAddModal = () => {
    settoggle(false);
  };

  const openEditModal = () => {
    setEditToggle(true);
  };

  const closeEditModal = () => {
    setEditToggle(false);
  };

  const closeDeleteModal = () => {
    setDeleteToggle(false);
  };

  const editModelToggle = (id) => {
    setEditToggle(true);
    setId(id);
  };

  const deleteModelToggle = (id) => {
    setDeleteToggle(true);
    setDelId(id);
  };

  return (
    <div className="container">
      <div style={{ display: "flex" }} className="mb-2 mt-2">
        <Button style={{ marginRight: "8px" }} color="primary" onClick={openAddModal}>
          Add
        </Button>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
          <th>Id</th>
           ${json
             .map((item) => {
               if (item.key != "submit")
                 return "<th>" + `${item.label}` + "</th>";
             })
             .join("")}
           <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
            {Object.values(item).slice(0,-2).map((element,num)=>{ 
              if(num == 0) return <td>{index + 1}</td>
                return <td>{element}</td>
              })}
              <td className="d-flex flex-nowrap">
                <Button
                  color="success"
                  onClick={() => editModelToggle(item._id)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  onClick={() => deleteModelToggle(item._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Add
        isOpen={toggle}
        toggle={closeAddModal}
        getData={getData}
        json={json}
      />
      <Edit
        isOpen={edittoggle}
        toggle={closeEditModal}
        getData={getData}
        id={id}
        json={json}
      />
      <Delete
        isOpen={deleteToggle}
        toggle={closeDeleteModal}
        getData={getData}
        id={delId}
        json={json}
      />
    </div>
  );
}
export default Index;
`;
export default mainIndexFile;
