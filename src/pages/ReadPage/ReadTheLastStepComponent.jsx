import React, { useState, useEffect } from "react";
import axios from "axios";

import "./read.css";
const ReadTheLastStepComponent = () => {
  const cloudProvider = "http://127.0.0.1:4211";
  const [p, setP] = useState(1);
  const [chapters, setChapters] = useState([]);
  const [collection, setCollection] = useState([]);
  const [chosen, setChosen] = useState(false);
  const [doubleView, setDoubleView] = useState(false);
  const [longScroll, setLongScroll] = useState(false);
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState(false);

  const findAllMangaTitles = async () => {
    try {
      const response = await returnMangaTitles();
      setChapters(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch manga titles:", error);
    }
  };

  useEffect(() => {
    findAllMangaTitles();
  }, []);

  // event handlers and logic functions
  const back = () => {
    setChosen(false);
    setCollection([]);
  };
  const getAll = async (bookId) => {
    try {
      const response = await findDaBook(bookId);
      console.log(response);
      const data = await response.json();
      setCollection(data);
      setChosen(true);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const longToggle = () => setLongScroll((prevState) => !prevState);
  const doubleToggle = () => {
    setP((currentP) => {
      if (currentP > 1 && currentP < 3) {
        return 1;
      } else if (currentP === collection.length) {
        return collection.length % 2 === 0
          ? collection.length - 1
          : collection.length;
      } else if (currentP % 2 === 0) {
        return currentP - 1;
      }
      return currentP; // Return currentP by default if none of the conditions match
    });

    setDoubleView(true);
    setLongScroll(false);
  };

  const singleToggle = () => {
    setDoubleView(false);
    setLongScroll(false);
  };

  const previous = () => {
    setP((currentP) => (currentP === 1 ? currentP : currentP - 1));
  };

  const next = () => {
    setP((currentP) =>
      currentP === collection.length ? currentP : currentP + 1
    );
  };

  const previous2 = () => {
    setP((currentP) => (currentP === 1 ? currentP : currentP - 2));
  };

  const next2 = () => {
    setP((currentP) =>
      currentP >= collection.length - 1 ? currentP : currentP + 2
    );
  };
  const parseStrapiMangaTitles = (json) => {
    const titles = json.data;
    console.log(titles);
    return titles.map((t) => ({
      id: t.id,
      mangaTitle: t.attributes.mangaTitle,
      TitlePage: t.attributes.TitlePage.data.attributes.url,
    }));
  };

  const parseStrapiMangaBook = (json) => {
    const { mangaTitle, pages } = json.data.attributes;
    return {
      mangaTitle,
      pages: pages.map((p) => ({
        page: p.pageNumber,
        image: p.pageImage.data.attributes.url,
      })),
    };
  };

  const findDaBook = async (mangaId) => {
    try {
      const data = await returnMangaContents(mangaId);
      const parsed = parseStrapiMangaBook(data);
      console.log(parsed);
      setCollection((prevCollection) => [...prevCollection, ...parsed.pages]);
      setTitle(parsed.mangaTitle);
      console.log(collection);
    } catch (error) {
      console.error(error);
    } finally {
      setLoaded(true);
      setChosen(true);
    }
  };

  const returnMangaContents = async (mangaId) => {
    try {
      const response = await axios.get(
        `${cloudProvider}/api/manga-books/${mangaId}?populate[0]=pages.pageImage`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching manga contents:", error);
      throw error; // Re-throw or handle as needed
    }
  };

  const returnMangaTitles = async () => {
    console.log("Returning manga titles ", `${cloudProvider}/api/manga-books`);
    try {
      const response = await axios.get(
        `${cloudProvider}/api/manga-books/?populate[0]=TitlePage`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching manga titles:", error);
      throw error; // Re-throw or handle as needed
    }
  };

  // Render logic based on state
  return (
    <div>
      {!chosen ? (
        <div>
          {!chosen && (
            <div
              className="background"
              style={{
                overflowY: "auto",
                height: "fit-content",
                minHeight: "95vh",
              }}
            >
              <div
                className="container-lg stripe-2 centerparent"
                style={{
                  backgroundColor: "#4d5964",
                  height: "100%",
                  minHeight: "95vh",
                }}
              >
                {}
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="row"
                    style={{ paddingTop: "5px" }}
                  >
                    <div
                      className="col-8 card centerchild"
                      style={{
                        paddingInline: "20px",
                        backgroundColor: "#212529",
                        margin: "auto",
                        height: "100%",
                      }}
                    >
                      <table className="table table-striped table-dark table-hover">
                        <thead>
                          <tr>
                            <th>Chapter {chapter.id}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="chapters" style={{ height: "70px" }}>
                            <td>
                              <div
                                style={{
                                  height: "100px",
                                  overflow: "hidden",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={
                                    cloudProvider +
                                    chapter.attributes.TitlePage.data.attributes
                                      .url
                                  }
                                  style={{
                                    height: "120px",
                                    objectFit: "cover",
                                  }}
                                  alt="TitlePage"
                                />
                                <button
                                  className="btn btn-outline-success"
                                  style={{
                                    minWidth: "300px",
                                    width: "fit-content",
                                  }}
                                  onClick={() => findDaBook(chapter.id)}
                                >
                                  <span
                                    className="StepText"
                                    style={{
                                      textDecoration: "none",
                                      color: "white",
                                      fontWeight: "bold",
                                      fontSize: "larger",
                                    }}
                                  >
                                    {chapter.attributes.mangaTitle}
                                  </span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {chapters.map((chapter) => (
            <div key={chapter.id} onClick={() => findDaBook(chapter.id)}>
              {chapter.title}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {
            // single page view:
            <div>
              {chosen && (
                <div>
                  {collection.map((page, index) => (
                    <div key={index} style={{ textAlign: "center" }}>
                      <img
                        src={cloudProvider + page.image}
                        alt={`Page ${page.page}`}
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <button onClick={previous} disabled={p === 1}>
                      Previous
                    </button>
                    <button onClick={next} disabled={p === collection.length}>
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default ReadTheLastStepComponent;
