import { Accessor, Component, createEffect, createSignal, For, Setter, Show } from 'solid-js';
import Header from './components/Header';
import TodoCreator from './components/TodoCreator';
import TodoItem from './components/TodoItem';

import { Todo } from './types/todo';

// Используем для доступа к локальному хранилищу
function useLocalStorage<T extends object>(
  initialValue: T
): [Accessor<T>, Setter<T>] {
  const [state, setState] = createSignal(initialValue);
  if (localStorage.todos) {
    setState(JSON.parse(localStorage.todos));
  }

  createEffect(() => localStorage.todos = JSON.stringify(state()));

  return [state, setState];
}


const App: Component = () => {

  const [todos, setTodos] = useLocalStorage<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos(), todo]);
  }

  const toggleTodo = (id: Todo["id"]) => {
    setTodos(todos().map((todo) => (
      todo.id !== id ? todo : { ...todo, completed: !todo.completed }
    )));
  }

  const deleteTodo = (id: Todo["id"]) => {
    const index = todos().findIndex((todo) => todo.id === id);
    setTodos([...todos().slice(0, index), ...todos().slice(index + 1)])
  }

  return (
    <div>
      <Header />
      <h1 class="text-3xl text-center mb-2 font-semibold">Новая задача</h1>
      <TodoCreator addTodo={addTodo} />
      <div>
        <Show when={todos().length > 0} fallback={
          <p class="text-center text-xl font-medium">Чтож, у Вас нет задач... <span>(хорошо ли это?)</span></p>
        }>
          {/* Блок задач */}
          <h1 class="text-3xl text-center mb-2 font-semibold">Задачи</h1>
          <For each={todos()}>
            {(todo) => <TodoItem
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo} />}
          </For>
        </Show>
      </div>
    </div>
  );
};

export default App;
