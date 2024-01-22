export const getInputField = (item,value) => {
    let returnValue = null;
    switch (item.type) {
      case "textfield": {
        returnValue = (
          <tr key={item.id}>
            <td>
              <label className="text-nowrap">{item.label}</label>
            </td>
            <td>
              <input type="text" className="w-100" />
            </td>
          </tr>
        );
        break;
      }
      case "password": {
        returnValue = (
          <tr key={item.id}>
            <td>
              <label className="text-nowrap">{item.label}</label>
            </td>
            <td>
              <input type={"password"} className="w-100" value={value.Password}/>
            </td>
          </tr>
        );
        break;
      }
      case "radio": {
        returnValue = (
          <tr key={item.id}>
            <td>
              <label className="text-nowrap">{item.label}</label>
            </td>
            <td>
              <input type={"radio"} />
            </td>
          </tr>
        );
        break;
      }
      case "checkbox": {
        returnValue = (
          <tr key={item.id}>
            <td>
              <label className="text-nowrap">{item.label}</label>
            </td>
            <td>
              {" "}
              <input type={"checkbox"} />
            </td>
          </tr>
        );
        break;
      }
      case "number": {
        returnValue = (
          <tr key={item.id}>
            <td>
              <label className="text-nowrap">{item.label}</label>{" "}
            </td>
            <td>
              <input type="number" className="w-100" value={value.Number}/>
            </td>
          </tr>
        );
        break;
      }
      case "textarea": {
        returnValue = <textarea rows={6}></textarea>;
        break;
      }
      case "button": {
        returnValue = (
          <tr key={item.id}>
            {" "}
            <td align="right" colSpan={2}>
              <input type="button" value="Submit" className="ms-5" />
            </td>
          </tr>
        );
        break;
      }
      case "email": {
        returnValue = <input type={"email"} />;
        break;
      }
    }
    return returnValue;
  };
  