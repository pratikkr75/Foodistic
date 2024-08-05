import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFoodItem(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner">
            <div className='carousel-caption' style={{ zIndex: 10 }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
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
      </div>
      <div className='container'>
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div key={data.id} className='row mb-3'>
              <div className='fs-3 m-3'>{data.CategoryName}</div>
              <hr />
              {foodItem.length !== 0 ?
                foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.trim().toLocaleLowerCase())
                )).map(filterItems => {
                  return (
                    <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  )
                })
                :
                <div>No such data</div>
              }
            </div>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </div>
      <div><Footer /></div>
    </div>
  );
}
