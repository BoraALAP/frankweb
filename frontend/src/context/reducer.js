export const initialState = {
  theme: true,
  steps: {
    step: 1,
    customer: {
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
  },
  imgSrc: "http://frank.com.s3-website-us-east-1.amazonaws.com",
  search: "",
};

export const editState = {
  productId: "",
  dooredit: {
    step: 0,
    dividedLites: {
      id: "",
      value: "",
      completed: false,
    },
    doorConfiguration: {
      sideliteLeft: false,
      sideliteRight: false,
      transom: false,
      double: false,
      triple: false,
      quadruple: false,
      value: "",
      completed: false,
    },
    doorStyles: {
      id: "",
      value: "",
      completed: false,
    },
    doorSurround: {
      id: "",
      value: "",
      completed: false,
    },
    finishes: {
      id: "",
      value: "",
      completed: false,
    },
    frameFinishes: {
      id: "",
      value: "",
      completed: false,
    },
    glass: {
      id: "",
      value: "",
      completed: false,
    },
    handleSets: {
      id: "",
      value: "",
      completed: false,
    },
    sidelite: {
      id: "",
      value: "",
      completed: false,
    },
    transom: {
      id: "",
      value: "",
      completed: false,
    },
  },
};

export const appReducer = (state = initialState, actions) => {
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
            id: "",
            value: "skipped",
            completed: true,
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

export const editReducer = (state = editState, actions) => {
  switch (actions.type) {
    case "UPDATE_STEP":
      return {
        ...state,
        dooredit: {
          ...state.dooredit,
          [actions.step]: {
            value: actions.value,
            id: actions.id,
            completed: true,
          },
        },
      };
    case "UPDATE_DOOR_CONFIGURATION":
      return {
        ...state,
        dooredit: {
          ...state.dooredit,
          [actions.step]: {
            ...actions.payload,
            completed: true,
          },
        },
      };
    case "UPDATE_EDIT_STEP":
      return {
        ...state,
        dooredit: {
          ...state.dooredit,
          step: actions.step,
        },
      };
    case "GET_PRODUCT_ID":
      return {
        ...state,
        productId: actions.productId,
      };
    default:
      return state;
  }
};
