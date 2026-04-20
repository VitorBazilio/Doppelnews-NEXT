import { Inter } from "next/font/google";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainPage from "./components/news/MainPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Header title="DoppelNews" />
      <MainPage />
      <Footer />
    </div>
  );
}
