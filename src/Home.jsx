import { useEffect, useState } from "react";
import api from "../api";
import CelebrityCard from "../components/CelebrityCard";

export default function Home() {
  const [celebs, setCelebs] = useState([]);

  useEffect(() => {
    api.get("/celebrities").then(res => setCelebs(res.data));
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {celebs.map(c => (
        <CelebrityCard key={c._id} name={c.name} image={c.image} />
      ))}
    </div>
  );
}
