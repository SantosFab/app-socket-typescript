import React, { useEffect } from "react";
import { getSocketInstance } from "../../server/instance/socket";

const socket = getSocketInstance();

interface InterfaceBeforeUnloand {
  piece?: string;
}

const useSocketBeforeUnloand = ({ piece }: InterfaceBeforeUnloand) => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      minhaFuncao();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const minhaFuncao = () => {
    // Sua função aqui
    console.log("Função chamada ao recarregar a página");
  };
};

export default useSocketBeforeUnloand;
