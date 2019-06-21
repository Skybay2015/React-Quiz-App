import React from 'react'
import classes from './ActiveQuiz.module.sass'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = (props) => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{props.answerNumber}</strong>&nbsp; 
                    {props.question}
                </span>
                <small>{props.answerNumber} iz {props.quizLength}</small>
            </p>
            <AnswersList 
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                state={props.state}
            />
        </div>
    );
};

export default ActiveQuiz