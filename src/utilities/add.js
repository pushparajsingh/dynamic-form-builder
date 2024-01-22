import React from "react";
const addComponentCode = (json) => {

  let formObj = () => {
    return json.reduce((accumulater, currentValue) => {
      if (currentValue.type == "datetime") {
        accumulater[currentValue.label.replaceAll(" ", "_")] = "";
      } else if (currentValue.type === "checkbox" || currentValue.type === "selectboxes") {
        accumulater[currentValue.label.replaceAll(" ", "_")] = [];
      } else if (
        currentValue.type !== "button" &&
        currentValue.type !== "datetime" &&
        currentValue.type !== "checkbox"
      ) {
        accumulater[currentValue.label.replaceAll(" ", "_")] = "";
      }
      return accumulater;
    }, {});
  };

  return `
    import React, { useState } from "react";
    import axios from "axios";
    import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
    
    const Add = ({ isOpen, toggle, getData }) => {
     
      const [form, setForm] = useState(${JSON.stringify(formObj())});


      const handleChange = (e) => {
        setForm((prevData) => {
          const { name, value, type, checked } = e.target;
      
          if (type === "checkbox") {
            if (checked) {
              // Add the value to the array
              const updatedArray = prevData[name] ? [...prevData[name], value] : [value];
              return { ...prevData, [name]: updatedArray };
            } else {
              // Remove the value from the array
              return {
                ...prevData,
                [name]: prevData[name].filter((item) => item !== value),
              };
            }
          } else {
            return { ...prevData, [name]: value };
          }
        });
      };
      

      const handleSubmit = () => {
        axios
          .post(process.env.REACT_APP_BASE_URL + "savecruds", form)
          .then((result) => {
            getData();
            close();
          })
          .catch((error) => {
            console.log("Error", error);
          });
      };

      const close = ()=>{
        toggle();
        setForm(${JSON.stringify(formObj())});
      }
      
      return (
        <Modal isOpen={isOpen} toggle={close}>
          <ModalHeader>
            Add
          </ModalHeader>
          <ModalBody>
          <div>
          ${json.length > 0 &&
    json
      .map((item, index) => {
        if (item.type && item.type !== "button") {
          const inputType =
            item.type === "phoneNumber" ? "number" : item.type;
          const isRequired = item.validate && item.validate.required;
          const requiredMarkup =
            isRequired == true ? (
              <span style={{ color: "red" }}>*</span>
            ) : (
              ""
            );

          if (item.type === "datetime") {
            return `
          <div>
          <label className="d-inline-block mt-2">
          ${item.label}
          ${requiredMarkup}
          
          </label>
          <input
          type="datetime-local"
          className="d-block mt-2 w-100 p-1"
          onChange={handleChange}
          name="${item.label.replaceAll(" ", "_")}"
          id="${item.label.replaceAll(" ", "_")}"
          />
          </div>`;
          }
          if (item.type === "select") {
            return `
          <div>
          <label className="d-inline-block mt-2">${item.label}</label>
          <select
          className="form-control"
          onChange={handleChange}
          name="${item.label.replaceAll(" ", "_")}"
          className="d-block mt-2 w-100 p-1"
          >
          <option value="">Please choose an option</option>
          ${item.data.values
                ? item.data.values.map(
                  (itm) => `<option value="${itm.value}">${itm.label}</option>`
                )
                : ""
              }
          </select>
          </div>`;
          }
          if (item.inputType === "checkbox") {
            return `
          <div>
          <label className="d-inline-block mt-2"> ${item.label}</label>
          <div className="d-flex mt-2 flex-wrap">
          ${item?.values
                ? item?.values
                  ?.map(
                    (itm) =>
                      `<div className="form-check w-25 mt-2">
          <input
          type="checkbox"
          className="form-check-input"
          onChange={handleChange}
          name="${item.label.replaceAll(" ", "_")}"
          value="${itm.value}"
          id="${itm.value}"
          />
          
          <label className="d-inline-block">${itm.label}</label> </div>`
                  )
                  .join("")
                : ""
              }
          </div>
          </div>`;
          }
          if (item.type === "radio") {
            return `
          <div className="mt-2">
          <label>${item.label}</label>
          <div className="d-flex flex-wrap">
          ${item.values
                ? item.values
                  .map(
                    (itm) =>
                      `
          <div className="w-25 mt-2">
          <input type="${item.type}" id="${itm.value
                      }" name="${item.label.replaceAll(" ", "_")}" value="${itm.value
                      }" onChange={handleChange} className="me-2"/>
          <label for="${itm.value}">${itm.label}</label>
          </div>
          `
                  )
                  .join("")
                : ""
              }
          </div>
          </div>`;
          }
          if (item.type === "textarea") {
            return `<div>
          <label className="d-inline-block mt-2">${item.label}</label>
          <textarea className="d-block mt-2 w-100 p-1" 
          onChange={handleChange}
          name="${item.label.replaceAll(" ", "_")}"
          placeholder="Enter ${item.label}" >
          </textarea>
          </div>`;
          }
          if (item.type === "selectboxes") {
            return `
           <div className="mt-2">
           <label>${item.label}</label>
           <div className="d-flex mt-2 flex-wrap">
           ${item.values
                ? item.values
                  .map(
                    (itm) =>
                      `
           <div className="form-check me-5">
           <input type="${item.inputType}" id="${itm.value
                      }" className="form-check-input" name="${itm.label.replaceAll(
                        " ",
                        "_"
                      )}" onChange={handleChange} />
          <label className="d-inline-block">${itm.label}</label>
          </div>
          // `
                  )
                  .join("")
                : ""
              }          
          </div>
          </div>`;
          } else {
            return `
          <div>
          <label className="d-inline-block mt-2">${item.label}</label>
          <input
          type="${inputType}"
          placeholder="Enter ${item.label}"
          className="d-block mt-2 w-100 p-1"
          onChange={handleChange}
          name="${item.label.replaceAll(" ", "_")}"
          />
          </div>`;
          }
        }
        return null;
      })
      .join("")
    }
          </div>
          
          </ModalBody>
          <ModalFooter>
          <Button onClick={close} color="danger">Close</Button>
          <Button onClick={handleSubmit} color="success">Submit</Button>
          </ModalFooter>
        </Modal>
      );
    };
    
    export default Add;
  `;
};

export default addComponentCode;
