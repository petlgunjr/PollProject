import * as React from "react";

export default (props) => {
    return (
        <tbody>
            <tr>
                <td>{props.language}</td>
                <td>{props.count}</td>
                <td>
                    <button onClick={() => props.onIncrement(props.language, props.count)}>
                        Increment
                    </button>
                </td>
                <td>
                    <button onClick={() => props.onDecrament(props.language, props.count)}>
                        Decrement
                    </button>
                </td>
                <td>
                    <button id="remButt" onClick={() => props.onRemove(props.language)}>
                        Remove Language
                    </button>
                </td>
            </tr>
        </tbody>
    )
}