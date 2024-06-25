import React from "react";
import { useSelector } from "react-redux";

function Test(props) {
    const hobbyList = useSelector((state) => state.hobby.qty);
    console.log(hobbyList);

    return (
        <ul className="test">
           kiiiii
        </ul>
    );
}

export default Test;
