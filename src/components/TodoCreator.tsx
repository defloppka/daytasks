import { Component, createEffect, createSignal, For, Show } from "solid-js";
import { Todo } from "../types/todo";

type Props = {
    addTodo: (todo: Todo) => void;
}

const TodoCreator: Component<Props> = (props) => {

    const types = ["Просто", "Можно отложить", "Как можно скорее", "Супер срочно"];

    const [title, setTitle] = createSignal<string>("");
    const [desc, setDesc] = createSignal<string | undefined>("");
    const [todoType, setTodoType] = createSignal<string>(types[0]);

    const [error, setError] = createSignal(false);

    createEffect(() => {
        if (error()) {
            setTimeout(() => setError(false), 5000);
        }
    });

    const handleSubmit = (e: Event) => {
        console.log("Submit");

        e.preventDefault();
        if (title().length != 0) {
            const todo: Todo = {
                id: Date.now(),
                title: title(),
                description: desc(),
                type: todoType(),
                completed: false,
                created_at: new Date()
            }
            props.addTodo(todo);
            setTitle("");
            setDesc("");
            setTodoType(types[0]);
        } else {
            setError(true);
        }
    }

    return (
        <div class="flex flex-col bg-white p-3 rounded shadow-sm my-3">
            <div class="flex flex-col gap-5">

                {/* Ввод задачи */}
                <input
                    type="text"
                    required
                    placeholder="Что делать? (задача)"
                    value={title()}
                    class="rounded"
                    onchange={(e) => setTitle((e.target as HTMLInputElement).value)}
                />

                {/* Ввод описания */}
                <textarea
                    rows="5"
                    class="rounded"
                    value={desc()}
                    onchange={(e) => setDesc((e.target as HTMLInputElement).value)}
                    placeholder="Как делать? (описание)"
                    cols="1"></textarea>

                {/* Блок выбора типа задачи */}
                <fieldset>

                    <legend class="text-lg my-2">Важность задачи</legend>

                    <For each={types}>
                        {(type) => (
                            <div class="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={type === todoType()}
                                    onchange={(e) => setTodoType(type)}
                                />
                                <h1>{type}</h1>
                            </div>
                        )}
                    </For>
                </fieldset>

                <button
                    class="w-full bg-blue-500 text-white py-2 hover:bg-blue-600 text-lg font-medium rounded shadow"
                    onclick={handleSubmit}
                >Добавить</button>
            </div>
            {/* Блок ошибки */}
            <Show when={error()}>
                <h1 class="text-center text-xl font-medium text-red-500 my-3">Заполнили ли вы название задачи?</h1>
            </Show>
        </div>
    );
}

export default TodoCreator;