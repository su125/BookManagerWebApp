import React, { Component } from 'react'
import CategoryService from '../../services/CategoryService'

class ViewCategoryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            category: {}
        }
    }

    componentDidMount(){
        CategoryService.getCategoryById(this.state.id).then( res => {
            this.setState({category: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Category Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Category Name: </label>
                            <div> { this.state.category.name }</div>
                        </div>
                        
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewCategoryComponent
