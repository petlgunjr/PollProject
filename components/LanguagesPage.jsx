import * as React from "react";
import * as axios from "axios";
import LanguagesList from "./LanguagesList"
import LanguagesForm from "./LanguagesForm"

export default class LanguagesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { adding: false, newLanguages: [] }
        this.props = props;
        this.onChange = this.onChange.bind(this);
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onIncrement(language, count) {
        axios.put(`/api/languages/${language}`, {language,count:count + 1})
        this.setState({adding:true});
    }

    onDecrement(language, count) {
        axios.put(`/api/languages/${language}`, {language,count:count - 1})
        this.setState({adding:true});
    }

    onChange(target) {
        var newLanguage = {...this.state.newLanguages};
        newLanguage[target.name] = target.value;
        this.setState( {newLanguages: newLanguages });
    }

    onSave() {
        axios.post("/api/languages/", this.state.newLanguages)
        .then ( () => this.load() )
        .then(
            this.setState({ newLanguages: {}, adding: false})
        ).catch(
            //todo: set an error condition
        )
    }

    onCancel() {
        this.setState({ newLanguages: {}, adding: false});
    }

    componentDidMount() {
        this.load();
    }

    async load() {
        var response = await axios.get("/api/languages");
        this.setState({ newLanguages: response.data });
    }

    render() {
        return (
            <div>
                {this.state.adding && <LanguagesForm languages={this.state.newLanguages} onChange={this.onChange} onSave={this.onSave} onReset={this.onCancel} /> }
                {this.state.newLanguages && this.state.newLanguages.length && <LanguagesList languages={this.state.newLanguages} onIncrement={this.onIncrement} onDecrement={this.onDecrement}/> }
            </div>
        )
    }
}
