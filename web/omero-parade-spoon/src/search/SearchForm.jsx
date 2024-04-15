import React from 'react';
import ReactDOM from 'react-dom';

import config from '../config';

class SearchForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        let url= config.indexUrl + "search/?query=" + this.state.text;
        $.getJSON(url,
            data => {
                this.props.setSearchResults(data.data);
            }
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Search</h2>
                <input
                    onChange={this.handleChange}
                    name="search_query"
                    placeholder="Search for Images"
                />
                <button>Search</button>
            </form>
        )
    }
}

export default SearchForm
