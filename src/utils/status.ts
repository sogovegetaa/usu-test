import { STATUS_MAP } from "../components/StatusChart/constants";

export type StatusMeta = {
  key: string;
  label: string;
  color: string;
};

export function getStatusMeta(status: string): StatusMeta | undefined {
  return STATUS_MAP.find((item) => item.key === status);
}

export function getStatusLabel(status: string): string {
  const meta = getStatusMeta(status);
  return meta?.label ?? status;
}

export function getStatusColor(status: string): string | undefined {
  const meta = getStatusMeta(status);
  return meta?.color;
}



