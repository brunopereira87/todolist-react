import './App.css';

import React from 'react';
import Tasks from './views/Tasks/Tasks';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Categories from './views/Categories/Categories';
import { UserStorage } from './UserContext';
import Conta from './components/Conta/Conta';
import ProtectedRoute from './components/helpers/ProtectedRoute';

// firebase.initializeApp({
//   apiKey: "AIzaSyBEzk96h51_HpUMPQmDDkh3P9AWZcfqvqc",
//   authDomain: "to-do-list-3bf7f.firebaseapp.com",
//   databaseURL: "https://to-do-list-3bf7f.firebaseio.com",
//   projectId: "to-do-list-3bf7f",
//   storageBucket: "to-do-list-3bf7f.appspot.com",
//   messagingSenderId: "556248030253",
//   appId: "1:556248030253:web:cd6d8f8d50b1cfd1876ca4"
// })

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className="container">
            <Routes>
              <ProtectedRoute path="/" element={<Tasks />}></ProtectedRoute>
              <ProtectedRoute path="/tarefas" element={<Tasks />}></ProtectedRoute>
              <ProtectedRoute path="/categorias" element={<Categories />}></ProtectedRoute>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/cadastrar" element={<Register />}></Route>
              <ProtectedRoute path="/conta" element={<Conta />}></ProtectedRoute>
            </Routes>
          </main>
        </UserStorage>


      </BrowserRouter>

    </div>
  );
}

export default App;
