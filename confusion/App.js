import * as React from 'react';
import Home from "./components/HomeComponent";
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

export default function App() {
  return <Provider store={store}><Home/></Provider>
}
