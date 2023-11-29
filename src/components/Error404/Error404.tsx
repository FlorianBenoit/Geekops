import "./Error404.css";

const Error404 = () => {
  return (
    <div
      className='error bg-cover h-screen text-black flex flex-col justify-center p-6'
      style={{
        backgroundImage: "url('public/_e2b4bf30-7d32-449b-b733-91ef7213eee1.jpg')",
      }}>
      <h1 className='ban-text text-2xl content-center md:text-4xl font-hilogin text-amber-500 mb-4'>
        Oups ! Il semble que la page que vous cherchez n' existe pas !
      </h1>
    </div>
  );
};

export default Error404;
