import Carousel from '../components/Carousel';

const Home = () => (
  <div className="pt-20">
    <Carousel />
    <section className="p-6 text-center">
      <h2 className="text-3xl font-semibold mb-4">Welcome to Housing Co.</h2>
      <p className="text-gray-600">We build homes that last for generations.</p>
    </section>
  </div>
);

export default Home;
