import * as React from "react";
import * as axios from "axios";
import LanguagesList from "./LanguagesList"
import LanguagesForm from "./LanguagesForm"

const getNewLang = () => ({language: "", count: 0});

export default class LanguagesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { adding: false, languages: [], newLanguage: getNewLang() };
        this.props = props;
        this.onChange = this.onChange.bind(this);
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrament = this.onDecrament.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onShowAdd = this.onShowAdd.bind(this);
        this.sortItems = this.sortIems.bind(this);
    }

    clearBox(id) {
        document.getElementById(id).value = "";
    }

    onIncrement(language, count) {
        axios.put(`/api/languages/${language}`, {language,count:count + 1})
            .then(() => this.load());
    }

    onDecrament(language, count) {
        axios.put(`/api/languages/${language}`, {language,count:count - 1})
            .then(() => this.load());
    }

    onChange(target) {
        let newLanguage = {...this.state.newLanguage};
        newLanguage[target.name] = target.value;
        this.setState( {newLanguage: newLanguage} );
    }

    onRemove(language) {
        axios.delete(`/api/languages/${language}`)
            .then(() => this.load())
    }

    onSave() {
        axios.post("/api/languages/", this.state.newLanguage)
        .then ( () => this.load() )
        .then(this.setState({ newLanguage: getNewLang(), adding: false}))
        .then(document.getElementById("addButt").value = "")
        .catch(
            //todo: set an error condition
        )
    }

    onShowAdd() {
        this.setState({ adding: !this.state.adding ? true : false });
    }

    onCancel() {
        this.setState({ newLanguage: getNewLang(), adding: false});
    }
    
    componentDidMount() {
        this.load();
    }

    sortIems(target) {
        return target.sort((a, b) => {
        if (a.language.toUpperCase() < b.language.toUpperCase()) { return -1; };
        if (a.language.toUpperCase() > b.language.toUpperCase()) { return 1; };
        return 0;
        })
    }

    async load() {
        let response = await axios.get("/api/languages");
        this.setState({ languages: this.sortItems(response.data) });
    }

    render() {
        return (
            <div>
                {this.state.adding && 
                    <LanguagesForm 
                        languages={this.state.newLanguage.language} 
                        onChange={this.onChange} 
                        onSave={this.onSave} 
                        onReset={this.onCancel} /> 
                }
                <button onClick={() => this.onShowAdd()}>
                    Add Language
                </button>
                {this.state.languages && 
                this.state.languages.length && 
                    <LanguagesList 
                        languages={this.state.languages} 
                        onIncrement={this.onIncrement} 
                        onDecrament={this.onDecrament}
                        onRemove={this.onRemove}
                    /> 
                }
                {this.state.languages.length <= 0 &&
                    <h1>There are no items to display!!</h1>
                }
            </div>
        )
    }
}
