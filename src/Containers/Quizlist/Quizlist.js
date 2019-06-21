import React, { Component } from 'react';
import classes from './QuizList.module.sass'
import {NavLink} from 'react-router-dom'
import Loader from '../../Components/UI/Loader/Loader'
import {connect} from 'react-redux'
import { fetchQuizes } from '../../Store/actions/quiz';


class Quizlist extends Component {

    renderQuizes() {
        return this.props.quizes.map(quiz=>{
            return (
                <li key={quiz.id}>
                    <NavLink to={
                        {pathname: `/quiz/${quiz.id}`}
                    }>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

     componentDidMount() {
         this.props.fetchQuizes()
    }

    render() {
    console.log('props', this.props)
        return (
            <div className={classes.Quizlist}>
                <div>
                    <h1>Список тестов</h1>
                    {(this.props.quizes.length === 0 && this.props.loading) ? (
                        <Loader />
                    ) : (
                        <ul>{this.renderQuizes()}</ul>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    console.log(state)
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quizlist);

