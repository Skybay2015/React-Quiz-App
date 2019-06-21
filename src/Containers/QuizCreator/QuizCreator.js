import React, { Component } from 'react';
import classes from './QuizCreator.module.sass'
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import Select from '../../Components/UI/Select/Select';
import { createControl, validate, validateForm } from '../../Form/formFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios/axios-quiz'


function createOptionControl (number) {
    return createControl(
        {
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым',
            id: number
        },
        { required: true },
    ); 
}


function createFormControls () {
    return {
            question: createControl(
                {  
                    label: 'Введите вопрос',
                    errorMessage: 'Вопрос не может быть пустым'
                },
                { required: true },
            ),
            option1: createOptionControl(1),
            option2: createOptionControl(2),
            option3: createOptionControl(3),
            option4: createOptionControl(4),
        }
}

class QuizCreator extends Component {
    state = {
        rightAnswerId: 1,
        isFormValid: false,
        quiz: [],
        formControls: createFormControls(),
    };

    submitHandler = (e) => {
        e.preventDefault();
    };

    addQuestionHandler = (event) => {
        event.preventDefault();

        const quiz = [...this.state.quiz];
        const index = quiz.length + 1;
        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers : [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},   
            ]
        };

        quiz.push(questionItem)

        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls(),
        });
    };

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value,
        });
    };

    createQuizHandler = async e => {
        e.preventDefault()
        
        try {
            await axios.post('quizes.json', this.state.quiz)
            this.setState({
                rightAnswerId: 1,
                isFormValid: false,
                quiz: [],
                formControls: createFormControls(),
            });
        } catch (e) {
            console.log(e)
        }        
    };



    onChangeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = formControls[controlName]
        console.log(control)


        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation)
        console.log(control.valid)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })


    };

    renderControls() {
        return Object.keys(this.state.formControls).map(
            (controlName, index) => {
                const control = this.state.formControls[controlName];

                return (
                    <Auxiliary key={controlName + index}>
                        <Input
                            label={control.label}
                            value={control.value}
                            valid={control.valid}
                            shouldValidate={!!control.validation}
                            touched={control.touched}
                            errorMessage={control.errorMessage}
                            onChange={(event) =>
                                this.onChangeHandler(
                                    event.target.value,
                                    controlName,
                                )
                            }
                        />

                        {index === 0 && <hr />}
                    </Auxiliary>
                );
            },
        );
    }



    render() {
        const select = (
            <Select
                label='Выберите правильный ответ'
                value={this.state.rightAnswerId}
                onChange={this.selectChangeHandler}
                options={[
                    { text: 1, value: 1 },
                    { text: 2, value: 2 },
                    { text: 3, value: 3 },
                    { text: 4, value: 4 },
                ]}
            />
        );

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}

                        {select}

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}>
                            Добавить вопрос
                        </Button>

                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}>
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuizCreator;