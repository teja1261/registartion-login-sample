import React from "react";
import "./SwiperSub.css";

const SwiperSub = (props) => {
  return (
    // <h1>Swipersub</h1>
    <aside className="single-view-content">
      <ul className="team-info">
        {props.genderList.map((genderDetail, index) => {
          return (
            <li
              className={`team-info-item ${
                props.index === index ? "active" : ""
              }`}
              key={genderDetail.genderId}
            >
              <h1 className="heading">{genderDetail.genderName}</h1>
              <article className="content">
                <div className="wrap">
                  <img
                    className="img-fluid"
                    src={genderDetail.genderImage}
                    alt={genderDetail.genderName}
                  />
                  <div className="btn-set">
                    <button
                      className="change-name"
                      onClick={props.changeNameModal}
                    >
                      Change Name
                    </button>
                    <button
                      className="change-btn"
                      onClick={props.changeImageModal}
                    >
                      Change Image
                    </button>
                    <button className="add-gender" onClick={props.addGender}>
                      Add Gender
                    </button>
                    <button
                      className="delete-gender"
                      onClick={() => {
                        props.deleteGender(genderDetail.genderId);
                      }}
                    >
                      Delete Gender
                    </button>
                  </div>
                </div>
                <div className="count">
                  <p>
                    No of Categories
                    <span className="category-count">
                      {genderDetail.noOfCategories}
                    </span>{" "}
                  </p>
                  <p>
                    No of Sub-Categories
                    <span className="category-count">
                      {genderDetail.noOfSubcategories}
                    </span>{" "}
                  </p>
                  <p>
                    No of Styles
                    <span className="category-count">
                      {genderDetail.noOfStyles}
                    </span>{" "}
                  </p>
                </div>
                <div className="view-all">
                  <button
                    className="viewAll"
                    onClick={() =>
                      props.viewAllCategory(
                        genderDetail.genderId,
                        genderDetail.genderName
                      )
                    }
                  >
                    View All Category
                  </button>
                  <button className="addNew" onClick={props.addNewCategory}>
                    Add New Category
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      <div className="arrow-box">
        <div className="slidePrev" id="next">
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="slideNext" id="prev">
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
    </aside>
  );
};

export default SwiperSub;
