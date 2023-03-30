import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [animal, setAnimal] = useState('');

  const [names, setNames] = useState([]);

  return (
    <div>
      <Head>
        <title>Pet Namer</title>
      </Head>
      <main className="m-4">
        <h3 className="">Name my Pet</h3>
        <form>
          <input
            type="text"
            name="animal"
            value={animal}
            placeholder="Enter an animal"
            onChange={(event) => {
              setAnimal(event.target.value)
            }}
            className="text-3xl border-2 p-4 my-2"
          />
          <button
            type="submit"
            className="ml-2 text-xl border-1 bg-slate-100 p-4 rounded"
            onClick={async e => {
              e.preventDefault();
              try {
                const response = await fetch("/api/generate", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ animal }),
                });
                const data = await response.json();
                if (response.status === 200) {
                  setNames(data.result);
                  setAnimal("");
                }
              } catch (error) {
                console.error(error);
              }
            }}>Generate names</button>
        </form>
        {names && (
          <div className="my-2">
            {names.map(name => <div key={name} className="ml-2">{name}</div>)}
          </div>
        )}
      </main>
    </div>
  )
}