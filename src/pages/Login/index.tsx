function index() {
  return (
    <div className="relative min-h-screen px-16 bg-p-white">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src="/src/assets/Character.svg" alt="인하로운길 캐릭터" className="w-full" />
      </div>
      <div className="fixed flex flex-col gap-[10px] bottom-10 left-16 right-16">
        <button className="py-3 text-white bg-primary-600 rounded-12">로그인 없이 간편 사용하기</button>
        <button className="py-3 text-black bg-yellow-400 rounded-12">카카오 시작하기</button>
      </div>
    </div>
  );
}

export default index;
