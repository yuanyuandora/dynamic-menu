import React, {Component, Fragment} from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import Button from "./button/button";
import styles from './styles/main.scss';
import data from "./data/data.json";
import Form from "./form/form";

//Redux
const SHOW_CONTENT = 'SHOW_CONTENT';
const SHOW_FORM = 'SHOW_FORM';
const CANCEL_SUBMISSION = 'CANCEL_SUBMISSION';
//actions
const showContent = (content) => {
    return {
        type: SHOW_CONTENT,
        content: content
    }
};
const showForm = (fields) => {
    return {
        type: SHOW_FORM,
        fields: fields
    }
};
const cancelSubmission = () => {
    return {
        type: CANCEL_SUBMISSION,
    }
};

const INITIAL_CONTENT = "Home";
//Reducer
const appReducer = (state = {content: INITIAL_CONTENT, fields: []}, action) => {
    switch (action.type) {
        case SHOW_FORM:
            return {
                content: state.content,
                fields: action.fields
            };
        case SHOW_CONTENT:
            return {
                content: action.content,
                // fields: state.fields
                fields: []
            };
        case CANCEL_SUBMISSION:
            return {
                content: INITIAL_CONTENT, //@todo: change this to return to previous page content
                fields: []
            };
        default:
            return state;
    }
};
const store = createStore(appReducer);

//React
class App extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { //Managing state in redux instead
        //     // content: ""
        // }
    }

    render() {
        let menu = [];

        for (const [i, item] of Object.entries(data.children)) {
            menu.push(<li key={i}><Button buttonProps={item} displayContent={this.props.displayContent}
                                          displayForm={this.props.displayForm}/></li>);
        }

        return (
            <Fragment>
                <header>
                    <nav>
                        <ul>{menu}</ul>
                    </nav>
                </header>
                <section>
                    {this.props.content.length > 0 &&
                    <h2>
                        {this.props.content}
                    </h2>
                    }
                    {
                        this.props.fields.length > 0 &&
                        <Form fields={this.props.fields} cancelSubmission={this.props.cancelSubmission}/>
                    }

                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
    // return {
    //     content: state.content,
    //     fields: state.fields
    // };
};

const mapDispatchToProps = (dispatch) => {
    return {
        displayContent: (content) => { //functions in prop
            dispatch(showContent(content));  //dispatch actions
        },
        displayForm: (fields) => { //functions in prop
            dispatch(showForm(fields));  //dispatch actions
        },
        cancelSubmission: () => {
            dispatch(cancelSubmission());
        }
    }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container/>
            </Provider>
        )

    }
}

export default AppWrapper;