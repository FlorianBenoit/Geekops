import "./WodBanner.css";

const WodBanner = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className='home-ban flex flex-col justify-center items-center bg-cover bg-center text-white text-center py-24'>
      <h1 className='h1-wod text-2xl content-center md:text-4xl text-amber-500 mb-4'>{title}</h1>
      <p className='p-wod text-white text-2xl'>{desc}</p>
    </div>
  );
};

export default WodBanner;
