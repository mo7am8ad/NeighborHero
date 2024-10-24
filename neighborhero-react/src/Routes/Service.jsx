import React, { useState, useRef, useEffect } from "react";
import './Service.css';
import ServiceCard from "../components/serviceCard/serviceCard.jsx";
import downArrow from "../Assets/Logos/down-arrow.svg";
import newRequest from "../utils/newRequest.js";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

function Service() {
    const [sort, setSort] = useState("sales");
    const [open, setOpen] = useState(false);
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const minRef = useRef();
    const maxRef = useRef();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchParams = queryParams.toString();
    const category = queryParams.get("catigory");

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["Services", searchParams, category, sort, selectedDistricts],
        queryFn: () =>
            newRequest.get(`/service?${searchParams}&catigory=${category}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}&districts=${selectedDistricts.join(",")}`)
                .then((res) => {
                    return res.data;
                }),
    });

    useEffect(() => {
        refetch();
    }, [sort, searchParams, category, selectedDistricts]);

    const reSort = (type) => {
        setSort(type);
        setOpen(false);
    };

    const apply = () => {
        refetch();
    };

    const handleDistrictChange = (e) => {
        const { value, checked } = e.target;
        setSelectedDistricts((prevSelectedDistricts) =>
            checked
                ? [...prevSelectedDistricts, value]
                : prevSelectedDistricts.filter((district) => district !== value)
        );
    };

    return (
        <div>
            <div className="services">
                <div className="container">
                    <span className="breadcrumbs">NeighborHero &gt; {category || "all services"}</span>
                    <h1>{category || "All Services"}</h1>
                    <div className="menu">
                        <div className="left">
                            <span>Budget</span>
                            <input ref={minRef} type="number" placeholder="min"></input>
                            <input ref={maxRef} type="number" placeholder="max"></input>
                            <button onClick={apply}>Apply</button>
                        </div>

                        <div className="middle">
                            <div className="district-filters">
                                <h3>Filter by Districts</h3>
                                <div className="contDistrict"> 

                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Maltepe"
                                            onChange={handleDistrictChange}
                                        />
                                        Maltepe
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Üsküdar"
                                            onChange={handleDistrictChange}
                                        />
                                        Üsküdar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Kadikoy"
                                            onChange={handleDistrictChange}
                                        />
                                        Kadikoy
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Yenisahra"
                                            onChange={handleDistrictChange}
                                        />
                                        Yenisahra
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Gebze"
                                            onChange={handleDistrictChange}
                                        />
                                        Gebze
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="right">
                            <span className="sortBy">Sort By</span>
                            <span className="sortType">{sort === "sales" ? "Best Selling" : "Newest"}</span>
                            <img src={downArrow} onClick={() => setOpen(!open)} />
                            {open && <div className="rightMenu">
                                {sort === "sales" ? (
                                    <span onClick={() => reSort("createdAt")}>Newest</span>
                                ) : (
                                    <span onClick={() => reSort("sales")}>Best Selling</span>
                                )}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="ServiceCards">
                {isLoading ? "loading" : error ? "something went wrong!" 
                : data?.map((service) => (
                    <ServiceCard key={service._id} item={service} />
                ))}
            </div>
        </div>
    );
}

export default Service;
