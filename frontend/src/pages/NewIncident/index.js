import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();


    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });

            history.push('/profile');

        } catch (err) {

            alert('Erro no cadastro, tente novamente...');

        }


    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="BE THE HERO" />
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detralhadamente para encontrar um héroi para resolver isso.</p>

                    <Link className="back-link" to="/profile" >
                        <FiArrowLeft size={16} color="#E02041" />
                         Voltar para home
                    </Link>

                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <input placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>

        </div>
    );
}