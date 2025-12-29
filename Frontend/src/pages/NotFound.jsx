import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import NotFoundContent from "../components/common/NotFoundContent";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 | Raj Enterprise</title>
      </Helmet>
      <div>
        <Navbar />
      </div>
      <div>
        <NotFoundContent />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
