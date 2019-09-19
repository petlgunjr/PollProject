import * as React from "react";
import LanguagesItem from "./LanguagesItem";


export default (props) =>
    (
        <tbody>
            { props.languages.map( (currLanguage, i) => (
                <LanguagesItem
                    language={currLanguage.language}
                    key={i}
                    onIncrement={props.onIncrement}
                    onDecrament={props.onDecrament}
                    onRemove={props.onDeleteLang}
                    count={currLanguage.count}
                />
            ))}
        </tbody>
    )
