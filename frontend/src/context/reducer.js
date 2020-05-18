export const initialState = {
  theme: true,
  steps: {
    step: 1,
    person: {
      id: "",
      value: "",
      completed: false,
    },
    location: {
      id: "",
      value: "",
      completed: false,
    },
    texture: {
      id: "",
      value: "",
      completed: false,
    },
    size: {
      id: "",
      value: "",
      completed: false,
    },
    glassSize: {
      id: "",
      value: "",
      completed: false,
    },
    glassFamily: {
      id: "",
      value: "",
      completed: false,
    },
    doorConfiguration: {
      id: "",
      value: "",
      completed: false,
    },
    doorFinishes: {
      id: "",
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
      console.log(actions.id, actions.value);

      return {
        ...state,
        steps: {
          ...state.steps,
          [actions.step]: {
            value: actions.value,
            id: actions.id,
            completed: true,
          },
          step: state.steps.step + 1,
        },
      };
    case "UPDATE_SEARCH":
      return {
        ...state,
        search: actions.payload,
      };
    case "NEXT_STEP":
      return {
        ...state,
        steps: {
          ...state.steps,
          [actions.step]: {
            ...state[actions.step],
            value: "skipped",
          },
          step: state.steps.step + 1,
        },
      };

    case "PREV_STEP":
      return {
        ...state,
        steps: {
          ...state.steps,
          step: state.steps.step - 1,
        },
      };

    case "SET_STEP":
      return {
        ...state,
        steps: {
          ...state.steps,
          step: actions.step,
        },
      };

    case "RESET_STEP":
      return {
        ...state,
        steps: {
          ...initialState.steps,
          step: 1,
        },
      };
    default:
      return state;
  }
};

export default appReducer;
