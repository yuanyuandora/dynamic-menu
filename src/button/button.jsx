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
        // if (this.props.buttonProps.content) {
        //     this.props.displayContent(this.props.buttonProps.content);
        // } else this.props.displayContent("Coming Soon...");

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

    showSubMenu(subMenus) {
        let subMenu = [];
        for (const [i, item] of Object.entries(subMenus)) {
            subMenu.push(<li key={i}><Button buttonProps={item} showForm={this.props.showForm}
                                             showMenu={this.props.showMenu}  parentMenuData={this.props.menuData} showMessage={this.props.showMessage}/></li>);
        }
        return subMenu;
    }

    render() {
        return (
            <div>
                <button className={styles.button} onClick={this.handleClick}>{this.props.buttonProps.name}</button>
                {/*<ul>
                    {this.state.subMenu}
                </ul>*/}
            </div>
        );
    }
}

export default Button;
