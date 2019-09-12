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
        this.onSave = this.onSave.bind(this);
        this.onShowAdd = this.onShowAdd.bind(this);
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

    onSave() {
        axios.post("/api/languages/", this.state.newLanguage)
        .then ( () => this.load() )
        .then(
            this.setState({ newLanguage: getNewLang(), adding: false})
        ).catch(
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

    async load() {
        var response = await axios.get("/api/languages");
        this.setState({ languages: response.data });
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
                    /> 
                }
            </div>
        )
    }
}
