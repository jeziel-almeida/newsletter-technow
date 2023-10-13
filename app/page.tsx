"use client"

import useSendEmail from '@/hooks/useSendEmail';
import Image from 'next/image';
import { SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import styles from './page.module.css';
import RightArrowIcon from '@/components/RightArrowIcon';


export default function Home() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { mutate, isError, isSuccess } = useSendEmail();

  useEffect(() => {
    if (!isSuccess) return;

    toast.success("Assinatura confirmada!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "dark",
    })
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) return;

    toastErro("Erro ao confirmar! Verifique seu email e tente novamente.");

  }, [isError])

  const toastErro = (title: string) => {
    toast.error(title, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "dark",
    })
  }

  const limparCampos = () => {
    const allInput = document.querySelectorAll('input');
    allInput.forEach((input) => input.value = '');
    setName('');
    setEmail('');

    const btnSubmit = document.getElementById('btn-submit');
    btnSubmit?.setAttribute("disabled", "true");
    setTimeout(() => btnSubmit?.removeAttribute("disabled"), 5000)
  }

  const validarInfo = () => {

    let emailRegex = /^(\w+[\.-]?\w+)@(\w+[\.-]?\w+)(\.\w{2,3})$/;

    if (name.length == 0) {
      toastErro("Nome vazio!");
      return false;
    }

    if (!emailRegex.test(email) || email.length == 0) {
      toastErro("Email inválido!");
      return false;
    }
   
    limparCampos();

    return true;
  }

  const submit = () => {

    if (validarInfo()) {

      mutate({
        email: email,
        name: name
      })
    }
  }

  return (
    <main className={styles.main}>

      <Image className={styles.profilePic} width={150} height={150} src="https://avatars.githubusercontent.com/u/82993547?v=4" alt="Foto de perfil de Jeziel Almeida" />

      <h1 className={styles.heading}>TechNow</h1>

      <p className={styles.paragraph}>Fique por dentro de tudo que acontece no mundo da tecnologia!</p>

      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          onChange={e => setName(e.target.value)}
          placeholder='Digite seu nome'
        />
        <div className={styles.inputSubmit}>
          <input
            className={styles.input}
            type="email"
            onChange={e => setEmail(e.target.value)}
            placeholder='Digite seu email'
          />
          <button onClick={submit} className={styles.btn} id="btn-submit">
            <RightArrowIcon />
          </button>
        </div>
      </div>

    </main>
  )
}