import { Provider } from "react-redux";
import "./App.css";
import BookSearch from "./components/BookSearch/BookSearch";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <h1>Book Search App</h1>
      <BookSearch />
    </Provider>
  );
}

export default App;
