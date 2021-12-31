import React, { Component } from 'react'
import CategoryService from '../../services/CategoryService';

class UpdateCategoryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
    }

    componentDidMount(){
        CategoryService.getCategoryById(this.state.id).then( (res) =>{
            let category = res.data;
            this.setState({name: category.name
            });
        });
    }

    updateCategory = (e) => {
        e.preventDefault();
        let category = {name: this.state.name};
        console.log('category => ' + JSON.stringify(category));
        console.log('id => ' + JSON.stringify(this.state.id));
        CategoryService.updateCategory(category, this.state.id).then( res => {
            this.props.history.push('/categories');
        });
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }


    cancel(){
        this.props.history.push('/categories');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Category</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label>  Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                       

                                        <button className="btn btn-success" onClick={this.updateCategory}>Save</button>
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

export default UpdateCategoryComponent
