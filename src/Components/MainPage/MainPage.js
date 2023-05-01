import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Card, Dropdown, Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { AsyncGetPokemon } from '../../Services/DataService';
import { getLocalStorage, saveToLocalStorageByName, removeFromLocalStorage } from '../../Services/LocalStorage';
import { SuitHeartFill } from 'react-bootstrap-icons';
import ModalComponent from './ModalComponent';

export default function MainPage(props) {
    const { data } = props;
    const [pokemonInformation, setPokemonInformation] = useState([]);
    const [errorActual, setErrorActual] = useState('');
    const [pokemon, setPokemon] = useState('');
    const [pokemonData, setPokemonData] = useState('');
    const [pokemonSpeciesData, setPokemonSpeciesData] = useState('');
    const [pokemonEncountersData, setPokemonEncountersData] = useState('');
    const [evolutionChainData, setEvolutionChainData] = useState('');
    const [isActive, setIsActive] = useState(false);

    let pokemonRandom;

    useEffect(() => {
        const fetchData = async () => {
            pokemonRandom = Math.floor(Math.random() * 649);
            let pokeFav = await AsyncGetPokemon(pokemonRandom);
            setPokemonInformation(pokeFav);
        };
        fetchData();
    }, [pokemonRandom]);

    const handleActive = () => {
        setIsActive(!isActive);
        if (isActive) {
            getLocalStorage(pokemonInformation);
            if(!pokemonInformation){

            }else{
            saveToLocalStorageByName(pokemonInformation);
            }
         }
    }

    const handleChange = async (event) => {
        if (event.key === "Enter") {
            const pokemonName = event.target.value.toLowerCase();
            setPokemonData(pokemonName);

            try {
                const pokemonInfo = await AsyncGetPokemon(pokemonName);
                setPokemonInformation(pokemonInfo);
            } catch (error) {
                setErrorActual('Please enter a valid Pokemon');
            }
        }
    }

    return (
    <div>
        <body>
            <Container>
                <Row>
                    <div className='d-flex justify-content-center'>
                        <Row className='pokemonBoxActual mt-5'>
                            <Col>
                                <h1 className='pmb1'>Pokedex Application</h1>

                                <Row>
                                    <Col>
                                        <div>{errorActual}</div>
                                        <input type='text' placeholder='Please enter a Pokemon' className='PIW' onKeyDown={handleChange} />
                                        <ModalComponent data={data} />
                                    </Col>
                                </Row>

                                <div className='mt-5 d-flex justify-content-center'>
                                    <Card style={{ width: '500px', padding: '10px' }} className={!pokemonInformation.typingColor1 ? '' : `bgTest ${pokemonInformation.PokemonCardColor}`}>
                                        <Row>
                                            <Col className='col-10'>
                                                <Card.Title className='mt-2 nameFontSize'>{!pokemonInformation.Name ? '' : pokemonInformation.Name.toUpperCase()}</Card.Title>
                                            </Col>

                                            <Col className='col-2'>
                                                <div className='d-flex justify-content-end mb-3'>
                                                    <button className="btnClass mt-2" onClick={handleActive}><SuitHeartFill className={isActive ? "backgroundBtnClicked" : "backgroundBtn"} /></button>
                                                </div>
                                            </Col>
                                        </Row>


                                        <Row className='pokemonImageBg'>
                                            <Col className={!pokemonInformation.ShinySprite ? 'col-12 d-flex justify-content-center' : ''}>
                                                <Card.Img variant="top" src={pokemonInformation.Sprite} />
                                            </Col>
                                            <Col className={!pokemonInformation.ShinySprite ? 'col-0 d-flex justify-content-center' : ''}>
                                                <Card.Img variant="top" src={pokemonInformation.ShinySprite} />

                                            </Col>
                                        </Row>

                                        <Card.Body>
                                            <Row className=''>
                                                <Col lg={!pokemonInformation.Typing2 ? 12 : 6} className={pokemonInformation.typingColor1}>
                                                    <div className='text-center'>{pokemonInformation.Typing1}</div>
                                                </Col>

                                                <Col lg={!pokemonInformation.Typing2 ? 0 : 6} className={pokemonInformation.typingColor2}>
                                                    <div className='text-center'>{!pokemonInformation.Typing2 ? '' : pokemonInformation.Typing2}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col style={{ width: 'auto', border: 'none !important' }} className='d-flex justify-content-start mt-2'>
                                                    <Dropdown className='bgNone'>
                                                        <Dropdown.Toggle className={!pokemonInformation.typingColor1 ? '' : `bgNone ${pokemonInformation.PokemonCardColor}`}>
                                                            Moves
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto', border: 'none !important' }} className="dropdown-menu-right">
                                                            <div className='px-3'>{pokemonInformation.Moves}</div>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Col>
                                            </Row>
                                            <Card.Text>Evolutions: {!pokemonInformation.Evolution ? '' : pokemonInformation.Evolution.toUpperCase()}</Card.Text>
                                            <Card.Text>Pokedex ID: {pokemonInformation.Number}</Card.Text>
                                            <Card.Text>Abilities: {!pokemonInformation.Abilities ? '' : pokemonInformation.Abilities.toUpperCase()}</Card.Text>
                                            <Card.Text>Route: {pokemonInformation.Locale}</Card.Text>

                                        </Card.Body>
                                    </Card>
                                </div>

                                <div className='mt-5'>

                                </div>

                            </Col>

                        </Row>
                    </div>
                </Row>
            </Container >
        </body >
        </div>
    )
}
