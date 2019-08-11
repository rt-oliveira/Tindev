import React from 'react';
import { YellowBox} from 'react-native';
import Routes from './rotas';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App(){
  return(
    <Routes/>
  );
}