import { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge'

interface TableCellProps extends ComponentProps<'th'> {}

export function TableCell(props: TableCellProps) {
  return (
    // O twMerge faz com que além das classes setadas no aqruivo do componente, eu possa especificar mais algumas para componentes específicos na minha página. Para isso, ele recebe como primeiro parâmetro as classes que terão em todos os componentes, depois as classes que os componentes específicos podem ter. Além disso as {...props} devem vir antes das classes, já que as novas classes serão também propiedades, caso contrario a hierarquia impedirá que as novas classes sejam carregadas
    <td {...props} className={twMerge("py-3 px-4 text-sm text-zinc-300", props.className)} />
  )
}