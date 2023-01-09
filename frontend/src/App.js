import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {LinkContainer} from "react-router-bootstrap"

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-container' >
        <header >
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Amazona</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
      </header>
        <main className='mt-3'>
          <Container>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen/>}/>
            <Route path='/' element={<HomeScreen/>}/>
          </Routes>
        </Container>
        </main>
        <footer>
          <div className='text-center'>
            All rights reserved
          </div>
        </footer>
      </div>
      </BrowserRouter>
  );
}

export default App;
