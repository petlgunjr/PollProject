import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import * as axios from "axios";
import LanguageList from "./LanguagesList"
import LanguageForm from "./LanguageForm"
import CreateReport from "./CreateReport"

export default (props) => {
    const [language, setLanguage] = useState('');
    const [languages, setLanguages] = useState([]);
    const [numSortLanguages, setNumSortLanguages] = useState([]);
    const [showSearchButton, setShowSearchButton] = useState(true);
    const [showMainList, setShowMainList] = useState(true);
    const [showReport, setShowReport] = useState(false);
    const [showReportButton, setShowReportButton] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const filter = (languages) =>
        languages.language.toUpperCase().startsWith(language.toUpperCase());

    const sortList = (a, b) => {
        let languageA = a.language.toUpperCase();
        let languageB = b.language.toUpperCase();
        if (languageA < languageB) { return -1; }
        if (languageA > languageB) { return 1; }
        return 0;
    }

    const load = () =>
            axios.get("/api/languages")
            .then((response) => setLanguages(response.data));
            useEffect(() => {load();}, [true]);

    const onSave = () => {
        axios.post("/api/languages/", {language, count: 0 })
            .then(() => setLanguage(''))
            .then(() => load())
    }

    const onUpdate = (language) => {
        axios.put(`/api/languages/${language.language}`, language)
            .then(setLanguage(''))
            .then(() => load());
    }

    const onDelete = (language) => {
        axios.delete(`/api/languages/${language}`)
            .then(setLanguage(''))
            .then(() => load());
    }

    const onShowReport = (e) => {
        e.preventDefault();
        axios.get("/api/languages")
            .then((response) => {
                const [...data] = response.data;
                data.sort((a, b) => b.count - a.count);
                setNumSortLanguages(data);
            });

        setShowSearchButton(true);
        setShowMainList(false);
        setShowReport(true);
        setShowReportButton(false);
        setShowForm(false);
    }

    const onShowForm = () => {
        setShowForm(true);
        setShowSearchButton(false);
        setShowMainList(true);
        setShowReportButton(true);
        setLanguage('');
    }

    const onCloseReport = () => {
        setShowSearchButton(true);
        setShowMainList(true);
        setShowReport(false);
        setShowReportButton(true);
    }

    const alertDel = (language, count) => {
        if (count > 0 && confirm(`The technology you're deleting has data! Do you want to delete?`)) {
            onDelete(language);
        } else {
            onDelete(language);
        }
    }

    const view = useMemo(() => languages && languages.filter(filter).sort(sortList),
        [languages, language]);
    return (
        <div>
            {showSearchButton &&
                <div>
                    <button onClick={() => onShowForm()}>
                        Search...
                    </button>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            }
            {showReportButton &&
                <button onClick={onShowReport} >
                    Show Report
                </button>
            }
            {showReport &&
                <CreateReport onCloseReport={onCloseReport} languages={numSortLanguages} />
            }
            {showForm &&
                <LanguageForm
                    language={language}
                    onChange={(target) => setLanguage(target.value)}
                    onSave={onSave}
                    onReset={() => onShowForm}
                />
            }
            {view && view.length && showMainList &&
                <table>
                    <thead>
                        <tr>
                            <td>
                                <h3>Language</h3>
                            </td>
                            <td>
                                <h3>Count</h3>
                            </td>
                            <td>
                                <h3>Inc</h3>
                            </td>
                            <td>
                                <h3>Dec</h3>
                            </td>
                            <td>
                                <h3>Remove</h3>
                            </td>
                        </tr>
                    </thead>
                    <LanguageList
                        languages={view}
                        onIncrement={(language, count) => onUpdate({ language, count: ++count })}
                        onDecrament={(language, count) => onUpdate({ language, count: count && --count })}
                        onDeleteLang={alertDel}
                        onReset={() => setLanguage('')}
                    />
                </table>
            }
            {view <= 0 &&
                <h1>There are no items to display</h1>
            }
        </div>
    )
}