import ReactMarkdown from "react-markdown";

const AUTHORIZATION_TOKEN = 'Bearer 9618739f9d5706ede853a05a5a40cb8219094a16ff0f27633f6a93f257a1c570202e3ce9d5754df16a0fba0065d5b702c02ba5b5d4ac7355430950430d6f73f72d86fe429f69d871d24b3358b2be1f5c94d122ede30cd90b3eb4cc3dbdfd96999b53c4e32700bce5131104b20d8b63d281e24b7fc1b57613c551e8199b9879a4';

export default async function Home() {
  const data = await fetch('http://localhost:1337/api/home?populate=*', { headers: { authorization: AUTHORIZATION_TOKEN } }).then(res => res.json()).then(res => res.data);
  return (
    <div>
      <main className="home">
        <img src={`http://localhost:1337${data.photo.url}`} alt="me being very cool in rome, smoking a cigarette, leather jacket, slicked back hair, cool shades, sloppy steaks with the boys on weekends" width={460} />
        <h1>{data.subtitle}</h1>
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </main>
    </div>
  );
}
