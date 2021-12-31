import React, { Component } from 'react'
import AuthorService from '../../services/AuthorService';

class CreateAuthorComponent extends Component {
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
        this.saveOrUpdateAuthor = this.saveOrUpdateAuthor.bind(this);
    }

  
    componentDidMount(){

      
        if(this.state.id === '_add'){
            return
        }else{
            AuthorService.getAuthorById(this.state.id).then( (res) =>{
                let author = res.data;
                this.setState({firstName: author.firstName,
                    lastName: author.lastName,
                    birthDate : author.birthDate
                });
            });
        }        
    }
    saveOrUpdateAuthor = (e) => {
        e.preventDefault();
        let author = {firstName: this.state.firstName, lastName: this.state.lastName, birthDate: this.state.birthDate};
        console.log('author => ' + JSON.stringify(author));

        if(this.state.id === '_add'){
            AuthorService.createAuthor(author).then(res =>{
                this.props.history.push('/authors');
            });
        }else{
            AuthorService.updateAuthor(author, this.state.id).then( res => {
                this.props.history.push('/authors');
            });
        }
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

    getName(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Author</h3>
        }else{
            return <h3 className="text-center">Update Author</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getName()
                                }
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
                                            <label> Birth Date: </label>
                                            <input placeholder="Birth Date" name="birthDate" className="form-control" 
                                                value={this.state.birthDate} onChange={this.changeBirthDateHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateAuthor}>Save</button>
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

export default CreateAuthorComponent
