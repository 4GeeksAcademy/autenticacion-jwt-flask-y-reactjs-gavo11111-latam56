export const initialStore = () => {
  return {
    message: "",
    email: "",
    password: "",
    token:""
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "get_email":
      return {
        ...store
      };

    case "set_token":
      return {
        ...store,
        token: action.payload
      };

    case "set_email":
      return {
        ...store,
        email: action.payload
      };

      case "set_welcome":
      return {
        ...store,
        message: action.payload
      };

    case "set_password":
      return {
        ...store,
        password: action.payload
      };

    default:
      throw Error("Unknown action.");
  }
}
