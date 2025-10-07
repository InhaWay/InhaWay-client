import { useNavigate } from 'react-router-dom';


function index() {
  const navigate = useNavigate();

  const handleLoginSkip = () => {
    navigate('/');
  }
  const handleKakaoLogin = () => {
    console.log("카카오 로그인 버튼 클릭");
  }
  return (
    <div className="relative min-h-screen px-16 bg-p-white">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src="/src/assets/Character.svg" alt="인하로운길 캐릭터" className="w-full" />
      </div>
      <div className="fixed flex flex-col gap-[10px] bottom-10 left-16 right-16">
        <button onClick={handleLoginSkip} className="py-16 text-white text-17 bg-primary-600 rounded-12">
          로그인 없이 간편 사용하기
        </button>
        {/* <button className="py-3 text-black bg-yellow-400 rounded-12">카카오 시작하기</button> */}
        <button 
          className="w-full" 
          onClick={handleKakaoLogin}
        >
          <img src="/src/assets/Kakao-login-btn.svg" alt="카카오 시작하기" className="w-full" />
        </button>
      </div>
    </div>
  );
}

export default index;
