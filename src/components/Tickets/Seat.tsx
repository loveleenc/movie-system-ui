import { useRef, useState } from "react";
import { SeatStatus } from "../../types/tickets";
import common from "../../utils/common";

const setSeatColorStyling = (status: SeatStatus, selected: boolean) => {
  const style = {
    backgroundColor: ''
  }
  if (selected) {
    style.backgroundColor = "#2E9CCA";
    return style;
  }

  switch (status) {
    case SeatStatus.AVAILABLE:
      style.backgroundColor = "#fbf7f5"
      break;
    case SeatStatus.BOOKED:
      style.backgroundColor = "#5C677D"
      break;
    case SeatStatus.USED:
      style.backgroundColor = "#5C677D"
      break;
    default:
      return common.assertNever(status);
  }
  return style;
};

const isSeatDisabled = (status: SeatStatus): boolean => {
  switch (status) {
    case SeatStatus.AVAILABLE:
      return false;
    case SeatStatus.BOOKED:
      return true;
    case SeatStatus.USED:
      return true;
    default:
      return common.assertNever(status);
  }
}

const Seat = ({
  ticketId,
  status,
  addOrRemoveSelection
}: {
  ticketId: string;
  status: SeatStatus;
  addOrRemoveSelection: (ticketId: string, previouslySelected: boolean) => void
}) => {
  const [selected, setSelected] = useState<boolean>(false);
  const self = useRef<HTMLButtonElement | null>(null);

  const onSeatSelectionChange = () => {
    addOrRemoveSelection((self.current as HTMLButtonElement).id, selected)
    setSelected(!selected);
  };

  return (
    <button
      disabled={isSeatDisabled(status)}
      onClick={onSeatSelectionChange}
      defaultChecked={selected}
      style={setSeatColorStyling(status, selected)}
      className="seat"
      id={ticketId}
      ref={self}
    ></button>
  );
};

export default Seat