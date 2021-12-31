import React, { Component } from 'react'
import AuthorService from '../../services/AuthorService';

class UpdateAuthorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            birthDate: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeBirthDateHandler = this.changeBirthDateHandler.bind(this);
        this.updateAuthor = this.updateAuthor.bind(this);
    }

    componentDidMount(){
        AuthorService.getAuthorById(this.state.id).then( (res) =>{
            let author = res.data;
            this.setState({firstName: author.firstName,
                lastName: author.lastName,
                birthDate : author.birthDate
            });
        });
    }

    updateAuthor = (e) => {
        e.preventDefault();
        let author = {firstName: this.state.firstName, lastName: this.state.lastName, birthDate: this.state.birthDate};
        console.log('author => ' + JSON.stringify(author));
        console.log('id => ' + JSON.stringify(this.state.id));
        AuthorService.updateAuthor(author, this.state.id).then( res => {
            this.props.history.push('/authors');
        });
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeBirthDateHandler= (event) => {
        this.setState({birthDate: event.target.value});
    }

    cancel(){
        this.props.history.push('/authors');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update author</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Birth date: </label>
                                            <input placeholder="Birth date" name="birthDate" className="form-control" 
                                                value={this.state.birthDate} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateAuthor}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateAuthorComponent
