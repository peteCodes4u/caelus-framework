// this is the signup page, changes to the signup page can be made here

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Signup() { 
    // set initial form state
    const [formState, setFormState] = useState({ 
        name: '',
        email: '',
        password: '' 
    });
    // set state for form validation for the user generation functionality
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ 
            ...formState,
            [name]: value 
        });
    };

    const handleFormSubmit = async (event) => { 
        event.preventDefault();
        try {
            const { data } = await addUser({ 
                variables: { ...formState } 
            });
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className='container'> 
        <section>
            <section className='section-header'> 
            <h2>Signup</h2>
            </section>
            <section className='section-body'>
            { data ? (
                <p>
                Success! You may now head <Link to='/'>back to the homepage</Link>.
                </p>
            ):(
                <form onSubmit={handleFormSubmit}>
                <input
                    className='form-input'
                    placeholder='Your username'
                    name='name'
                    type='text'
                    value={formState.name}
                    onChange={handleChange}
                />
                <input
                    className='form-input'
                    placeholder='Your email'
                    name='email'
                    type='email'
                    value={formState.email}
                    onChange={handleChange}
                />
                <input
                    className='form-input'
                    placeholder='******'
                    name='password'
                    type='password'
                    value={formState.password}
                    onChange={handleChange}
                />
                <button className='button-link primary' type='submit'>
                👽 Create User 👽
                </button>
                </form>

            )}
            {error && (
                <section>
                {error.message}
                </section>
            )}
            </section>
        </section>
        </main>
    );

};