import * as React from "react";

export default (props) => (
  <div>
    <table>
      <thead>
        <tr>
          <td>Language</td>
          <td>Count</td>
        </tr>
      </thead>
      <tbody>
        {props.languages.map((currLang, i) =>
          <tr key={i}>
            <td>{currLang.language}</td>
            <td>{currLang.count}</td>
          </tr>
        )}
      </tbody>
    </table>
    <button onClick={props.onCloseReport}>
        Close Report
    </button>
  </div>
)