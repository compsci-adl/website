import { Combobox } from '@headlessui/react';
import { useState } from 'react';
import { IoCaretDown, IoCheckmark } from 'react-icons/io5';

interface AutocompleteProps<TOption> {
    value: TOption | null;
    onChange: (option: TOption) => void;
    options: TOption[];
    displayOptionStr: (option: TOption) => string;
    placeholder?: string;
    notFoundMessage?: string;
    className?: string;
}
export default function Autocomplete<TOption>({
    value,
    onChange,
    options,
    displayOptionStr,
    placeholder,
    notFoundMessage,
    className,
}: AutocompleteProps<TOption>) {
    const [query, setQuery] = useState('');
    const filteredOptions =
        query === ''
            ? options
            : options.filter((option) =>
                  displayOptionStr(option).toLowerCase().includes(query.toLowerCase())
              );

    return (
        <Combobox value={value} onChange={onChange}>
            <div className={`${className} relative w-full`}>
                <div className="relative w-full">
                    <Combobox.Input
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 text-grey"
                        displayValue={(option: TOption | null) =>
                            option ? displayOptionStr(option) : ''
                        }
                        placeholder={placeholder}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <IoCaretDown className="h-5 w-5 fill-grey" />
                    </Combobox.Button>
                </div>
                <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                    {filteredOptions.length === 0 && query !== '' ? (
                        <div className="relative select-none px-4 py-2 text-grey">
                            {notFoundMessage ?? 'No results found'}
                        </div>
                    ) : (
                        filteredOptions.map((option, i) => (
                            <Combobox.Option
                                key={i}
                                value={option}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-grey text-white' : 'text-black'
                                    }`
                                }
                            >
                                {({ selected }) => (
                                    <>
                                        {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <IoCheckmark className="h-5 w-5" />
                                            </span>
                                        )}
                                        <span>{displayOptionStr(option)}</span>
                                    </>
                                )}
                            </Combobox.Option>
                        ))
                    )}
                </Combobox.Options>
            </div>
        </Combobox>
    );
}
