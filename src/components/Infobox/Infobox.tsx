const Infobox = ({ content }: { content: string }) => {
  return (
    <div className='flex justify-center items-center py-2 px-4 bg-green-400  text-black gap-2'>
      <div className='hover:cursor-pointer'></div>
      <p>{content}</p>
    </div>
  );
};

export default Infobox;
