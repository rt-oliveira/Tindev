import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './paginas/login';
import Main from './paginas/main';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main
    })
);