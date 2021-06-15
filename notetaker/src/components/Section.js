import React from 'react'
import Card from "../components/Card"
import { useState, useEffect } from "react"

const Section = ({ genre }) => {
    const [movies, setMovies] = useState(null)
    const [pageState, setPageState] = useState(null)
    console.log(pageState)

    const fetchData = async () => {
        const response = await fetch("/.netlify/functions/getMovies", {
            method: "POST",
            body: JSON.stringify({ genre: genre, pageState: pageState })
        })
        const responseBody = await response.json()
        setMovies(responseBody.data.movies_by_genre.values)

        setPageState(responseBody.data.movies_by_genre.pageState)


    }

    useEffect(() => {

        fetchData();
    }, [])
    return (
        <>
            <div>
                <h2 id={genre}> {genre}</h2>
            </div>
            {movies && (
                <div className="movie-section">
                    {movies.map((movie, index) => (
                        <Card key={index} movie={movie} />
                    ))}
                    <div className="more-button" onClick={() => {
                        setPageState(pageState)
                        fetchData()
                    }}></div>
                </div>
            )}
        </>
    )
}

export default Section
