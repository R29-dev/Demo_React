import React from "react";
import { useDispatch } from "react-redux";
import { addNewHobby } from "../../actions/hobby";

function Index(props) {
    const dispatch = useDispatch();

    const handleAddclick = () => {
        const newHobby = {
            new: 1
        };
        const action = addNewHobby(newHobby); // Gọi action creator để tạo action
        dispatch(action); // Dispatch action đến Redux store
    };

    return (
        <button onClick={handleAddclick}>Add</button>
    );
}

export default Index;
