import React, { useState } from "react";
import { formIoData } from "../consts.js";
import { FormBuilder as FormBuilderIo, Formio } from "react-formio";
import addComponentCode from "../utilities/add.js";
import editComponentCode from "../utilities/edit.js";
import deleteComponentCode from "../utilities/delete.js";
import packageData from "../utilities/package.js";
import htmlFile from "../utilities/htmlFile.js";
import IndexFile from "../utilities/IndexFile.js";
import mainIndexFile from "../utilities/main.js";
import app from "../utilities/app.js";
import axios from "axios";
import JSZip from "jszip";
import envComponentCode from "../utilities/env.js";

export default function Main() {
  const [formData, setFormData] = useState(formIoData);

  const printResult = () => {
    Formio.createForm(document.getElementById("formio-result"), {
      components: formData.components,
    }).then((form) => {
      let uniqueFieldMake = [...form.component.components];
      uniqueFieldMake.map((item, i) => {
        let count = 1;
        uniqueFieldMake.filter((element, j) => {
          if (i != j && element.label == item.label) {
            element.label += count++;
          }
        });
      });
      setJsonToBackend(uniqueFieldMake);
      downloadDynamicCode(uniqueFieldMake);
      form.on("submit", (data) => console.log("submit", data));
    });
  };
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  const setJsonToBackend = async (json) => {
    json.map((item) => {
      item.label = item.label.replace(/Date \/ Time/g, "Date Time");
      return item;
    }, []);
    console.log(213, json);
    console.log(
      "isRequired",
      json.map((item) => item.validate).map((itm) => itm.required)
    );
    const result = JSON.stringify(json, getCircularReplacer());
    await axios
      .post("https://api-dynamic-crudoperation.imenso.in/users/getCrud", {
        data: JSON.parse(result),
      })
      .then((response) => {
        const firstName = response.data.data;
        window.location.href = `https://api-dynamic-crudoperation.imenso.in/${firstName}`;
      })
      .catch((error) => console.log("error", error));
  };

  const downloadDynamicCode = async (json) => {
    const zip = new JSZip();

    zip.file("src/components/Add/index.js", addComponentCode(json));
    zip.file("src/components/Edit/index.js", editComponentCode(json));
    zip.file("src/components/Delete/index.js", deleteComponentCode());
    zip.file("src/components/index.js", mainIndexFile(json));
    zip.file("package.json", packageData());
    zip.file("public/index.html", htmlFile());
    zip.file("src/index.js", IndexFile());
    zip.file("src/App.js", app());
    zip.file(".env", envComponentCode());

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "FrontendCode.zip";
    link.click();
  };

  return (
    <div>
      <div>
        <div style={{ textAlign: "right" }}>
          <button
            className="green mr-5 mt-4"
            onClick={printResult}
            id="helloworld"
          >
            Download Now
          </button>
        </div>

        <div className="mr-5">
          <FormBuilderIo
            form={formIoData}
            saveForm={(data) => setFormData(data)}
          />
        </div>
        <div style={{ display: "none" }}>
          <div id="formio-result" />
        </div>
      </div>
    </div>
  );
}
