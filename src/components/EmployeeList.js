import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import EmployeeListItem from './EmployeeListItem';

import { employeesFetch, removeEventEmployeesFetch } from '../actions';

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.createDataSource(this.props);
    }
    componentDidMount() {
        this.props.employeesFetch();
    }
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }
    componentWillUnmount() {
        this.props.removeEventEmployeesFetch();
    }

    createDataSource({ employees }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(employees);
    }
    renderRow(employee) {
        return <EmployeeListItem employee={employee} />;
    }
    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    });
    return { employees };
};

export default connect(mapStateToProps, {
    employeesFetch,
    removeEventEmployeesFetch
})(EmployeeList);