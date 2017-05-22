import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeReset, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }
    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }
    componentWillUnmount() {
        this.props.employeeReset();
    }
    onButtonPress = () => {
        const { name, phone, shift } = this.props;
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    }
    onTextPress = () => {
        const { phone, shift } = this.props;
        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }
    onConfirmAccept = () => {
        this.props.employeeDelete(this.props.employee.uid);
        this.setState({ showModal: false });
    }
    onConfirmDecline = () => {
        this.setState({ showModal: false });
    }
    render() {
        return (
            <Card>
                <EmployeeForm />
                <CardSection>
                    <Button onPress={this.onButtonPress}>
                        Save changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress}>
                        Text schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.setState({ showModal: true })}>
                        Fire employee
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onConfirmAccept}
                    onDecline={this.onConfirmDecline}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </Card>
        )
    }
};

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };
}

export default connect(mapStateToProps, {
    employeeUpdate,
    employeeSave,
    employeeReset,
    employeeDelete
})(EmployeeEdit);