import React from 'react';
import styles from './button.scss'

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonStyle: styles.button
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        switch (this.props.buttonProps.type) {
            case "form":
                this.setState({
                    buttonStyle: this.state.buttonStyle + (" active-button form-button")
                });
                break;
            case "nested":
                this.setState({
                    buttonStyle: this.state.buttonStyle + (" active-button nested-button")
                });
                break;
            case "placeholder":
                this.setState({
                    buttonStyle: this.state.buttonStyle + (" inactive-button")
                });
                break;
        }
    }

    handleClick() {
        switch (this.props.buttonProps.type) {
            case "form":
                this.props.showForm(this.props.buttonProps.formFields, this.props.parentMenuData);

                break;
            case "nested":
                if (this.props.buttonProps.children && this.props.buttonProps.children.length > 0) {
                    this.props.showMenu(this.props.buttonProps.children);
                }
                break;
            case "placeholder":
                this.props.showMessage("Coming Soon...");

                break;
        }

    }

    render() {
        return (
            <button className={this.state.buttonStyle} onClick={this.handleClick}>{this.props.buttonProps.name}</button>
        );
    }
}

export default Button;
