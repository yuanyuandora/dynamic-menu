import React from 'react';
import styles from './button.scss'

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subMenu: [],
            openSubMenu: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        switch (this.props.buttonProps.type) {
            case "form":
                this.props.showForm(this.props.buttonProps.formFields, this.props.parentMenuData);
                break;
            case "nested":
                if (this.props.buttonProps.children && this.props.buttonProps.children.length > 0) {
                    // this.setState({
                    //     subMenu: this.showSubMenu(this.props.buttonProps.children)
                    // });
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
            <button className={styles.button} onClick={this.handleClick}>{this.props.buttonProps.name}</button>
        );
    }
}

export default Button;
