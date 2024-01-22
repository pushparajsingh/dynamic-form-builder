export const formIoData = {
  display: "form",
  components: [
    {
      label: "Text Field",
      tableView: true,
      validate: {
        customMessage: "Test error",
        minLength: 3,
        maxLength: 10,
      },
      errorLabel: "Please fill in only letters.",
      key: "textField",
      type: "textfield",
      input: true,
    }
  ],
};
