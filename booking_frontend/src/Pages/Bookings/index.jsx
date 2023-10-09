import React from "react";
import CompletedBookings from "./CompletedBookings";
import UpComingBookings from "./UpComingBookings";
import "./style.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import Loading from "react-loading";

const Bookings = () => {
  let loaderType = "spin";
  const moment = require("moment");
  const navigatesTo = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("completed");
  const [bookedHotels, setBookedHotels] = useState([]);
  const [userCompletedBookings, setUserCompletedBookings] = useState([]);
  const [userUpComingBookings, setUserUpComingBookins] = useState([]);
  const [selectedFav, setSelectedFav] = useState(false);

  let loginUser = JSON.parse(localStorage.getItem("loggedUser"));

  function onCompleted(status) {
    setSelectedTab(status);
    setLoading(true);
    navigatesTo(`/Booking.com/user/naidu/profile/bookings?status=completed`);
  }

  function onUpcoming(status) {
    setSelectedTab(status);
    setLoading(true);
    navigatesTo(`/Booking.com/user/naidu/profile/bookings?status=upcoming`);
  }

  const GetAllHotel = async (user) => {
    let completedBooking = [];
    let upComingBooking = [];
    await Promise.all(
      user.BookingDetails.map((each) => {
        let BookingEndDate =
          each.unavailableDates[each.unavailableDates.length - 1];
        BookingEndDate = moment(BookingEndDate, "DD/MM/YYYY");
        BookingEndDate = BookingEndDate.toISOString();

        const daysDiff = Math.floor(
          (new Date(BookingEndDate).getTime() - new Date().getTime()) /
            (24 * 60 * 60 * 1000)
        );

        if (daysDiff < 0) {
          completedBooking.push(each);
        } else {
          upComingBooking.push(each);
        }
      })
    );

    setUserCompletedBookings(completedBooking);
    setUserUpComingBookins(upComingBooking);

    if (selectedTab === "completed") {
      return completedBooking;
    } else {
      return upComingBooking;
    }
  };

  const getdataBasedOnStatus = async (hotels) => {
    if (hotels.length === 0) {
      setLoading(false);
      setBookedHotels([]);
      return;
    }
    const BookedhotelsArray = [];
    await Promise.all(
      hotels.map(async (each, i) => {
        try {
          const res = await fetch(
            `http://localhost:3001/hotels/user/booked?hotelIds=${each.hotelId}`
          );
          let bookedHotel = await res.json();

          // console.log({ ...bookedHotel[0], ...each }, "testing");
          // BookedhotelsArray.push(bookedHotel[0]);
          BookedhotelsArray.push({ ...bookedHotel[0], ...each });
        } catch (err) {
          console.log(err);
        }
      })
    );
    setLoading(false);
    setBookedHotels(BookedhotelsArray);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/users/${loginUser._id}`)
      .then((res) => {
        return res.json();
      })
      .then(async (res) => {
        let hotels = await GetAllHotel(res);
        getdataBasedOnStatus(hotels);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedTab]);

  return (
    <>
      <div className="bookings_container">
        <button
          className={
            selectedTab === "completed"
              ? "booking_status active_status"
              : "booking_status"
          }
          onClick={() => onCompleted("completed")}
        >
          completed
        </button>
        <button
          className={
            selectedTab === "upcoming"
              ? "booking_status active_status"
              : "booking_status"
          }
          onClick={() => onUpcoming("upcoming")}
        >
          upcoming
        </button>
      </div>
      {/* <div className="booked_hotels_container">
        {!loading ? (
          bookedHotels?.map((each, i) => {
            return (
              <div
                className="hotel_item"
                key={`${each._id}${i}`}
                style={{ width: "40vw", marginLeft: "100px" }}
              >
                <div>
                  <img
                    src={each.photos[0]}
                    className="hotel_img"
                    style={{ width: "200px" }}
                    onClick={(id) => navigatesToHotel(each)}
                  />
                  <svg
                    // onClick={() => addTouserFav(each._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart icon-fav"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                </div>

                <div>
                  <div className="hotel_heading_contiainer">
                    <div>
                      <h6 style={{ color: "#1e4276", maxWidth: "270px" }}>
                        {each.name}
                      </h6>
                      <p>500m from {each.landmark} </p>
                    </div>
                  </div>
                  <div>
                    <button className="button_style">Free Airport taxis</button>
                    {"  "}{" "}
                  </div>
                  <div className="desc_container">
                    <div className="">
                      <p className="para">
                        Studio Apartment with Air Conditioning
                      </p>
                      <p style={{ fontSize: "14px", maxWidth: "350px" }}>
                        {each.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="loader_container">
            <ReactLoading type={loaderType} color="#003580" />
          </div>
        )}
      </div> */}

      {!loading ? (
        selectedTab === "completed" ? (
          <CompletedBookings completedBookingsData={bookedHotels} />
        ) : (
          <UpComingBookings upcomingBookingsData={bookedHotels} />
        )
      ) : (
        <div className="loader_container">
          <ReactLoading type={loaderType} color="#003580" />
        </div>
      )}
    </>
  );
};

export default Bookings;
