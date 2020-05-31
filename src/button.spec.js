import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Button from './button/button';

const placeholderButton = {
    "type": "placeholder",
    "name": "Test Placeholder Menu Item",
};

const nestedButton = {
    "type": "nested",
    "name": "Test Nested Menu Item",
    "children": [
        {
            "type": "placeholder",
            "name": "Sub Menu Item 1"
        },
        {
            "type": "placeholder",
            "name": "Sub Menu Item 2"
        },
    ]
};

const formButton = {
    "type": "form",
    "name": "Test Form Menu Item",
    "formFields": []
};

const baseProps = {
    "showMenu": jest.fn(),
    "showForm": jest.fn(),
    "showMessage": jest.fn()
};

const placeholderButtonWrapper = mount(<Button buttonProps={placeholderButton}  showMenu={baseProps.showMenu}
showForm={baseProps.showForm} showMessage={baseProps.showMessage}/>);

const nestedButtonWrapper = mount(<Button buttonProps={nestedButton}  showMenu={baseProps.showMenu}
showForm={baseProps.showForm} showMessage={baseProps.showMessage}/>);

const formButtonWrapper = mount(<Button buttonProps={formButton}  showMenu={baseProps.showMenu}
showForm={baseProps.showForm} showMessage={baseProps.showMessage}/>);

describe('Button Test Suite', () => {
    it('Renders a button', () => {
        expect(placeholderButtonWrapper.find(Button).length).toEqual(1);//renders a Button component
        expect(placeholderButtonWrapper.find(Button).find('button').text()).toEqual('Test Placeholder Menu Item');//contains the button DOM

        expect(nestedButtonWrapper.find(Button).length).toEqual(1);//renders a Button component
        expect(nestedButtonWrapper.find(Button).find('button').text()).toEqual('Test Nested Menu Item');//contains the button DOM

        expect(formButtonWrapper.find(Button).length).toEqual(1);//renders a Button component
        expect(formButtonWrapper.find(Button).find('button').text()).toEqual('Test Form Menu Item');//contains the button DOM
    });

    it('On clicking the placeholder button triggers a show message event', () => {
        placeholderButtonWrapper.find(Button).simulate('click');
        expect(baseProps.showMessage).toHaveBeenCalled(); //clicking on a placeholder button should trigger a show message function
        expect(baseProps.showMenu).not.toHaveBeenCalled();//and nothing else
        expect(baseProps.showForm).not.toHaveBeenCalled();

        baseProps.showMessage.mockClear(); //reset
    });

    it('On clicking the nested button triggers a show menu event', () => {
        nestedButtonWrapper.find(Button).simulate('click');
        expect(baseProps.showMenu).toHaveBeenCalled();//clicking on a nested button should trigger a show menu function
        expect(baseProps.showMessage).not.toHaveBeenCalled();//and nothing else
        expect(baseProps.showForm).not.toHaveBeenCalled();

        baseProps.showMenu.mockClear(); //reset
    });

    it('On clicking the form button triggers a show form event', () => {
        formButtonWrapper.find(Button).simulate('click');
        expect(baseProps.showForm).toHaveBeenCalled();//clicking on a form button should trigger a show form function
        expect(baseProps.showMessage).not.toHaveBeenCalled();//and nothing else
        expect(baseProps.showMenu).not.toHaveBeenCalled();

        baseProps.showForm.mockClear(); //reset
    });


});
