import React from 'react';
import styles from './form.scss'

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCancel() {
        this.props.cancelSubmission(this.props.parentMenuData);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // console.log(data.get("username"));//how to retrieve each field input on the server side
        // console.log(data.get("password"));
        // console.log(data.get("state"));

        fetch('/api/some-endpoint', {
            method: 'POST',
            body: data,
        });
    }

    render () {
        let fields = [];
        if (this.props.formFields && this.props.formFields.length > 0) {
            for (const [i, item] of Object.entries(this.props.formFields)) {
                switch(item.type){
                    case "text":
                    case "password":
                    case "email":
                        fields.push(<div key={"field-" + i}><label>{item.label}</label><input type={item.type} name={item.name} placeholder={item.name}/></div>);
                        break;
                    case "dropdown":
                        let options = item.options.map((o, index)=>(
                            <option key={"option-" + index}>{o}</option>
                        ));
                        fields.push(<div key={"field-" + i}><label>{item.label}</label><select name={item.name}>{options}</select></div>);
                        break;
                    default:
                        break;
                }
            }
        }
        return (
            <form className={styles.form} onSubmit={this.handleSubmit}>
                {fields}
                <input type="submit" />
                <button type="button" onClick={this.handleCancel}>Cancel</button>
            </form>
        );
    }
}

export default Form;
