import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Form from '../form/form';
import Button from "../button/button";

const formFields = [
    {
        "type": "text",
        "name": "username",
        "label": "Username"
    },
    {
        "type": "password",
        "name": "password",
        "label": "Password"
    },
    {
        "type": "email",
        "name": "email",
        "label": "Email"
    },
    {
        "type": "dropdown",
        "name": "state",
        "options":[
            "ACT","NSW","NT","QLD","SA","TAS","VIC","WA"
        ],
        "label": "State"
    }
];

const baseProps = {
    "cancelSubmission": jest.fn(),
    "parentMenuData": []
};

const formWrapper = mount(<Form formFields={formFields} cancelSubmission={baseProps.cancelSubmission}
parentMenuData={baseProps.parentMenuData}/>);

describe('Form Test Suite', () => {
    it('Renders a form', () => {
        expect(formWrapper.find(Form).length).toEqual(1);//renders a form component
    });

    it('Contains fields', () => {
        expect(formWrapper.find('input').length).toEqual(4);//username, password, email text input fields and a submit input field
        expect(formWrapper.find('button').length).toEqual(1);//contains a cancel button
        expect(formWrapper.find('button').text()).toEqual("Cancel");//cancel button text
        expect(formWrapper.find('select').length).toEqual(1);//contains a dropdown field
        expect(formWrapper.find('select').find('option').length).toEqual(8); //dropdown has 8 fields
    });

    // it('Submit a form', ()=> { //not testing the form submission as currently the submission only goes to an imaginary end point
    //     formWrapper.find('form').simulate('submit');
    // });

    it('Clicking the Cancel button calls the cancel submission event', () => {
        formWrapper.find('button[children="Cancel"]').simulate('click');
        expect(baseProps.cancelSubmission).toHaveBeenCalled();
    });


});