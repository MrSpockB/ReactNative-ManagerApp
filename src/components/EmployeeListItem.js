import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

class EmployeeListItem extends Component {

    onRowPress = () => {
        Actions.employeeEdit({ employee: this.props.employee });
    }

    render() {
        const { name } = this.props.employee;
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {name}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default EmployeeListItem;