import React, { Component } from 'react'
import CategoryService from '../../services/CategoryService'
class CreateCategoryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.saveOrUpdateCategory = this.saveOrUpdateCategory.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            CategoryService.getCategoryById(this.state.id).then( (res) =>{
                let category = res.data;
                this.setState({name: category.name
                });
            });
        }        
    }
    saveOrUpdateCategory = (e) => {
        e.preventDefault();
        let category = {name: this.state.name};
        console.log('category => ' + JSON.stringify(category));

        if(this.state.id === '_add'){
            CategoryService.createCategory(category).then(res =>{
                this.props.history.push('/categories');
            });
        }else{
            CategoryService.updateCategory(category, this.state.id).then( res => {
                this.props.history.push('/categories');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    cancel(){
        this.props.history.push('/categories');
    }

    getName(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Category</h3>
        }else{
            return <h3 className="text-center">Update Category</h3>
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
                                            <label>  Name: </label>
                                            <input placeholder=" Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                       
                                        <button className="btn btn-success" onClick={this.saveOrUpdateCategory}>Save</button>
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

export default CreateCategoryComponent
