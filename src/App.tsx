import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import AddJobPage from './pages/AddJobPage';
import MainLayout from './layout/MainLayout';
import JobPage from './pages/JobPage';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <MainLayout /> } >
        <Route index element= { <HomePage />}/>
        <Route path='/jobs' element= { <JobsPage /> }/>
        <Route path='/jobs/:jobId' element={ <JobPage />}/>
        <Route path='/add-job' element={ <AddJobPage />}/>
      </Route>
      <Route path='*' element={ <NotFound /> } />
    </Routes>
  )
}

export default App