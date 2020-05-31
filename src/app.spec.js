// describe('Root App Test Suite', () => {
//     it('My Test Case', () => {
//         expect(true).toEqual(true);
//     });
// });
import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

import AppWrapper, {appReducer} from './App';
import Button from './button/button';

const formFields = [
    {
        "type": "email",
        "name": "email",
        "label": "Email"
    },
    {
        "type": "text",
        "name": "username",
        "label": "Username"
    },
    {
        "type": "password",
        "name": "password",
        "label": "Password"
    }
];

const menuData = [
    {
        "type": "placeholder",
        "name": "Menu Item 1"
    },
    {
        "type": "form",
        "name": "Menu Item 2",
        "formFields": [
            {
                "type": "text",
                "name": "username",
                "label": "Username"
            },
            {
                "type": "password",
                "name": "password",
                "label": "Password"
            }]
    }
];

const message = "Coming Soon...";


describe('Root App', () => {
    describe('Reducer', () => {
        it('should set the form fields and parent menu items for going back', () => {
            const state = {menuData: [], formFields: []};

            const newState = appReducer(state, {
                type: 'SHOW_FORM',
                formFields: formFields,
                parentMenuData: menuData
            });
            //
            expect(newState).toEqual({
                menuData: [],
                formFields: formFields,
                parentMenuData: menuData,
                message: ""
            });
        });

        it('should set the menu items', () => {
            const state = {menuData: [], formFields: []};

            const newState = appReducer(state, {
                type: 'SHOW_MENU',
                menuData: menuData //menu data
            });
            //
            expect(newState).toEqual({
                menuData: menuData,
                // parentMenuData: action.parentMenuData,
                formFields: [],
                message: ""
            });
        });

        it('should go back to previous menu when cancelling submission', () => {
            const state = {menuData: [], formFields: []};

            const newState = appReducer(state, {
                type: 'CANCEL_SUBMISSION',
                parentMenuData: menuData //menu data
            });
            //
            expect(newState).toEqual({
                menuData: menuData, //return to previous clicked menu
                formFields: [],
                message: ""
            });
        });

        it('should show message', () => {
            const state = {menuData: menuData, formFields: []};

            const newState = appReducer(state, {
                type: 'SHOW_MESSAGE',
                message: message //menu data
            });
            //
            expect(newState).toEqual({
                menuData: state.menuData,
                // parentMenuData: action.parentMenuData,
                formFields: [],
                message: message
            });
        });
    });

    it('renders the Buttons', () => {
        const wrapper = mount(< AppWrapper / >);
        expect(wrapper.find(Button).length).toBeGreaterThanOrEqual(1);
        wrapper.unmount();
    });

    it('clicking the placeholder button should display a message', () => {
        const wrapper = mount(< AppWrapper / >);
        if (wrapper.find('button.inactive-button').length>0) {
            wrapper.find('button.inactive-button').first().simulate('click');
            expect(wrapper.find('.message').length).toEqual(1);
            expect(wrapper.find('button').length).toBeGreaterThanOrEqual(1);
            expect(wrapper.find('form').length).toEqual(0);
        }
        wrapper.unmount();
    });

    it('clicking the nested button should display sub buttons', () => {
        const wrapper = mount(< AppWrapper / >);
        if (wrapper.find('button.nested-button').length>0) {
            wrapper.find('button.nested-button').first().simulate('click');
            expect(wrapper.find('.message').length).toEqual(0);
            expect(wrapper.find('button').length).toBeGreaterThanOrEqual(1);
            expect(wrapper.find('form').length).toEqual(0);
        }
        wrapper.unmount();
    });

    it('clicking the form button should display a form', () => {
        const wrapper = mount(< AppWrapper / >);
        if (wrapper.find('button.form-button').length>0) {
        wrapper.find('button.form-button').first().simulate('click');
            expect(wrapper.find('.message').length).toEqual(0);
            expect(wrapper.find('button').length).toEqual(1);//form has 1 submit button
            expect(wrapper.find('form').length).toEqual(1);
        }
    });

});
