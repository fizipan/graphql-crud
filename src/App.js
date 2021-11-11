import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom';

import Form from './components/Form';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/books/new" element={<Form />} />
          <Route path="/books/:id/edit" element={<Form />} />
          <Route path="/books" element={<List />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
