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
const SHOW_MESSAGE = 'SHOW_MESSAGE';

//actions
const showMenu = (menuData) => {
    return {
        type: SHOW_MENU,
        menuData: menuData //menu data
    }
};
const showForm = (formFields, parentMenuData) => {
    return {
        type: SHOW_FORM,
        formFields: formFields,
        parentMenuData: parentMenuData
    }
};
const cancelSubmission = (parentMenuData) => {
    return {
        type: CANCEL_SUBMISSION,
        parentMenuData: parentMenuData
    }
};
const showMessage = (message) => {
    return {
        type: SHOW_MESSAGE,
        message: message
    }
};

// const INITIAL_CONTENT = "Home";
const INITIAL_DATA = data.children;
//Reducer
export const appReducer = (state = {menuData: INITIAL_DATA, formFields: []}, action) => {
    switch (action.type) {
        case SHOW_FORM:
            return {
                menuData: [],
                formFields: action.formFields,
                parentMenuData: action.parentMenuData,
                message: ""
            };
        case SHOW_MENU:
            return {
                menuData: action.menuData,
                formFields: [],
                message: ""
            };
        case CANCEL_SUBMISSION:
            return {
                menuData: action.parentMenuData, //return to previous clicked menu
                formFields: [],
                message: ""
            };
        case SHOW_MESSAGE:
            return {
                menuData: state.menuData,
                formFields: [],
                message: action.message,
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

        if (this.props.menuData && this.props.menuData.length > 0) {
            for (const [i, item] of Object.entries(this.props.menuData)) {
                menu.push(<li key={"button-" + i}><Button buttonProps={item} showMenu={this.props.showMenu}
                                              showForm={this.props.showForm} parentMenuData={this.props.menuData} showMessage={this.props.showMessage}/>
                </li>);
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


                {
                    this.props.formFields.length > 0 &&
                    <section>
                        <Form formFields={this.props.formFields} cancelSubmission={this.props.cancelSubmission}
                              parentMenuData={this.props.parentMenuData}/>
                    </section>
                }

                {
                    this.props.message &&
                        <section className="message">
                            {this.props.message}
                        </section>
                }



            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        showMenu: (menuData) => {
            dispatch(showMenu(menuData));
        },
        showForm: (formFields, parentMenuData) => {
            dispatch(showForm(formFields, parentMenuData));
        },
        cancelSubmission: (parentMenuData) => {
            dispatch(cancelSubmission(parentMenuData));
        },
        showMessage: (message)=>{
            dispatch(showMessage(message));
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