import * as React from "react";
import * as axios from "axios";
import LanguagesList from "./LanguagesList"
import LanguagesForm from "./LanguagesForm";

const getNewLang = () => ({language: "", count: 0});

export default class LanguagesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adding: false,
            languages: [],
            newLanguage: getNewLang(),
            showSearchButton: true
        };
        this.props = props;
        this.onChange = this.onChange.bind(this);
        this.filter = this.filter.bind(this);
        this.getView = this.getView.bind(this);
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrament = this.onDecrament.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onShowAdd = this.onShowAdd.bind(this);
        this.compare = this.compare.bind(this);
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

    onChange(e) {
        let newLang = {...this.state.newLanguage};
        newLang.language = e.target.value;
        this.setState({
            newLanguage: newLang,
            sortLangs: this.getView(this.state.languages)
        });
    }

    onRemove(language) {
        axios.delete(`/api/languages/${language}`)
            .then(() => this.load())
    }

    onSave() {
        axios.post("/api/languages/", this.state.newLanguage)
        .then ( () => this.load() )
        .then(this.setState({ newLanguage: getNewLang(), adding: false}))
        .then(this.clearBox("addButt"))
        .then(this.onShowAdd())
        .catch(() => {
            if(err) {
                alert(err);
            }
        }
            //todo: set an error condition
        )
    }

    onShowAdd() {
        this.setState({ adding: !this.state.adding ? true : false, showSearchButton: !this.state.showSearchButton ? true : false });
    }

    onReset(e) {
        e.preventDefault();
        this.props.onReset && this.props.onReset(e.target);
        this.onShowAdd();
    }
    
    componentDidMount() {
        this.load();
    }

    filter(languages) {
        return languages.language.toUpperCase().startsWith(this.state.newLanguage.language.toUpperCase());
    }

    compare(a, b) {
        if (a.language.toUpperCase() < b.language.toUpperCase()) { return -1; };
        if (a.language.toUpperCase() > b.language.toUpperCase()) { return 1; };
        return 0;
    }

    getView (languages) {
        return languages.filter(this.filter).sort(this.compare);
    }

    async load() {
        let response = await axios.get("/api/languages");
        this.setState({
            sortLangs: this.getView(response.data),
            languages: response.data
        })
    }

    render() {
        const view = this.getView(this.state.languages);
        return (
            <div>
                {this.state.adding && 
                    <LanguagesForm 
                        onChange={this.onChange}
                        onSave={this.onSave}
                        onReset={this.onReset} 
                    />
                }
                {this.state.showSearchButton && 
                    <div>
                        <button onClick={() => this.onShowAdd()}>
                            Search...
                        </button>
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                }
                {view && 
                view.length && 
                    <LanguagesList 
                        languages={view} 
                        onIncrement={this.onIncrement} 
                        onDecrament={this.onDecrament}
                        onRemove={this.onRemove}
                    /> 
                }
                {view.length <= 0 &&
                    <h1>There are no items to display!!</h1>
                }
            </div>
        )
    }
}
