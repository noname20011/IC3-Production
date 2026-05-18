import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Loading from "../UI/Loading";

interface SelectItem {
  id: string | number;
  name: string;
}

interface SelectProps<T extends SelectItem> {
  label: string;
  placeholder?: string;

  data: T[];
  value?: T["id"];
  isLoading: boolean;

  isOpen: boolean;
  setIsOpen: (isShow: boolean) => void;

  onChange: (item: T) => void;
  icon?: React.ReactNode;

  heightOption?: string;
}

const Select = <T extends SelectItem>({
  label,
  placeholder = "Chọn dữ liệu",
  data,
  value,
  isLoading,
  isOpen,
  setIsOpen,
  onChange,
  icon,
  heightOption = "xl:max-h-52 max-h-32",
}: SelectProps<T>) => {
  const currentItem = data.find((item) => item.id === value);

  return (
    <div className="space-y-2">
      <label className="ml-1 text-sm font-medium text-slate-200">{label}</label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 xl:py-3 py-2 text-left transition-colors focus:border-devotion-gold/50 focus:outline-none"
        >
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              {icon}
            </div>
          )}

          <span className={cn(currentItem ? "text-white" : "text-slate-500")}>
            {currentItem ? currentItem.name : placeholder}
          </span>

          <ChevronDown
            size={18}
            className={cn(
              "text-slate-500 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 mt-2 max-h-60 w-full rounded-xl border border-white/10 bg-background shadow-2xl"
            >
              <div
                className={`scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent overflow-y-auto ${heightOption}`}
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    {data.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onChange(item);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between px-4 py-3 text-left transition-colors md:py-2",
                          value === item.id
                            ? "bg-devotion-gold/20 text-devotion-gold"
                            : "text-slate-300 hover:bg-devotion-gold/10",
                          index === 0 &&
                            "first:rounded-tl-xl first:rounded-tr-xl",
                          index === data.length - 1 &&
                            "last:rounded-bl-xl last:rounded-br-xl",
                        )}
                      >
                        <span>{item.name}</span>

                        {value === item.id && <Check size={16} />}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Select;
