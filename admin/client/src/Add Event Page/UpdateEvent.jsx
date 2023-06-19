import { useState, useEffect } from "react";
import axios from "axios";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

export const UpdateEvent = (props) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [eventLength, setEventLength] = useState(0);
  const [maxVolunteers, setMaxVolunteers] = useState(0);
  const [numberOfTrees, setNumberOfTrees] = useState(0);
  const [treePrice, setTreePrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [longitude, setLongitude] = useState(35.930359);
  const [latitude, setLatitude] = useState(31.963158);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 31.963158,
    lng: 35.930359,
  });
  const [markerKey, setMarkerKey] = useState(0); // Added markerKey state

  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCin20Um_kf5R-sj9QADNLFA_Kro06A8Mw",
    libraries,
  });

  const currentDate = new Date();

  // Calculate the minimum selectable date (a week from now)
  const minimumDate = new Date();
  minimumDate.setDate(currentDate.getDate() + 7);

  // Convert the minimum date to the desired format if needed (e.g., yyyy-mm-dd)
  const minimumDateString = minimumDate.toISOString().split("T")[0];

  useEffect(() => {
    if (latitude && longitude) {
      setMarkerPosition({ lat: latitude, lng: longitude });
      setMarkerKey((prevKey) => prevKey + 1); // Update markerKey to trigger re-rendering of Marker
    }
  }, [latitude, longitude]);

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleAutocompleteLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const handlePlaceSelect = () => {
    if (autocomplete !== null) {
      const addressObject = autocomplete.getPlace();
      const address = addressObject.formatted_address;
      setSelectedLocation(address);

      const { lat, lng } = addressObject.geometry.location;
      setLatitude(lat);
      setLongitude(lng);
      setMarkerPosition({ lat, lng });
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLatitude(lat);
    setLongitude(lng);
    setMarkerPosition({ lat, lng });
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const onLoad = (fileString) => {
    setImage(fileString);
  };
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const submitHandler = async (event) => {
    // console.log("aaaaa");
    event.preventDefault();
    // setName(event.target.name.value);
    // console.log(name);
    // setStartDate(event.target.startDate.value);
    // console.log(startDate);
    // setEventLength(event.target.eventLength.value);
    // console.log(eventLength);
    // setMaxVolunteers(event.target.maxVolunteers.value);
    // console.log(maxVolunteers);
    // setNumberOfTrees(event.target.numberOfTrees.value);
    // console.log(numberOfTrees);
    // setDescription(event.target.description.value);
    // console.log(description);
    // setTreePrice(event.target.treePrice.value);
    // console.log(treePrice);
    // // setImage(event.target.image.files[0]);

    // getBase64(event.target.image.files[0]);
    // console.log(image);

    // console.log(markerPosition);
    // console.log(selectedLocation);

    try {
      console.log(props.queryName);
      const response = await axios.put(
        `http://localhost:5500/update-event/${props.queryName}`,
        {
          name,
          startDate,
          eventLength,
          maxVolunteers,
          numberOfTrees,
          treePrice,
          description,
          image,
          location: {
            lat: markerPosition.lat,
            lng: markerPosition.lng,
          },
          locationName: selectedLocation,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    // 👇 Get input value from "event"
    setName(event.target.value);
  };
  const handleStartDateChange = (event) => {
    // 👇 Get input value from "event"
    setStartDate(event.target.value);
  };
  const handleEventLengthChange = (event) => {
    // 👇 Get input value from "event"
    setEventLength(event.target.value);
  };

  const handleMaxVolunteersChange = (event) => {
    // 👇 Get input value from "event"
    setMaxVolunteers(event.target.value);
  };
  const handleNumberOfTreesChange = (event) => {
    // 👇 Get input value from "event"
    setNumberOfTrees(event.target.value);
  };
  const handleTreePriceChange = (event) => {
    // 👇 Get input value from "event"
    setTreePrice(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    // 👇 Get input value from "event"
    setDescription(event.target.value);
  };
  const handleImageChange = (event) => {
    // 👇 Get input value from "event"
    setImage(event.target.value);
  };
  const handleLocationChange = (event) => {
    // 👇 Get input value from "event"
    setLocation(event.target.value);
  };
  const handleLocationNameChange = (event) => {
    // 👇 Get input value from "event"
    setLocationName(event.target.value);
  };

  return (
    <>
      <main className="p-4 px-8  h-auto pt-20 mt-8">
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label
              HtmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Event Name"
              required
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-6">
            <label
              HtmlFor="startDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              min={minimumDateString}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="mb-6">
            <label
              HtmlFor="eventLength"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Event Length
            </label>
            <input
              type="number"
              id="eventLength"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleEventLengthChange}
            />
          </div>
          <div className="mb-6">
            <label
              HtmlFor="maxVolunteers"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Max Number of Volunteers
            </label>
            <input
              type="number"
              id="maxVolunteers"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleMaxVolunteersChange}
            />
          </div>

          <div className="mb-6">
            <label
              HtmlFor="numberOfTrees"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Number of Trees
            </label>
            <input
              type="number"
              id="numberOfTrees"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleNumberOfTreesChange}
            />
          </div>
          <div className="mb-6">
            <label
              HtmlFor="treePrice"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tree Price
            </label>
            <input
              type="number"
              id="treePrice"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleTreePriceChange}
            />
          </div>
          <div className="mb-6">
            <label
              HtmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              require
              onChange={handleDescriptionChange}
            />
          </div>
          <div className=" mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              HtmlFor="image"
            >
              Upload Image
            </label>
            <input
              className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="image"
              name="image"
              type="file"
              onChange={(e) => getBase64(e.target.files[0])}
            />
          </div>
          <div>
            <div>
              <Autocomplete
                onLoad={handleAutocompleteLoad}
                onPlaceChanged={handlePlaceSelect}
              >
                <input type="text" placeholder="Enter your location" />
              </Autocomplete>
              <GoogleMap
                onLoad={handleMapLoad}
                mapContainerStyle={{ width: "100%", height: "400px" }}
                center={{ lat: latitude, lng: longitude }}
                zoom={17}
                onClick={handleMapClick}
              >
                {latitude && longitude && (
                  <Marker key={markerKey} position={markerPosition} />
                )}
              </GoogleMap>
              <div>
                Selected Location:{" "}
                {`${selectedLocation} ,${latitude},${longitude}`}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
          {/* location */}

          {/* location */}
        </form>
      </main>
    </>
  );
};

export default UpdateEvent;
