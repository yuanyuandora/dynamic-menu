import React, {Component, Fragment} from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import Button from "./button/button";
import styles from './styles/main.scss';
import data from "./data/data.json";
import Form from "./form/form";

//Redux
const SHOW_MENU = 'SHOW_MENU';
const SHOW_FORM = 'SHOW_FORM';
const CANCEL_SUBMISSION = 'CANCEL_SUBMISSION';

//actions
const showMenu = (data) => {
    return {
        type: SHOW_MENU,
        data: data //menu data
    }
};
const showForm = (fields, parentData) => {
    return {
        type: SHOW_FORM,
        fields: fields,
        parentData: parentData
    }
};
const cancelSubmission = (parentData) => {
    return {
        type: CANCEL_SUBMISSION,
        parentData: parentData
    }
};

// const INITIAL_CONTENT = "Home";
const INITIAL_DATA = data.children;
//Reducer
const appReducer = (state = {data: INITIAL_DATA, fields: []}, action, parentData = {}) => {
    switch (action.type) {
        case SHOW_FORM:
            return {
                data: [], //menu data
                fields: action.fields, //form fields
                parentData: action.parentData
            };
        case SHOW_MENU:
            return {
                data: action.data,
                fields: []
            };
        case CANCEL_SUBMISSION:
            console.log(action.parentData);
            return {
                data: action.parentData, //return to previous clicked menu
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

        if (this.props.data && this.props.data.length > 0) {
            for (const [i, item] of Object.entries(this.props.data)) {
                menu.push(<li key={i}><Button buttonProps={item} showMenu={this.props.showMenu}
                                              showForm={this.props.showForm} parentData={this.props.data}/></li>);
            }
        }

        return (
            <Fragment>
                {
                    menu.length > 0 &&
                    <nav>
                        <ul>{menu}</ul>
                    </nav>
                }

                <section>

                    {
                        this.props.fields.length > 0 &&
                        <Form fields={this.props.fields} cancelSubmission={this.props.cancelSubmission} parentData={this.props.parentData}/>
                    }

                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        showMenu: (data) => {
            dispatch(showMenu(data));
        },
        showForm: (fields, parentData) => {
            dispatch(showForm(fields, parentData));
        },
        cancelSubmission: (parentData) => {
            dispatch(cancelSubmission(parentData));
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