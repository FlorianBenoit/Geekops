import { useEffect, useState } from "react";

const WodSocialBlock = ({
  comments,
}: {
  comments: { id: number | null; content: string }[];
}) => {
  const [haveComments, setHaveComments] = useState(false);

  useEffect(() => {
    if (comments.length != 0) {
      setHaveComments(true);
    }
  }, [comments]);

  return (
    <div className='flex flex-col items-center justify-center px-6'>
      <h3 className='mb-2 flex justify-center text-lg font-semibold'>
        Commentaires de la communauté
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='icone w-6 h-6'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
          />
        </svg>
      </h3>
      <div>
        {haveComments &&
          comments.map((comment) => (
            <div key={comment.id} className='flex flex-col items-start mb-3'>
              <span>@Bobby le 7 juillet 2012.</span>
              <p className="text-left m-0 italic before:content-['&laquo;'] after:content-['&raquo;']">
                {comment.content}
              </p>
            </div>
          ))}
        {!haveComments && <p>Aucun commentaire pour le moment.</p>}
      </div>
    </div>
  );
};

export default WodSocialBlock;
