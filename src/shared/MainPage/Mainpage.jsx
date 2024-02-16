import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowService } from "../WindowServiceContext"; // Import the hook

import "./Mainpage.css";

const Mainpage = () => {
  const { width, height, isMobile } = useWindowService();
  const navigate = useNavigate();

  const read = () => {
    navigate("/Read/TheLastStep");
  };

  const more = () => {
    navigate("/Read/More");
  };

  useEffect(() => {
    const addTooltipEvents = (id, tooltipId) => {
      const element = document.getElementById(id);
      const tooltip = document.getElementById(tooltipId);
      if (element && tooltip) {
        const mouseOverHandler = () => tooltip.classList.add("tooltipHover");
        const mouseOutHandler = () => tooltip.classList.remove("tooltipHover");

        element.addEventListener("mouseover", mouseOverHandler);
        element.addEventListener("mouseout", mouseOutHandler);

        // Return a cleanup function to remove the event listeners
        return () => {
          element.removeEventListener("mouseover", mouseOverHandler);
          element.removeEventListener("mouseout", mouseOutHandler);
        };
      }
      // In case the element or tooltip doesn't exist, return an empty cleanup function
      return () => {};
    };
    const cleanupFunctions = [
      addTooltipEvents("read", "tooltipRead"),
      addTooltipEvents("shop", "tooltipShop"),
      addTooltipEvents("more", "tooltipMore"),
    ];
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [isMobile]);

  return (
    <div className="background">
      <div className="bannerTopHome">
        <div className="titleGradient"></div>
      </div>
      <div className="container-fluid h-100 d-flex flex-column">
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <div
            className="card"
            style={{
              transform: "translateY(80px)",
              maxWidth: "70%",
              width: "70%",
              minWidth: "320px",
              height: "fit-content",
              backgroundColor: "#262b33",
            }}
          >
            <div
              className="card-body"
              style={{
                width: "100%",
                height: "fit-content",
                alignItems: "center",
                paddingTop: "10px",
              }}
            >
              {!isMobile ? (
                <>
                  <div className="row justify-content-center">
                    <div id="tooltipRead" className="tooltip">
                      Read The Last Step
                    </div>
                    <a className="read btn" id="read" onClick={read}></a>
                  </div>

                  <div className="row justify-content-center">
                    <div id="tooltipShop" className="tooltip">
                      Get Last Step Merch
                    </div>
                    <a
                      className="shop btn"
                      id="shop"
                      href="https://www.etsy.com/shop/StepMangaShop"
                      target="_blank"
                    ></a>
                  </div>

                  <div className="row justify-content-center">
                    <div id="tooltipMore" className="tooltip">
                      Learn More About Step
                    </div>
                    <a className="more btn" id="more" onClick={more}></a>
                  </div>
                </>
              ) : (
                <>
                  <div className="row justify-content-center">
                    <a className="readM btn" onClick={read}></a>
                  </div>

                  <div className="row justify-content-center">
                    <a
                      className="shopM btn"
                      href="https://www.etsy.com/shop/StepMangaShop"
                      target="_blank"
                    ></a>
                  </div>

                  <div className="row justify-content-center">
                    <a className="moreM btn" onClick={more}></a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
