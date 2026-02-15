import type { FC } from "react";
import { useDispatch } from "react-redux";
import { setFromDate, setToDate } from "../../state/ui/filterSlice";
import type { AppDispatch } from "../../state/store";

interface HeaderProps {
  setOpen: (value: boolean) => void;
}

const Header: FC<HeaderProps> = ({ setOpen }) => {
  const dispatch = useDispatch<AppDispatch>();

const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  dispatch(setFromDate(e.target.value));
};

const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  dispatch(setToDate(e.target.value));
};


  return (
    <header className="min-h-28 bg-white border-b flex items-center px-6 justify-between">
      
      <div className="flex items-center">
        <button
          className="md:hidden mr-4 text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label className="w-12 text-sm font-medium">From:</label>
          <input
            type="date"
            onChange={handleFromChange}
            className="border rounded-lg px-3 py-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-12 text-sm font-medium">To:</label>
          <input
            type="date"
            onChange={handleToChange}
            className="border rounded-lg px-3 py-1"
          />
        </div>
      </div>

    </header>
  );
};

export default Header;
