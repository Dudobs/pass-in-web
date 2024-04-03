import { ChangeEvent, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

import { IconButton } from './icon-button';
import { Table } from './table/table';
import { TableHeader } from './table/table-header';
import { TableCell } from './table/table-cell';
import { TableRow } from './table/table-row';
import { attendees } from '../data/attendees';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export function AttendeeList() {
  const [search, setSearch] = useState('')

  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(attendees.length / 10)

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) { // '/react-notes ln 10'
    setSearch(event.target.value)
  }

  function goToFirstPage() {
    setPage(1)
  }

  function goToPreviousPage() {
    setPage(page -1)
  }

  function goToNextPage() {
    setPage(page + 1)
  }

  function goToLastPage() {
    setPage(totalPages)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participante</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInputChanged}
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
            placeholder="Buscar participante..."
          />
        </div>

        {search}
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}> {/*Mudando a largura de uma coluna específica da tabela*/}  
              <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
            </TableHeader>
            <TableHeader >Código</TableHeader>
            <TableHeader >Participante</TableHeader>
            <TableHeader >Data de inscrição</TableHeader>
            <TableHeader >Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader> {/*No React, quando queremos fazer uma estilização inline, usamos uma váriavel JS, e um objeto com os estilos, por isso as 2 chaves - {{ style }}*/}
          </tr>
        </thead>
        <tbody>
          {/* Para repetir códigos HTML na página, a linha abaixo cria um Array de tamanho 8 e percorre ele, devolvendo uma função, que retorna o código em si */}
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => { //O .slice pega um pedaço do Array, tendo como parâmetros o primeiro e o ultimo índice 
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
                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
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
              Mostrando 10 de {attendees.length} itens
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