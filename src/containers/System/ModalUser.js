import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import { EmitHint } from 'typescript';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listToEmitter(); //Func lắng nghe emitter từ publisher. Hàm này nằm trong contructor để Mount vào component
    }

    listToEmitter = () => {
        emitter.on('EVENT_CLEAR_INPUT_DATA', () => {
            this.state = {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            }
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }

    checkValidInputData = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(arrInput[i] + ' input parameter is not valid !!!');
                break;
            }
        }
        return isValid;
    }

    handleClickAddNew = () => {
        let isValid = this.checkValidInputData();
        if (isValid) {
            this.props.createNewUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size='lg'
                centered={true}
            >
                <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type='email'
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                value={this.state.email}
                            >
                            </input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type='password'
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                value={this.state.password}
                            >
                            </input>
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                value={this.state.firstName}
                            >
                            </input>
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                value={this.state.lastName}
                            >
                            </input>
                        </div>
                        <div className='input-container input-max-width'>
                            <label>Address</label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                value={this.state.address}
                            >
                            </input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => this.handleClickAddNew()}>Add new</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => this.toggle()}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
