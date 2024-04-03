import nlwUniteIcon  from '../assets/nlw-unite-icon.svg' //Importação de imagens é feita assim como arquivos
import { NavLink } from './nav-link'

export function Header() {
  return (
    <div className='flex items-center gap-5 py-2'>
      { <img src={nlwUniteIcon} /> /* Todo código JavaScript em um código HTML, deve estar entre {chaves}*/ }

      <nav className='flex items-center gap-5'>
        <NavLink>Eventos</NavLink> {/*Para conseguir por um conteúdo em um componente no React, devemos usar a porpiedade children: './nav-link.tsx'*/}
        <NavLink>Participante</NavLink>
      </nav>
    </div> 
  )
}