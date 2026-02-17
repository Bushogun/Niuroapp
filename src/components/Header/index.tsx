import type { FC } from "react";
import { useDispatch } from "react-redux";
import { setFromDate, setToDate, setFilterNDays } from "../../state/ui/filterSlice"; 
import type { AppDispatch } from "../../state/store";
import SimpleSlider from "../Slider";

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

  const handleSliderChange = (val: number) => {
    dispatch(setFilterNDays(val)); 
  };

  return (
    <header className="bg-white border-b w-full">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 md:py-0 md:h-20 lg:h-24 gap-6 md:gap-4">
        
        <div className="flex items-center w-full md:w-auto">
          <button
            className="md:hidden p-2 -ml-2 text-2xl"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>

        <div className="w-full md:max-w-[240px] lg:max-w-xs flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-1 md:mb-2">
            Rango de días
          </span>
          <div className="w-full">
            <SimpleSlider min={1} max={5} onChange={handleSliderChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:flex items-end gap-3 w-full md:w-auto">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">From</label>
            <input
              type="date"
              onChange={handleFromChange}
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 outline-none bg-gray-50 md:bg-white h-9 w-full md:w-36 lg:w-40 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">To</label>
            <input
              type="date"
              onChange={handleToChange}
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 outline-none bg-gray-50 md:bg-white h-9 w-full md:w-36 lg:w-40 transition-all"
            />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;