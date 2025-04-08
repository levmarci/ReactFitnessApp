import { render } from 'preact';
import './index.less';
import { Main } from './Main';
import { IconButton } from './IconButton';

function App() {
    // Téma váltó függvény
    function toggleTheme() {
        document.body.classList.toggle("dark-theme");
    }

    return (
        <div>
            {/* Az alkalmazás fő tartalma */}
            <Main />
            
            {/* Téma váltó gombot tartalmazó konténer */}
            <div class="themeButton">
                {/* Ikongomb, amely meghívja a toggleTheme függvényt kattintáskor */}
                <IconButton icon="dark_mode" onClick={toggleTheme} />
            </div>
        </div>
    );
}

render(<App />, document.getElementById('app'));

