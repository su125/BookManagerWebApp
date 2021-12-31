import React, { Component } from 'react'
import AuthorService from '../../services/AuthorService'

class ViewAuthorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            author: {}
        }
    }

    componentDidMount(){
        AuthorService.getAuthorById(this.state.id).then( res => {
            this.setState({author: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Author Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Author First Name: </label>
                            <div> { this.state.author.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Author Last Name: </label>
                            <div> { this.state.author.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Author Birth Date: </label>
                            <div> { this.state.author.birthDate }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewAuthorComponent
