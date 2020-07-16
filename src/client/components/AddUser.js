//dependencies
import { Component } from "react";
import { connect } from "react-redux";
import bcrypt from "bcryptjs";
import BCRYPT_SALT from "../../common/bcryptSalt";

// material UI
import Paper from "material-ui/Paper";
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";

// action
import {
    handleAddNewUser
} from "../actions/usersListActions";

//State Selectors
import {
    getIsNewUserAdding,
    getAddUserErrorMessage
} from "../reducers";


class AddUser extends Component {
    state = {
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
        description: ""
    }

    /*handles changes in the components form fields*/
    handleFieldChange(stateKey, value) {
        this.setState({
            [stateKey]: value
        });
    }

    componentWillReceiveProps(nextProps) {
        // just finished to submit
        if (this.props.isNewUserAdding === true && nextProps.isNewUserAdding === false) {
            if(nextProps.addUserErrorMessage === "") {
                this.props.history.push("/usersList");
            }
        }      
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleSubmit() {
        const firstNameOK = this.state.firstName !== "";
        const lastNameOK = this.state.lastName !== "";
        const emailOK = this.state.email !== "";
        const emailValid = this.validateEmail(this.state.email);
        const passwordOK = this.state.password !== "";
        const valid = firstNameOK && lastNameOK && emailOK && emailValid && passwordOK;
        this.setState({
            firstNameError: firstNameOK ? "" : "First Name is mandatory",
            lastNameError: lastNameOK ? "" : "Last Name is mandatory",
            emailError: (emailOK && emailValid) ? "" : (emailOK ? "Email is invalid":"Email is mandatory"),
            passwordError: passwordOK ? "" : "Password is mandatory"
        });
        if (valid) {
            // *** encrypt password ***
            const passwordHash = bcrypt.hashSync(this.state.password, BCRYPT_SALT);
            this.props.handleAddNewUser({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                password: passwordHash,
                description: this.state.description
            });
        }

    }

    handleCancel() {
        this.props.history.push("/usersList");
    }


    render() {

        const { firstName, firstNameError, lastName, lastNameError, email, emailError, password, passwordError, description } = this.state;

        const style = {
            paper: {
                borderRadius: 50,
                height: 400,
                width: 500,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                position: "fixed",
                top: "50%",
                left: "50%",
                marginTop: -200,
                marginLeft: -250
            },
            card: {
                marginTop: 10
            },
            textField: {
                width: 300,
            },
            header: {
                fontWeight: "bold",
                fontSize: 18
            },
            errorLabel: {
                fontWeight: "bold",
                fontSize: 16,
                color:"red"
            },
            centeredDiv: {
                margin:"auto"
            }
        };

        return (<Paper zDepth={5} style={style.paper}>
            <Card style={style.card}>
                <CardHeader>
                    <div style={style.centeredDiv}>
                        <label style={style.header}>Add New User</label>  
                        </div>  
                        </CardHeader>      
                <CardText>
                    <TextField style={style.textField}
                    id="txtFirstName"
                        errorText={firstNameError}
                        hintText="First Name"
                        floatingLabelText="First Name"
                        onChange={(event, newValue) => this.handleFieldChange("firstName", newValue)}
                        value={firstName}
                        type="text"
                    />
                    <br />

                    <TextField style={style.textField}
                        hintText="Last Name"
                        errorText={lastNameError}
                        floatingLabelText="Last Name"
                        onChange={(event, newValue) => this.handleFieldChange("lastName", newValue)}
                        value={lastName}
                        type="text"
                    />
                    <br />

                    <TextField style={style.textField}
                        errorText={emailError}
                        hintText="Email"
                        floatingLabelText="Email"
                        onChange={(event, newValue) => this.handleFieldChange("email", newValue)}
                        value={email}
                        type="text"
                    />
                    <br />

                    <TextField style={style.textField}
                        hintText="Password"
                        errorText={passwordError}
                        floatingLabelText="Password"
                        onChange={(event, newValue) => this.handleFieldChange("password", newValue)}
                        value={password}
                        type="password"
                    />
                    <br />

                    <TextField style={style.textField}
                        hintText="Description"
                        multiLine={true}
                        rows={5}
                        floatingLabelText="Description"
                        onChange={(event, newValue) => this.handleFieldChange("description", newValue)}
                        value={description}
                        type="text"
                    />
                    <br />
                    {
                        this.props.isNewUserAdding === false ? 
                        <div><RaisedButton label="Submit" onClick={() => this.handleSubmit()} primary={true} />
                        <RaisedButton style={{marginLeft:"15px"}} label="Cancel" onClick={() => this.handleCancel()} /></div> : <CircularProgress />
                    }   
                    <br/>
                    {
                        this.props.addUserErrorMessage!=="" && <label style={style.errorLabel}>{this.props.addUserErrorMessage}</label>       
                    }
                </CardText>
            </Card>
        </Paper>);
    }

}

const mapStateToProps = state => ({
    isNewUserAdding: getIsNewUserAdding(state),
    addUserErrorMessage: getAddUserErrorMessage(state)
});

export default connect(mapStateToProps, {
    handleAddNewUser
})(AddUser);