import * as React from "react";

export default class LanguagesForm extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {        
        return (            
            <form onSubmit={this.props.onSave} onReset={this.props.onReset}>
                <input id="addButt" type="text" name="language" placeholder="language" value={this.props.language} onChange={this.props.onChange} />
                <input type="submit" value="Add" />
                <input type="reset" value="Clear" />
                <br />
                <br />
                <br />
                <br />
            </form>
        )
    }
}

