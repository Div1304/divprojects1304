import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Marquee from '../components/Marquee';
import Editorial from '../components/Editorial';
import NewCollection from '../components/NewCollection';
import BestSellers from '../components/BestSellers';
import BrandStory from '../components/BrandStory';
import Reviews from '../components/Reviews';
import Newsletter from '../components/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Marquee />
      <Editorial />
      <NewCollection />
      <BestSellers />
      <BrandStory />
      <Reviews />
      <Newsletter />
    </>
  );
}
