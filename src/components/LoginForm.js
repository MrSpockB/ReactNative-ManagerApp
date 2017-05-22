import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

class LoginForm extends Component {
    onEmailChange = (text) => {
        this.props.emailChanged(text);
    }
    onPasswordChange = (text) => {
        this.props.passwordChanged(text);
    }
    onLoginButtonPress = () => {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }
    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />
        }
        return (
            <Button onPress={this.onLoginButtonPress}>
                Login
            </Button>
        );
    }
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange}
                        autoCapitalize="none"
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange}
                        value={this.props.password}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const { email, password, error, loading } = state.auth;
    return { email, password, error, loading};
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);