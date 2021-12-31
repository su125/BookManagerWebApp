import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import CreateBookComponent from './components/Book/CreateBookComponent';
import ViewBookComponent from './components/Book/ViewBookComponent';
import CreateAuthorComponent from './components/Author/CreateAuthorComponent';
import ViewAuthorComponent from './components/Author/ViewAuthorComponent';
import CreateCategoryComponent from './components/Category/CreateCategoryComponent';
import ViewCategoryComponent from './components/Category/ViewCategoryComponent';
import ListCategoryComponent from './components/Category/ListCategoryComponent';
import ListBookComponent from './components/Book/ListBookComponent';
import ListAuthorComponent from './components/Author/ListAuthorComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListBookComponent}></Route>

                          <Route path = "/categories" component = {ListCategoryComponent}></Route>
                          <Route path = "/add-category/:id" component = {CreateCategoryComponent}></Route>
                          <Route path = "/view-category/:id" component = {ViewCategoryComponent}></Route>
                          <Route path = "/books" component = {ListBookComponent}></Route>
                          <Route path = "/add-book/:id" component = {CreateBookComponent}></Route>
                          <Route path = "/view-book/:id" component = {ViewBookComponent}></Route>
                          <Route path = "/authors" component = {ListAuthorComponent}></Route>
                          <Route path = "/add-author/:id" component = {CreateAuthorComponent}></Route>
                          <Route path = "/view-author/:id" component = {ViewAuthorComponent}></Route>
                          
                    </Switch>
                </div>
        </Router>
    </div>
    
  );
}

export default App;
