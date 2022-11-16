import './App.css'
import Expenses from './components/Expenses/Expenses'
import NewExpense from './components/NewExpense/NewExpense'
import { useEffect, useState } from 'react'

const expenses = [
	{
		id: 'e1',
		title: 'Toilet Paper',
		amount: 94.12,
		date: new Date(2022, 7, 14),
	},
	{ id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2023, 2, 12) },
	{
		id: 'e3',
		title: 'Car Insurance',
		amount: 294.67,
		date: new Date(2024, 2, 28),
	},
	{
		id: 'e4',
		title: 'New Desk (Wooden)',
		amount: 450,
		date: new Date(2022, 5, 12),
	},
]

function App() {
	const [newExpenses, setNewExpenses] = useState(expenses)

	
	useEffect (()=>{
		fetchExpenseHandler()
	},[])
	
	const fetchExpenseHandler = async ()=>{
		try{ 
			const response = await fetch ('https://expense-tracker-8435e-default-rtdb.firebaseio.com/expenses.json')
			const data = await response.json();

			const loadedExpense = []
			for(const key in data){
				loadedExpense.push({
					id: key ,
					title : data[key].title,
					amount:data[key].amount,
					date:new Date(data[key].date)

				})
			}
			setNewExpenses(loadedExpense)
			
			
		} catch(error){
			console.log(error.message);
		}
	}


	// const addExpenseHandler = (expense) => {
	// 	setNewExpenses((prevExpense) => {
	// 		return [expense, ...prevExpense]
	// 	})
	// }

	const addExpenseHandler = (data)=>{
		fetch('https://expense-tracker-8435e-default-rtdb.firebaseio.com/expenses.json',
		{
			method : 'POST',
			body : JSON.stringify(data),
			headers : {
				'Content-type' : 'application/json'
			}
		})
		fetchExpenseHandler()
	}
	return (
		<div className='App'>
			<NewExpense onAddExpense={addExpenseHandler} />
			<Expenses expenses={newExpenses} />
		</div>
	)

}
export default App;
