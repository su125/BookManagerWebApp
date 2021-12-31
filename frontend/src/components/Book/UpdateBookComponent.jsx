import React, { Component } from 'react'
import BookService from '../../services/BookService';

class UpdateBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            totalPages: '',
            publishedDate: ''
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeTotalPagesHandler = this.changeTotalPagesHandler.bind(this);
        this.changePublishedDateHandler = this.changePublishedDateHandler.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }

    componentDidMount(){
        BookService.getBookById(this.state.id).then( (res) =>{
            let book = res.data;
            this.setState({title: book.title,
                totalPages: book.totalPages,
                publishedDate : book.publishedDate
            });
        });
    }

    updateBook = (e) => {
        e.preventDefault();
        let book = {firstName: this.state.title, totalPages: this.state.totalPages, publishedDate: this.state.publishedDate};
        console.log('book => ' + JSON.stringify(book));
        console.log('id => ' + JSON.stringify(this.state.id));
        BookService.updateBook(book, this.state.id).then( res => {
            this.props.history.push('/books');
        });
    }
    
    changeTitleHandler= (event) => {
        this.setState({title: event.target.value});
    }

    changeTotalPagesHandler= (event) => {
        this.setState({totalPages: event.target.value});
    }

    changePublishedDateHandler= (event) => {
        this.setState({publishedDate: event.target.value});
    }

    cancel(){
        this.props.history.push('/books');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Book</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Title: </label>
                                            <input placeholder="Ttile" name="title" className="form-control" 
                                                value={this.state.title} onChange={this.changeTitleHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Total pages: </label>
                                            <input placeholder="Total pages" name="totalPages" className="form-control" 
                                                value={this.state.totalPages} onChange={this.changeTotalPagesHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Published Date: </label>
                                            <input placeholder="Published Date" name="publishedDate" className="form-control" 
                                                value={this.state.publishedDate} onChange={this.changePublishedDateHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateBook}>Save</button>
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

export default UpdateBookComponent
