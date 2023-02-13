import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, Trash } from 'phosphor-react';
import { TaskProps } from '../App';

import styles from './ItemTask.module.css'

interface ItemTaskProps{
    task: TaskProps,
    onDeleteTask: (task: string) => void;
    onCheckedTask: (idTask: string) => void;
    isDone: boolean
}

export function ItemTask({ task, onDeleteTask, onCheckedTask, isDone } : ItemTaskProps) {

    function handleDeleteTask(){
        onDeleteTask(task.id);
    }

    function handleCheckedTask(){
        onCheckedTask(task.id)
    }

    return (
        <div className={styles.itemTask}>
            <Checkbox.Root 
                className={styles.checkboxRoot}
                onCheckedChange={handleCheckedTask}
            >
                <Checkbox.Indicator 
                    className={styles.checkboxIndicator}
                >
                    <Check 
                        size={14}
                        weight='bold'
                    />
                </Checkbox.Indicator>
            </Checkbox.Root>
            <p
                className={isDone ? styles.taskDone : ''}
            >{task.content}</p>
            <button
                className={styles.deleteButton}
                onClick={handleDeleteTask}
            >
                <Trash 
                    size={24}
                />
            </button>
        </div>
    )
}