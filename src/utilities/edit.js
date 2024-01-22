const editComponentCode = (json) => `
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Edit = ({ isOpen, toggle, getData, id }) => {

  const [form, setForm] = useState({});
  
  const handleChange = (e) => {
    setForm((prevData) => {
      const { name, value, type, checked } = e.target;
  
      if (type === "checkbox") {
        const updatedArray = checked
          ? [...(prevData[name] || []), value]
          : (prevData[name] || []).filter((item) => item !== value);

        return { ...prevData, [name]: updatedArray };
      } else if (type === "radio") {
        return { ...prevData, [name]: value };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };

  useEffect(() => {
    if (isOpen) {
      getEdit();
    }
  }, [isOpen]);

  const getEdit = () => {
    axios
      .get(process.env.REACT_APP_BASE_URL + "editcruds/" + id)
      .then((item) => {
        const formData = item.data.data;
        setForm(formData);
      })
      .catch((error) => console.log(687, error));
  };

  const handleSubmit = () => {
    axios
      .post(process.env.REACT_APP_BASE_URL + "updatecruds/" + id, form)
      .then((result) => {
        console.log("successfully Updated", result);
        toggle();
        getData(); 
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Edit</ModalHeader>
        <ModalBody>
          <div>
            ${json.length > 0 &&
              json
                .map((item, index) => {
                  if (item.type && item.type !== "button") {
                    const inputType = item.type === "phoneNumber" ? "number" : item.type;
                    if (item.type === "datetime") {
                      return `
                        <div>
                          <label className="d-inline-block mt-2">${item.label}</label>
                          <input
                            type="datetime-local"
                            className="d-block mt-2 w-100 p-1"
                            onChange={handleChange}
                            name="${item.label.replaceAll(" ", "_")}"
                            value={form.${item.label.replaceAll(" ", "_")}}
                            id="Checkbox"
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
                            value={form["${item.label.replaceAll(" ", "_")}"]}
                          >
                            <option value="">Please choose an option</option>
                            ${item.data.values
                              ? item.data.values
                                  .map(
                                    (itm) => `<option value="${itm.value}">${itm.label}</option>`
                                  )
                                  .join("")
                              : ""}
                          </select>
                        </div> 
                      `;
                    }
                    if (item.type === "checkbox") {
                      return `
                        <div>
                          <label className="d-inline-block mt-2">${item.label}</label>
                          <div className="d-flex mt-2 flex-wrap">
                            ${item?.values
                              ?.map(
                                (ele) => `
                                <div className="form-check me-5">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  onChange={handleChange}
                                  name="${item.label.replaceAll(" ", "_")}"
                                  value="${ele.value}"
                                  checked={form?.${[item.label.replaceAll(" ", "_")]}?.includes("${ele.value}") || false}
                                  id="${ele.value}"
                                />
                                <label className="d-inline-block">${ele.label}</label>
                              </div>
                                `
                              )
                              .join("")}
                          </div>
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
                                    (itm) => `
                                      <div className="form-check me-5">
                                        <input
                                          type="${item.inputType}"
                                          id="${itm.value}"
                                          value="${itm.value}"
                                          className="form-check-input"
                                          name="${item.label.replaceAll(" ", "_")}"
                                          onChange={handleChange}
                                          checked={form?.${[item.label.replaceAll(" ", "_")]}?.includes("${itm.value}") || false}
                                        />
                                        <label className="d-inline-block">${itm.label}</label>
                                      </div>`
                                  )
                                  .join("")
                              : ""}
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
                                    (itm) => `
                                      <div className="me-5 mt-2">
                                        <input
                                          type="${item.type}"
                                          id="${itm.value}"
                                          name="${item.label.replaceAll(" ", "_")}"
                                          checked={form?.${[item.label.replaceAll(" ", "_")]} === "${itm.value}"}
                                          onChange={handleChange}
                                          value="${itm.value}"
                                          className="me-2"
                                        />
                                        <label for="${itm.value}">${itm.label}</label>
                                      </div>          
                                  ` )
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
                          placeholder="Enter ${item.label}" 
                          value={form.${item.label.replaceAll(" ", "_")}}
                          >
                          </textarea>
                          </div>`;
                    }
                    else {
                      return `
                          <div>
                            <label className="d-inline-block mt-2">${item.label}</label>
                            <input
                              type="${inputType}"
                              placeholder="Enter ${item.label}"
                              onChange={handleChange}
                              name="${item.label.replaceAll(" ", "_")}"
                              value={form.${item.label.replaceAll(" ", "_")}}
                              className="d-block mt-2 w-100 p-1"
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
          <Button onClick={toggle} color="danger">Close</Button>
          <Button onClick={handleSubmit} color="success">Update</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Edit;
`;

export default editComponentCode;
