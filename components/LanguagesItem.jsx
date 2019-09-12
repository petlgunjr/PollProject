import * as React from "react";

export default (props) =>
(
    <li>
        <div>Language: {props.language}</div>
        <div>Count: {props.count}</div>
        <button onClick={() => props.onIncrement(props.language, props.count)}>
            Increment
        </button>
        <button onClick={() => props.onDecrament(props.language, props.count)}>
            Decrement
        </button>
    </li>
)
