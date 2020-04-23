export const initialState = {
  theme: true,
  steps: {
    person: {
      value: "",
      completed: false,
    },
    location: {
      value: "",
      completed: false,
    },
    texture: {
      value: "",
      completed: false,
    },
    size: {
      value: "",
      completed: false,
    },
    glassSize: {
      value: "",
      completed: false,
    },
    doorConfiguration: {
      value: "",
      completed: false,
    },
    doorFinishes: {
      value: "",
      completed: false,
    },
    glassType: { value: "", completed: false },
    handle: { value: "", completed: false },
    doorSurrenders: { value: "", completed: false },
    sideliteStyle: { value: "", completed: false },
    sideliteFinish: { value: "", completed: false },
    sideliteGlass: { value: "", completed: false },
    transomStyle: { value: "", completed: false },
  },
  imgSrc: "http://frank.com.s3-website-us-east-1.amazonaws.com",
  search: "",
};

const appReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "UPDATE_STEP":
      return {
        ...state,
        steps: {
          ...state.steps,
          [actions.step]: {
            value: actions.payload,
            completed: true,
          },
        },
      };
    case "UPDATE_SEARCH":
      return {
        ...state,
        search: actions.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
