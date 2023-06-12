import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { FormattedMessage } from 'react-intl';
import './ManageDoctor.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';



// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]



class TableManagerUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            selectDoctorList: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            let doctorList = this.buildDataInputSelect(this.props.allDoctorsRedux)
            this.setState({
                selectDoctorList: doctorList,
            })
        }

        if (prevProps.language !== this.props.language) {
            let doctorList = this.buildDataInputSelect(this.props.allDoctorsRedux)
            this.setState({
                selectDoctorList: doctorList,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown = () => {
        console.log('check this state of ManageDoctor:', this.state)
        this.props.createInforDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value
        })
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    buildDataInputSelect = (inputDataArr) => {
        let result = [];

        if (inputDataArr && inputDataArr.length > 0) {
            inputDataArr.map((item, index) => {
                let obj = {};
                let labelEn = `${item.firstName} ${item.lastName}`;
                let labelVi = `${item.lastName} ${item.firstName}`;

                obj.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            })
        }

        return result;
    }

    render() {

        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tao them thong tin doctors
                </div>

                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chon bac sy</label>

                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.selectDoctorList}
                        />
                    </div>

                    <div className='content-right'>
                        <label>Thong tin gioi thieu</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
                            adfasfwrqwrqwrrqr          AREA TEXT
                        </textarea>
                    </div>
                </div>

                <div>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>

                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className='save-content-doctor'
                >
                    Luu thong tin
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctorsRedux: state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
        createInforDoctorRedux: (data) => dispatch(actions.createInforDoctorStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
