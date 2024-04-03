import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<'button'> {
  transparent?: boolean // a '?' após a propiedade indica que ela é opcional
}

export function IconButton({ transparent, ...props }: IconButtonProps) { // A declaração da prop 'transparent' de forma individual a exclui do conjunto '...props'
  return (
    <button 
      {...props} // Não contém a propiedade 'transparent'
      className={twMerge(
        'border border-white/10 rounded-md p-1.5', //Classes de todos os botões
        transparent ? 'bg-black/20' : 'bg-white/10', //Classes adicionais caso transparent seja true ou false
        props.disabled ? 'opacity-50' : null //Classe adicional caso o botão esteja desabilitado
      )}
    />
  )
}