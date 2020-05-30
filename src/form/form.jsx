import React from 'react';
import styles from './form.scss'

class Form extends React.Component {
    constructor(props) {
        super(props);

        //console.log(props.fields);

        this.state = {

        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCancel() {
        this.props.cancelSubmission();
    }

    handleSubmit() {

    }

    render () {
        return (
            <form className={styles.form}>
                <input type="submit" onClick={this.handleSubmit}/>
                <button type="button" onClick={this.handleCancel}>Cancel</button>
            </form>
        );
    }
}

export default Form;
