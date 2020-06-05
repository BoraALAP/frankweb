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
  productId: undefined,
  newId: undefined,
  doorEdit: {
    step: 0,
    glassAssociation: {
      id: "",
      value: "",
      completed: false,
    },
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
    finish: {
      id: "",
      value: "",
      completed: false,
    },
    frameFinish: {
      id: "",
      value: "",
      completed: false,
    },
    glassFamily: {
      id: "",
      value: "",
      completed: false,
    },
    handleSets: {
      id: "",
      value: "",
      completed: false,
    },
    defaultSize: {
      id: "",
      value: "",
      completed: false,
    },
    glassSize: {
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
    case "FIX_STEP":
      return {
        ...state,
        steps: {
          ...state.steps,
          [actions.step]: {
            value: actions.value,
            id: actions.id,
            completed: actions.completed,
          },
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
        doorEdit: {
          ...state.doorEdit,
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
        doorEdit: {
          ...state.doorEdit,
          [actions.step]: {
            ...actions.payload,
            completed: true,
          },
        },
      };
    case "UPDATE_EDIT_STEP":
      return {
        ...state,
        doorEdit: {
          ...state.doorEdit,
          step: actions.step,
        },
      };
    case "GET_PRODUCT_ID":
      return {
        ...state,
        productId: actions.productId,
      };
    case "NEW_PRODUCT_ID":
      return {
        ...state,
        newId: actions.newId,
      };
    case "RESET":
      return {
        ...editState,
      };
    default:
      return state;
  }
};
