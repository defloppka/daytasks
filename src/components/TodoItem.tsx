import { Component, Show } from "solid-js";
import { Todo } from "../types/todo";

import {
    selectClass
} from "../styles";

type Props = {
    todo: Todo;
    toggleTodo: (id: Todo["id"]) => void;
    deleteTodo: (id: Todo["id"]) => void;
}

const TodoItem: Component<Props> = (props) => {

    return (
        <div class="bg-white flex-col items-center p-3 mb-3 rounded shadow-sm">
            <div class="flex items-center">

                {/* Чекбокс с состоянием задачи(завершена/нет) */}
                <input
                    type="checkbox"
                    checked={props.todo.completed}
                    onchange={[props.toggleTodo, props.todo.id]}
                    class="bg-white rounded border-gray-300 text-green-500 focus:ring-green-100"
                />

                {/* Название задачи */}
                <h1 classList={{
                    "ml-2 text-lg": true,
                    "ease-in-out transition-all duration-400 line-through text-gray-500": props.todo.completed
                }}>{props.todo.title}</h1>

                {/* Блок с типом задачи и кнопокй удаления */}
                <div class="ml-auto flex items-center gap-2">
                    <h1 class={selectClass(props.todo.type)}>{props.todo.type}</h1>
                    <button
                        onclick={[props.deleteTodo, props.todo.id]}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Если есть описание, то показываем */}
            <Show when={props.todo.description}>
                <p class="mt-2 text-md text-gray-700">{props.todo.description}</p>
            </Show>
        </div>
    );
}

export default TodoItem;