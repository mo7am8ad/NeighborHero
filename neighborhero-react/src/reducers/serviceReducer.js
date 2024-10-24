export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  catigory:"",
  cover:"",
  images:[],
  desc:"",
  price:""
};

export const serviceReducer = (state,action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return{
        ...state,
        [action.payload.name]: action.payload.value,
      };
      case "ADD_IMAGES":
      return{
        ...state,
        cover:action.payload.cover,
        images:action.payload.images,
      };
    default:
      return state;
  }
};