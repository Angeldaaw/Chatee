import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function formatTime(isoString: string) {
    return formatDistanceToNow(new Date(isoString), { addSuffix:true, locale: es });
}