import * as React from "react";
import LanguagesItem from "./LanguagesItem";

export default (props) =>
    (
        
        <ul>
            {props.languages.map( (currLanguage, i) => <LanguagesItem language={currLanguage.language} count={currLanguage.count} key={i} onIncrement={props.onIncrement} onDecrament={props.onDecrament}/>)}
        </ul>
    )
