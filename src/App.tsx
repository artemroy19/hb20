import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import MainQuest from './components/MainQuest';
import QuizBlock from './components/blocks/QuizBlock';
import QuoteBlock from './components/blocks/QuoteBlock';
import MathBlock from './components/blocks/MathBlock';
import AssociationBlock from './components/blocks/AssociationBlock';
import './styles/App.css';

const AppContent: React.FC = () => {
  const { currentBlock } = useSelector((state: RootState) => state.quest);

  const renderCurrentBlock = () => {
    switch (currentBlock) {
      case 0:
        return <QuizBlock />;
      case 1:
        return <QuoteBlock />;
      case 2:
        return <MathBlock />;
      case 3:
        return <AssociationBlock />;
      default:
        return <MainQuest />;
    }
  };

  return (
    <div className="app">
      {renderCurrentBlock()}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;