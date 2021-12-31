import React, { Component } from 'react'
import CategoryService from '../../services/CategoryService'

class ListCategoryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                categories: []
        }
        this.addCategory = this.addCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    deleteCategory(id){
        CategoryService.deleteCategory(id).then( res => {
            this.setState({categories: this.state.categories.filter(category => category.id !== id)});
        });
    }
    viewCategory(id){
        this.props.history.push(`/view-category/${id}`);
    }
    editCategory(id){
        this.props.history.push(`/add-category/${id}`);
    }

    componentDidMount(){
        CategoryService.getCategories().then((res) => {
            this.setState({ categories: res.data});
        });
    }

    addCategory(){
        this.props.history.push('/add-category/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Categories List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addCategory}> Add Category</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Category Name</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.categories.map(
                                        category => 
                                        <tr key = {category.id}>
                                             <td> { category.name} </td>   
                                             <td>
                                                 <button onClick={ () => this.editCategory(category.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCategory(category.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewCategory(category.id)} className="btn btn-info">View </button>
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

export default ListCategoryComponent
