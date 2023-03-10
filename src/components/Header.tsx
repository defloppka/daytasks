import { Component } from "solid-js";

const Header: Component = () => {
    return (
        <div class="bg-white my-2 rounded py-2 px-3 flex items-center justify-between shadow-sm">
            <h1 class="text-xl">daytasks</h1>
            <p>{Intl.DateTimeFormat("ru-ru").format(new Date())}</p>
        </div>
    );
}

export default Header;