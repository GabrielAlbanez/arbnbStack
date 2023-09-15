import Cookies from 'js-cookie';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSessionLogin } from '../context/SessionLogin';
import { useTema } from '../context/Contexto';
import { FaCamera } from 'react-icons/fa'; // Importe o ícone desejado
import perfil from '../assets/imgs/perfilPadrão.avif';

export default function Account() {
  const { isLoggedIn, setisLoggedIn, dataUser, setDataUser } = useSessionLogin();
  const navigate = useNavigate();
  const { showModalPerfil, setShowModalPeril } = useTema();
  const local = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [img,setImg] = useState(null)
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!name && !email) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setDataUser({
        name: Cookies.get('name'),
        email: Cookies.get('email'),
      });
      setisLoggedIn(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (local.pathname === '/account') {
      setShowModalPeril(false);
    }
  }, []);

  const name = Cookies.get('name');
  const email = Cookies.get('email');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setImg(reader.result)
        console.log(img)
      };
      reader.readAsDataURL(file);
    }


 





  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };


  const updateImg = async () => {
    try {
      const data = { email, img }; // Crie um objeto com os campos email e img
      const dataJson = JSON.stringify(data)
      const response = await fetch("http://localhost:8080/updateImgPerfil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataJson, // Transforme o objeto em uma string JSON
      });
  
      const responseData = await response.json()
      console.log(responseData)
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
 
  console.log(dataUser)

  return (
    <div className="text-3xl p-8">
      {name && email ? (
        <div className="flex flex-col gap-6">
          <div className="relative w-[100px] h-[100px]">
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" className="object-cover w-full h-full rounded-lg" />
            ) : (
              <img src={perfil} alt="Default" className="object-cover w-full h-full rounded-lg" />
            )}
            {/* Botão de troca de imagem */}
            <button
              className="    absolute  top-0 left-16 bg-blue-500 text-white p-2 rounded-full"
              onClick={openFileInput}
            >
              <FaCamera size={25} />
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />

          <div>

            <h1>Welcome: {dataUser?.name}</h1>
            <h1>Email: {dataUser?.email}</h1>
            <button onClick={updateImg} className='border-[1px] rounded-xl border-rose-500'>att img</button>
          </div>
        </div>
      ) : (
        <>
          <h1>Você não está logado para acessar esta página</h1>
        </>
      )}
    </div>
  );
}
