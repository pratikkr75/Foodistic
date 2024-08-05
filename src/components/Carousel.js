import React, { useEffect } from 'react';
import { Carousel } from 'bootstrap';

export default function CarouselComponent() {
  useEffect(() => {
    const carouselElement = document.querySelector('#carouselExampleFade');
    const carousel = new Carousel(carouselElement, {
      interval: 3000,
      wrap: true
    });

    return () => {
      carousel.dispose();
    };
  }, []);

  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
      <div className="carousel-inner">
        <div className='carousel-caption' style={{ zIndex: 10 }}>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
          </form>
        </div>
        <div className="carousel-item active">
          <img src="/burger.jpg" className="d-block w-100" style={{ filter: "brightness(30%)", maxWidth: '1700px', maxHeight: '700px', objectFit: 'cover' }} alt="Burger" />
        </div>
        <div className="carousel-item">
          <img src="/pizza.jpg" className="d-block w-100" style={{ filter: "brightness(30%)", maxWidth: '1700px', maxHeight: '700px', objectFit: 'cover' }} alt="Pizza" />
        </div>
        <div className="carousel-item">
          <img src="/momos.jpg" className="d-block w-100" style={{ filter: "brightness(30%)", maxWidth: '1700px', maxHeight: '700px', objectFit: 'cover' }} alt="Momos" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
