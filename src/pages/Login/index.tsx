import React from "react";
import kakaoLogin from "../../assets/kakaoLogin.svg";
import noLogin from "../../assets/noLogin.svg";
import character from "../../assets/character.svg";
import { useNavigate } from "react-router-dom";

function index() {
  const navvigate = useNavigate();

  const handleNoLogin = () => {
    navvigate("/");
  };
  return (
    <div className="flex flex-col min-h-screen px-24 pt-60">
      <div className="flex items-center justify-center flex-1">
        <img src={character} alt="LoginCharacter" className="w-[300px]" />
      </div>
      <div className="flex flex-col gap-12 pb-40">
        <img src={noLogin} onClick={handleNoLogin} alt="NoLoginBtn" className="w-full cursor-pointer" />
        <img src={kakaoLogin} alt="KakaoBtn" className="w-full cursor-pointer" />
      </div>
    </div>
  );
}

export default index;
