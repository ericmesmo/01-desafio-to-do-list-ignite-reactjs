import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Header } from './components/Header'
import { ItemTask } from './components/ItemTask';

import Clipboard from './assets/clipboard.svg';

import './global.css'
import styles from './App.module.css';
import { PlusCircle } from 'phosphor-react';

export interface TaskProps {
	id: string;
	content: string; 
	checked: boolean;
}


function App() {
	const [ newTask, setNewTask ] = useState('');
    const [ tasks, setTasks ] = useState<TaskProps[]>([]);
	const [ tasksDone, setTasksDone ] = useState<TaskProps[]>([]);


    function handleCreateNewTask(event: FormEvent){
        event.preventDefault()

        setTasks((prevState) => [...prevState, {
			id: uuidv4(),
			content: newTask,
			checked: false
		}]);
 
        setNewTask('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

	function deleteTask(taskToDelete: String){
		const tasksWhitoutDeletedOne = tasks.filter(task => {
			return task.id !== taskToDelete
		})

		setTasks(tasksWhitoutDeletedOne)
	}

	function checkedTask(idTaskToCheck: string){
		const index = tasks.findIndex(task => task.id === idTaskToCheck); 

		const alteredOneTask = [...tasks];

		alteredOneTask[index].checked = !alteredOneTask[index].checked;

		setTasks(alteredOneTask);
	}
	
	return (
		<div className={styles.body}>
			<Header />

			<div className={styles.searchBar}>
				<form
					onSubmit={handleCreateNewTask}
				>
					<input 
						placeholder='Adicione uma nova tarefa'
						value={newTask}
						onChange={handleNewTaskChange}
						maxLength={80}
						required
					/>
					<button
						type='submit'
					>
						Criar
						<PlusCircle 
							size={16}
						/>
					</button>
				</form>
			</div>

			<div className={styles.tasksContainer}>
				<div className={styles.tasksInfoContainer}>
					<div className={styles.tasksInfoCreated}>
						<p>Tarefas criadas</p>
						<span>{tasks.length}</span>
					</div>
					<div className={styles.tasksInfoDone}>
						<p>Concluídas</p>
						<span
							className={tasks.length > 0 ? styles.spanDoneBiggerThanZero : styles.spanDone}
						>
							{
								tasks.length > 0 ?
									`${tasks.filter(task => task.checked).length} de ${tasks.length}`
								:
									`0`
							}
						</span>
					</div>
				</div>
			</div>

			<div className={styles.listContainer}>
				<div className={styles.list}>
					{
						tasks.length > 0 ? 
							tasks.map((task) => {
								return (
									<ItemTask 
										key={task.id}
										task={task}
										onDeleteTask={deleteTask}
										onCheckedTask={checkedTask}
										isDone={task.checked}
									/> 
								)
							})
							
						: 
						<div className={styles.listNoTasks}>
							<img src={Clipboard}/>
							<p>
								<strong>
									Você ainda não tem tarefas cadastradas
								</strong>
								<br/>
									Crie tarefas e organize seus itens a fazer
							</p>
						</div>
					}
					
				</div>
			</div>
		</div>
	)
}

export default App