import * as React from "react";

export default (props) =>
(
    <li>
        <div>Language: {props.language}</div>
        <div>Count: {props.count}</div>
        <button onClick={() => props.onAdd(props.language, props.count)}>
            Add
        </button>
    </li>
)
