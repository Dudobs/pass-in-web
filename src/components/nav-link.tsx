import { ComponentProps } from "react" // Tipagem que recebe como paramêtro uma tag HTML

// Sintaxe de typagem do TypeScript
interface NavLinkProps extends ComponentProps<'a'> { //A partir de agora, além das propiedades que eu definir, este componente irá se comportar como uma âncora(<a></a>) do HTML, tendo todas as propiedades que a mesma pode receber, e. g. 'href'; 'title'; 
  children: string
}

export function NavLink(props: NavLinkProps) {
  return (
    <a {...props} href="" className='font-medium text-sm'>{props.children}</a> // {...props} - Adiciona todas as propiedades do componente como atributos da âncora
  )
}