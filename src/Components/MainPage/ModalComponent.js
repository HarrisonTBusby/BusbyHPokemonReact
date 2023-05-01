import React, { useState } from 'react';
import { Modal, Row, Col, Card, Dropdown } from 'react-bootstrap';
import { getLocalStorage, removeFromLocalStorage } from '../../Services/LocalStorage';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalComponent() {
  const [showModal, setShowModal] = useState(false);
  const [dataActual, setDataActual] = useState([]);
  let data = getLocalStorage();

  const handleClick = () => {
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleInformation = (x) => {
    if (data) {
      setDataActual(x);
    }
  }

  const handleRemove = (value) => {
    const existingList = JSON.parse(localStorage.getItem('Favorites')) || [];
    const index = existingList.findIndex(obj => obj.Name === value.Name);
  
    if (index > -1) {
      existingList.splice(index, 1);
      localStorage.setItem('Favorites', JSON.stringify(existingList));
    }
  };

  return (
    <>
      <button onClick={handleClick} className='favBtn'>Get Favorites</button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='mt-2'>
            <div className='scrollable-container' style={{ maxHeight: '300px', overflowY: 'none', width:'400px' }}>
              {data.map((x) => (
                <Row key={x.id} className='d-flex justify-content-center'>
                  <button className='favoritesItems mt-2' onClick={() => handleInformation(x)}>
                    {x.Name}
                  </button>
                  <button onClick={() => handleRemove(x)} className='favoritesDelete'>Remove</button>
                </Row>
              ))}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-center'>
            <Row>
              <Col className={!dataActual.ShinySprite ? 'col-12' : ''}>
                <Card.Img variant="top" style={{ width: 200, height: 200 }} src={dataActual.Sprite} />
              </Col>
              <Col className={!dataActual.ShinySprite ? 'col-0' : ''}>
                <Card.Img variant="top" style={{ width: 200, height: 200 }} src={dataActual.ShinySprite} />
              </Col>
            </Row>
          </div>
          <Card.Title className='mt-2'>{!dataActual.Name ? '' : dataActual.Name.toUpperCase()}</Card.Title>
          <Dropdown className='mt-5 bgNone'>
            <Dropdown.Toggle style={{ backgroundColor: 'grey', border: 'none' }} id="dropdown-basic">
              Moves
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className='px-3 dropdown-menu-center'>{dataActual.Moves}</div>
            </Dropdown.Menu>
          </Dropdown>
          <Card.Text>Evolutions: {!dataActual.Evolution ? '' : dataActual.Evolution.toUpperCase()}</Card.Text>
          <Card.Text>Pokedex ID: {dataActual.Number}</Card.Text>
          <Card.Text>Abilities: {dataActual.Abilities}</Card.Text>
          <Card.Text>Route: {dataActual.Locale}</Card.Text>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <button onClick={handleClose} className='favoritesItems'>Close</button>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}