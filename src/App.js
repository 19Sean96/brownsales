import React, { useState } from 'react';
import { Route } from 'react-router-dom';

// STYLESHEET
import './App.scss';

// COMPONENTS
import Header from './components/Header'
import Nav from './components/Nav';
import Footer from './components/Footer';
import Brands from './components/Brands'
import Form from './components/Form';
import Modal from './components/Modal';
import Banner from './components/Banner';
// PAGES
// import Home from './pages/Home';
import Items from './pages/Items';

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome"

// CONTENTFUL API
const contentful = require("contentful");

const contentfulAPI = contentful.createClient({
  space: process.env.REACT_APP_SPACE,
  accessToken: process.env.REACT_APP_SECRET,
});

function App() {
    const [formOpen, toggleForm] = useState(false);

    return (
        <>
            <Header />
            <Nav />
            <Banner
            contentfulAPI={contentfulAPI}
            />

            <Route path='/'>
                {formOpen &&
                    <Modal
                    setModal={toggleForm}
                    >
                        <Form
                        formOpen={formOpen}
                        toggleForm={toggleForm}
                        />
                    </Modal>
                }
            </Route>
            <Route path='/special-buy'>
                <Items
                contentfulAPI={contentfulAPI}
                formOpen={formOpen}
                />
            </Route>
            <Brands />
            <Footer />

            {/*  */}

            <FormToggle toggleForm={e => toggleForm(!formOpen)}/>
        </>
    );
}

function FormToggle({toggleForm}) {
    return (
        <div className="toggle" onClick={toggleForm}>
            <p className="toggle--text">contact us</p>
            <FAIcon icon={faPaperPlane} className="toggle--icon"/>
        </div>
    )
}

export default App;
