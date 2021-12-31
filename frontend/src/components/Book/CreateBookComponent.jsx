import React, { Component } from 'react'
import BookService from '../../services/BookService';

class CreateBookComponent extends Component {
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
        this.saveOrUpdateBook = this.saveOrUpdateBook.bind(this);
    }

  
    componentDidMount(){

      
        if(this.state.id === '_add'){
            return
        }else{
            BookService.getBookById(this.state.id).then( (res) =>{
                let book = res.data;
                this.setState({title: book.title,
                    totalPages: book.totalPages,
                    publishedDate : book.publishedDate
                });
            });
        }        
    }
    saveOrUpdateBook = (e) => {
        e.preventDefault();
        let book = {title: this.state.title, totalPages: this.state.totalPages, publishedDate: this.state.publishedDate};
        console.log('book => ' + JSON.stringify(book));

        if(this.state.id === '_add'){
            BookService.createBook(book).then(res =>{
                this.props.history.push('/books');
            });
        }else{
            BookService.updateBook(book, this.state.id).then( res => {
                this.props.history.push('/books');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Book</h3>
        }else{
            return <h3 className="text-center">Update Book</h3>
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
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Title: </label>
                                            <input placeholder="Title" name="title" className="form-control" 
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

                                        <button className="btn btn-success" onClick={this.saveOrUpdateBook}>Save</button>
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

export default CreateBookComponent
