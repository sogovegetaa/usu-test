import React from "react";
import Modal from "../Modal";
import { Container } from "../../types/container";
import { getStatusLabel } from "../../utils/status";
import { formatDateTime } from "../../utils/date";

type TableDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  container: Container | null;
};

export const TableDetailsModal: React.FC<TableDetailsModalProps> = ({
  isOpen,
  onClose,
  container,
}) => {
  if (!container) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Детали записи">
        <div className="text-sm text-body dark:text-slate-100">
          Запись не выбрана.
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Детали записи">
      <div className="space-y-2">
        <div>
          <span className="font-medium text-heading">Номер контейнера: </span>
          <span>{container.number}</span>
        </div>
        <div>
          <span className="font-medium text-heading">Зона хранения: </span>
          <span>{container.storageArea}</span>
        </div>
        <div>
          <span className="font-medium text-heading">Статус: </span>
          <span>{getStatusLabel(container.status)}</span>
        </div>
        <div>
          <span className="font-medium text-heading">Создан: </span>
          <span>{formatDateTime(container.createdAt)}</span>
        </div>
        <div>
          <span className="font-medium text-heading">Обновлён: </span>
          <span>{formatDateTime(container.updatedAt)}</span>
        </div>
        {container.details && (
          <div>
            <span className="font-medium text-heading">Детали: </span>
            <span>{container.details}</span>
          </div>
        )}
      </div>
    </Modal>
  );
};



