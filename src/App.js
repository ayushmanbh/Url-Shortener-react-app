import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Form from './components/Form'

function App() {
  return (
    <main className='container-fluid d-flex min-vh-100 flex-column justify-content-between align-items-center'>
      <Header />
      <Form />
      <Footer />
    </main>
  );
}

export default App;
