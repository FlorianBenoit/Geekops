import "./WodBanner.css";

const WodBanner = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className='home-ban bg-cover bg-center text-white text-center bg-[url("../../public/_f5b62787-7c12-442f-915d-36c164d9f892.jpg")] py-24'>
      <h1 className='h1-wod text-2xl content-center md:text-4xl font-hilogin text-amber-500 mb-4'>
        {title}
      </h1>
      <p className='p-wod text-white'>{desc}</p>
    </div>
  );
};

export default WodBanner;
