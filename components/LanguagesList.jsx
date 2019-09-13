import * as React from "react";
import LanguagesItem from "./LanguagesItem";

export default (props) =>
    (        
        <table>
            {props.languages.map( (currLanguage, i) => (
                <LanguagesItem 
                    language={currLanguage.language}  
                    key={i} 
                    onIncrement={props.onIncrement} 
                    onDecrament={props.onDecrament}
                    onRemove={props.onRemove}
                    count={currLanguage.count}
                />
            ))}
        </table>
    )
