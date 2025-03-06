// this is the home page of the application changes to the homepage can be made here

// enables graphQL queries to be made to the server via apollo client
import { useQuery } from '@apollo/client'; 

export default function Home() { 

    return (
        <main>
            <div className="home">
                <h1>🌠 Welcome to Caleus Framework! 🌠</h1>
                <br />
                <div className="home-img">
                    <img src="https://media.giphy.com/media/DyQrKMpqkAhNHZ1iWe/giphy.gif?cid=82a1493boi0qtei6fk4053oolyjicm28pwm83lghonanq8dv&ep=v1_gifs_trending&rid=giphy.gif&ct=g" alt="home" />
                </div>
                <br />
                <p> 🛸 This is the home page of the  MERN stack application leveraging GraphQL. 👽 </p>
            </div>  


        </main>
    );

};

