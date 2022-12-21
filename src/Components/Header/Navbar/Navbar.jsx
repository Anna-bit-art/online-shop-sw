import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css";
import React from "react";
import {setCategory} from "../../../redux/categoryReducer";
import {connect} from "react-redux";

class Navbar extends React.Component {
    componentDidMount() {
        if (!this.props.currentCategory) {
            this.props.setCategory(this.props.defaultCategory);
        } else {
            this.props.setCategory(this.props.currentCategory);
        }
    }

    render() {
        return (
            <ul className={s.nav}>
                {this.props.categories.map(category =>
                    <li key={category.name}
                        className={(this.props.currentCategory && this.props.currentCategory === category.name) ? s.activeLink :
                            !this.props.currentCategory && this.props.defaultCategory === category.name ? s.activeLink : null} >
                        <NavLink key={category.id}
                                 to={'/category/' + category.name}
                                 onClick={() => {this.props.setCategory(category.name)}}>
                            {category.name}
                        </NavLink>
                    </li>
                )}
            </ul>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        categories: state.category.categories,
        defaultCategory: state.category.defaultCategory,
        currentCategory: state.category.currentCategory,
        isFetching: state.category.isFetching
    }
}

export default connect(mapStateToProps, {setCategory})
(Navbar)

