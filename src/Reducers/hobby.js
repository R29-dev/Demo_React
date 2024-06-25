import { useSelector } from "react-redux";
const initialState = {
    qty: 1
};

const hobbyReducer = (state = initialState, action) => {
    console.log("State hiện tại:", state); // Log state hiện tại trước khi xử lý action
   
    switch (action.type) {
        case "ADD_HOBBY":
            // Thêm hobby mới vào danh sách
            // const hobbyReducer = ( state = initialSale, action)
            // console.log( hobbyReducer); 
            // return {
            //     ...state,
            //     list: newList
            // };

            let abc = {
                qty: action.payload.new
            };
            return abc;

        default:
            return state;
    }
};

export default hobbyReducer;
