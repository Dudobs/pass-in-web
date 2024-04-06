import { ChangeEvent, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

import { IconButton } from './icon-button';
import { Table } from './table/table';
import { TableHeader } from './table/table-header';
import { TableCell } from './table/table-cell';
import { TableRow } from './table/table-row';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

interface attendees {
  id: string,
  name: string,
  email: string,
  createdAt: string,
  checkedInAt: string | null
}

export function AttendeeList() {
  //ESTADO TOTAL ########################## (total de páginas)
  const [total, setTotal] = useState(0)

  //ESTADO SEARCH ##########################
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('query')) { //Verifica se na URL, há o parâmetro 'query'
      return String(url.searchParams.get('query')) ?? '' //Se sim, retorna o valor do parâmetro como uma string: String(url...) | Se há o parâmtero 'query' e ele for nulo, retorna uma string vazia
    }
    
    return '' //Se não, retorna uma string vazia (sem consulta)
  })

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())
    
    url.searchParams.set('query', search)
  
    window.history.pushState({}, "", url) 
  
    setSearch(search)
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) { // '/react-notes ln 14'
    setCurrentSearch(event.target.value)
    setPage(1)
  }
  
  //ESTADO PAGE ##########################
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())
    
    if (url.searchParams.has('page')) { //Verifica se na URL, há o parâmetro 'page'
      return Number(url.searchParams.get('page')) //Se sim, retorna o valor do parâmetro como um número: Number(url...)
    }
    
    return 1 //Se não, retorna 1 (primeira página)
  })
  
  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString()) //Salva na variável 'url' a URL atual na forma de string
    
    url.searchParams.set('page', String(page)) //Define o parâmetro 'page' á URL

    window.history.pushState({}, "", url) 

    setPage(page) //Define o estado 'page' como sendo o mesmo do parâmetro na URL
  }
  
  const totalPages = Math.ceil(total / 10)

  function goToFirstPage() {
    setCurrentPage(1)
  }

  function goToPreviousPage() {
    setCurrentPage(page -1)
  }

  function goToNextPage() {
    setCurrentPage(page + 1)
  }

  function goToLastPage() {
    setCurrentPage(totalPages)
  }

  //ESTADO ATTENDEES ##########################
  const [attendees, setAttendees] = useState<attendees[]>([]) //Lista de participantes que virão da API
  //Precisamos passar o tipo desse array. Dentro do generic, antes do Array, passamos o tipo de dados que contêm o Array, e que ele é do tipo Array.

  useEffect(() => {
    //A URL estava ficando grande com a adição dos parâmetros, por isso vamos quebra-la um pouco
    const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees') //Base da URL

    //Os parâmetros "pageIndex", "query", etc. já foram definidos na construção da rota
    url.searchParams.set('pageIndex', String(page - 1)) // .searchParams.set define os parâmetros da URL, tendo como parâmetros o nome do parãmetro e a definição do próprio
    if (search.length > 0) {
      url.searchParams.set('query', search)
    }

    fetch(url) //Acessa a API
      .then(response => response.json()) //Converte o resultado em JSON
      .then(data => {
        console.log(data)
        setAttendees(data.attendees)
        setTotal(data.total) //Além dos participantes e seus dados, a API tambémm retorna o total de participantes de um evento
      })
  }, [page, search])

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participante</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInputChanged}
            value={search}
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
            placeholder="Buscar participante..."
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}> {/*Mudando a largura de uma coluna específica da tabela*/}  
              <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
            </TableHeader>
            <TableHeader >Código</TableHeader>
            <TableHeader >Participantes</TableHeader>
            <TableHeader >Data de inscrição</TableHeader>
            <TableHeader >Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader> {/*No React, quando queremos fazer uma estilização inline, usamos uma váriavel JS, e um objeto com os estilos, por isso as 2 chaves - {{ style }}*/}
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => { //O .slice pega um pedaço do Array, tendo como parâmetros o primeiro e o ultimo índice 
            //'attendees' é o Array a ser mapeado e 'attendee' é cada posição no array
            return (
                // A primeira linha de código do retorno de um Array que usa o .map, sempre deve ter uma key, para diferenciar cada item da lista dos demais, nesse caso o ID de cada attendee 
              <TableRow key={attendee.id} className="border-b border-white/10 hover:bg-white/5">
                <TableCell>
                  <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">{attendee.name}</span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>
                  {attendee.checkedInAt === null 
                    ? <span className='text-zinc-400'>Não fez check-in</span>
                    : dayjs().to(attendee.checkedInAt)}
                </TableCell>
                <TableCell>
                  <IconButton transparent> {/*Ao setar uma propiedade do tipo Boolean em um componente sem nenhum valor, o React o entende como sendo True*/}
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>Página {page} de {totalPages}</span>
                {/*Math.ceil arredonda o número para cima*/}
                <div className="flex gap-1.5">
                  <IconButton
                      onClick={goToFirstPage} 
                      disabled={page === 1}> {/*Desativa o botão caso esteja na primeira página*/} 
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton
                      onClick={goToPreviousPage} 
                      disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton 
                      onClick={goToNextPage} 
                      disabled={page === totalPages}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton 
                      onClick={goToLastPage} 
                      disabled={page === totalPages}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}