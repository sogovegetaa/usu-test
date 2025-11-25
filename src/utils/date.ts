import moment from "moment";

export function formatDateTime(timestampSeconds: number): string {
  return moment.unix(timestampSeconds).format("DD-MM-YYYY HH:ss");
}


