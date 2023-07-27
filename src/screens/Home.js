import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [juiceCat, setjuiceCat] = useState([]);
  const [juiceItem, setjuiceItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/juiceData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setjuiceItem(response[0]);
    setjuiceCat(response[1]);
    console.log(response[0],response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ObjectFit:"contain !important"}}>
  <div className="carousel-inner" id="carousel">
    <div class="carousel-caption" style={{zIndex:"10"}}>
    <div class="d-flex justify-content-center">
      <input className="form-control me-2 bg-dark text-warning" type="search" placeholder="Search" aria-label="Search" value ={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success bg-success text-white" type="submit">Search</button> */}
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/700×700/?apples" className="d-block w-100" style={{filter:"brightness(30%)" }} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/700×700/?mangoes" className="d-block w-100" style={{filter:"brightness(30%)" }} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/700×700/?tomatoes" className="d-block w-100" style={{filter:"brightness(30%)" }} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
  </div>
      </div>
      <div className="container">
        {   
          juiceCat !== []
          ? juiceCat.map((data) => {
            return ( <div className="row mb-3">
              <div key={data._id} className="fs-3 m-3 text-warning">{data.CategoryName}</div>
              <hr/>
              {juiceItem !== []
              ? juiceItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
              .map(filterItems => {
                return (
                  <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                    <Card juiceItem = {filterItems}
                    options= {filterItems.options[0]}
                    imgSrc= {filterItems.img}></Card>
                  </div>
                )
              }) : <div>No such data found</div>}
              </div>
            )
          })
          : ""
        }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
  }
