import React, { useState } from 'react'
import './ExpenseForm.css'

const defaultValues = {
	enteredTitle: '',
	enteredDate: '',
	enteredAmount: '',
}

const ExpenseForm = (props) => {
	const [userInput, setUserInput] = useState(defaultValues)

	const changeValuesHandler = (key) => {
		return (e) => {
			setUserInput((prevState) => {
				return {
					...prevState,
					[key]: e.target.value,
				}
			})
		}
	}

	const submitHandler = (event) => {
		event.preventDefault() //

		const expenseData = {
			title: userInput.enteredTitle,
			amount: userInput.enteredAmount,
			date: new Date(userInput.enteredDate),
		}
		const isFormNotFilled = Object.values(userInput).some((value) => !value)
		if (isFormNotFilled) {
			return alert('Please, fill all fields!')
		}
		props.onSaveExpenseData(expenseData)
		setUserInput(defaultValues)
	}
	return (
		<form onSubmit={submitHandler}>
			<div className='new-expense__controls'>
				<div className='new-expense__control'>
					<label>Title</label>
					<input
						type='text'
						value={userInput.enteredTitle}
						onChange={changeValuesHandler('enteredTitle')}
					/>
				</div>
				<div className='new-expense__control'>
					<label>Amount</label>
					<input
						type='number'
						min='0.01'
						step='0.01'
						value={userInput.enteredAmount}
						onChange={changeValuesHandler('enteredAmount')}
					/>
				</div>
				<div className='new-expense__control'>
					<label>Date</label>
					<input
						type='date'
						min='2019-01-01'
						max='2025-12-31'
						value={userInput.enteredDate}
						onChange={changeValuesHandler('enteredDate')}
					/>
				</div>
			</div>
			<div className='new-expense__actions'>
				<button type='submit'>Add Expense</button>
			</div>
		</form>
	)
}

export default ExpenseForm
