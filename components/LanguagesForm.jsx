import * as React from "react";

export default class LanguagesForm extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onSave && this.props.onSave.call(this);
    }

    onChange(e) {
        e.preventDefault();

        this.props.onChange && this.props.onChange(e.target);
    }

    onReset(e) {
        e.preventDefault();

        this.props.onReset && this.props.onReset(e.target);
    }

    render() {
        
        return (
            
            <form onSubmit={this.onSubmit} onReset={this.onReset}>
                <input type="text" name="language" placeholder="language" value={this.props.language} onChange={this.onChange} />
                <input type="text" name="count" placeholder="count" value={this.props.count} onChange={this.onChange} />
                <input type="submit" value="Submit" />
                <input type="reset" value="Cancel" />
            </form>
        )
    }
}

