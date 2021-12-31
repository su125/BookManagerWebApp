import React, { Component } from 'react'
import AuthorService from '../../services/AuthorService'

class ListAuthorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                authors: []
        }
        this.addAuthor = this.addAuthor.bind(this);
        this.editAuthor = this.editAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
    }

    deleteAuthor(id){
        AuthorService.deleteAuthor(id).then( res => {
            this.setState({authors: this.state.authors.filter(author => author.id !== id)});
        });
    }
    viewAuthor(id){
        this.props.history.push(`/view-author/${id}`);
    }
    editAuthor(id){
        this.props.history.push(`/add-author/${id}`);
    }

    componentDidMount(){
        AuthorService.getAuthors().then((res) => {
            this.setState({ authors: res.data});
        });
    }

    addAuthor(){
        this.props.history.push('/add-author/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Authors List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addAuthor}> Add Author</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Author First Name</th>
                                    <th> Author Last Name</th>
                                    <th> Author Birth date</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.authors.map(
                                        author => 
                                        <tr key = {author.id}>
                                             <td> { author.firstName} </td>   
                                             <td> {author.lastName}</td>
                                             <td> {author.birthDate}</td>
                                             <td>
                                                 <button onClick={ () => this.editAuthor(author.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteAuthor(author.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewAuthor(author.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListAuthorComponent
