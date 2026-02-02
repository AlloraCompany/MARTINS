import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function DateComponent({
  dateString,
  dateFormat,
}: {
  dateString: string;
  dateFormat: string;
}) {
  return (
    <time dateTime={dateString}>
      {format(new Date(dateString), dateFormat, { locale: ptBR })}
    </time>
  );
}
