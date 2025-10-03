import React, { useState } from "react";
import moviesData from "../data/movies.json";
import { Card, Button, Form, Row, Col, Modal } from "react-bootstrap";
import "../styles/cuevana.css";

export default function Media() {
  const [movies, setMovies] = useState(moviesData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    id: null, titulo: "", genero: "", director: "", productora: "", tipo: "", anio: "", sinopsis: "", imagen: ""
  });

  const filtered = movies.filter(m =>
    m.titulo.toLowerCase().includes(search.toLowerCase()) ||
    m.genero.toLowerCase().includes(search.toLowerCase()) ||
    m.director.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setNewMovie({ id: null, titulo: "", genero: "", director: "", productora: "", tipo: "", anio: "", sinopsis: "", imagen: "" });
    setShowModal(true);
  };

  const openEdit = (m) => {
    setNewMovie(m);
    setShowModal(true);
  };

  const handleSave = () => {
    if (newMovie.id) {
      setMovies(movies.map(x => x.id === newMovie.id ? newMovie : x));
    } else {
      setMovies([...movies, { ...newMovie, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (!confirm("¿Eliminar esta película?")) return;
    setMovies(movies.filter(m => m.id !== id));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Media</h2>
        <div>
          <Form.Control
            type="text"
            placeholder="Buscar por título, género o director..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 320, display: "inline-block", marginRight: 10 }}
          />
          <Button variant="success" onClick={openAdd}>➕ Agregar</Button>
        </div>
      </div>

      <Row>
        {filtered.map(movie => (
          <Col md={4} key={movie.id} className="mb-4">
            <Card>
              <div style={{ position: "relative" }}>
                <Card.Img variant="top" src={"/images/" + movie.imagen} style={{ height: 350, objectFit: "cover" }} />
                <div className="badge-4k">4K</div>
              </div>
              <Card.Body>
                <Card.Title>{movie.titulo}</Card.Title>
                <Card.Text>
                  <strong>Género:</strong> {movie.genero}<br/>
                  <strong>Director:</strong> {movie.director}<br/>
                  <strong>Productora:</strong> {movie.productora}<br/>
                  <strong>Tipo:</strong> {movie.tipo}<br/>
                  <strong>Año:</strong> {movie.anio}<br/>
                  <strong>Sinopsis:</strong> {movie.sinopsis}
                </Card.Text>
                <Button variant="warning" className="me-2" onClick={() => openEdit(movie)}>✏️ Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(movie.id)}>🗑️ Eliminar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{newMovie.id ? "Editar película" : "Agregar película"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Título</Form.Label>
                  <Form.Control value={newMovie.titulo} onChange={(e)=>setNewMovie({...newMovie,titulo:e.target.value})}/>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Género</Form.Label>
                  <Form.Control value={newMovie.genero} onChange={(e)=>setNewMovie({...newMovie,genero:e.target.value})}/>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Director</Form.Label>
                  <Form.Control value={newMovie.director} onChange={(e)=>setNewMovie({...newMovie,director:e.target.value})}/>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Productora</Form.Label>
                  <Form.Control value={newMovie.productora} onChange={(e)=>setNewMovie({...newMovie,productora:e.target.value})}/>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control value={newMovie.tipo} onChange={(e)=>setNewMovie({...newMovie,tipo:e.target.value})}/>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Año</Form.Label>
                  <Form.Control value={newMovie.anio} onChange={(e)=>setNewMovie({...newMovie,anio:e.target.value})}/>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Imagen (archivo en public/images)</Form.Label>
                  <Form.Control value={newMovie.imagen} onChange={(e)=>setNewMovie({...newMovie,imagen:e.target.value})}/>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label>Sinopsis</Form.Label>
              <Form.Control as="textarea" rows={3} value={newMovie.sinopsis} onChange={(e)=>setNewMovie({...newMovie,sinopsis:e.target.value})}/>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
