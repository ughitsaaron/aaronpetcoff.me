import ReactMarkdown from 'react-markdown';
import { getPage } from '@/utils/getPage';

export default async function Home() {
  const data = await getPage('home');

  return (
    <div>
      <main className="home">
        <img
          src={`http://localhost:1337${data.photo.url}`}
          alt="me being very cool in rome, smoking a cigarette, leather jacket, slicked back hair, cool shades, sloppy steaks with the boys on weekends"
          width={460}
        />
        <h1>{data.subtitle}</h1>
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </main>
    </div>
  );
}
