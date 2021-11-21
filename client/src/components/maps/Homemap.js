import React, { Component } from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import userData from './data'
import './homemap.css'
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function Homemap(props) {
	const [stores, setStores] = useState([]);
	const [showPopup, togglePopup] = useState(null);
	const [viewport, setViewport] = useState({
		width: "95%",
		height: "95%",
		latitude: 21.7679,
		longitude: 78.8718,
		zoom: 3.5
	});
	const mapRef = useRef();
	const handleViewportChange = useCallback(
		(newViewport) => setViewport(newViewport),
		[]
	);

	const handleGeocoderViewportChange = useCallback(
		(newViewport) => {
			const geocoderDefaultOverrides = { transitionDuration: 1000 };

			return handleViewportChange({
				...newViewport,
				...geocoderDefaultOverrides
			});
		},
		[handleViewportChange]
	);

	useEffect(() => {
		setStores(props.value);
		if (props && props.value.length>0) {
			handleGeocoderViewportChange({
				width: "95%",
				height: "95%",
				latitude: parseFloat(props.value[0].latitude),
				longitude: parseFloat(props.value[0].longitude),
				zoom: 6
			});
		}
	}, [props.value]);

	return (
		<ReactMapGL
			className="mapView"
			ref={mapRef}
			{...viewport}
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
			onViewportChange={handleViewportChange}
			mapStyle="mapbox://styles/skgupta77159/ckrodymtt4fuj17mvlpbwydpq"
		>
			{/* <Geocoder
				mapRef={mapRef}
				onViewportChange={handleGeocoderViewportChange}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
				position="top-left"
			/> */}
			{
				stores.map((data) => {
					return (
						<div key={data._id}>
							<Marker latitude={parseFloat(data.latitude)} longitude={parseFloat(data.longitude)} offsetLeft={-20} offsetTop={-10}>
								<i className="fas fa-clinic-medical" style={{ fontSize: "20px", color: '#ff0000' }} onClick={() => togglePopup(data._id)}></i>
								{/* <i className="fas fa-map-marker-alt" ></i> */}
							</Marker>
							{
								(data._id === showPopup) && <Popup
									latitude={parseFloat(data.latitude)}
									longitude={parseFloat(data.longitude)}
									closeButton={true}
									closeOnClick={false}
									onClose={() => togglePopup(null)}
									anchor="bottom" >
									<div><b>{data.storeName}</b></div>
									<div>{data.storeAddress}</div>
								</Popup>
							}

						</div>
					)
				})
			}
		</ReactMapGL>
	)
}

export default Homemap;