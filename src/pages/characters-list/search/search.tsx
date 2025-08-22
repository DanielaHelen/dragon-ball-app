import icon from "../../../assets/icons/search-icon.svg";
import clearIcon from "../../../assets/icons/clear.svg";
import "./search.scss";
import { ChangeEvent, FC, use, useEffect, useRef } from "react";

interface SearchProps {
    onSearch?: (query: string) => void;
}

const Search: FC<SearchProps> = (props: SearchProps) => {
    const className = "search";
    const { onSearch } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onSearch) {
            onSearch(event.target.value); // Llama a la función onSearch con el valor actual
        }
    };
    const handleClearClick = () => {
        if (inputRef.current) {
            inputRef.current.value = ""; // Limpiar el valor del input
            if (onSearch) {
                onSearch(""); // Llama a la función onSearch con un string vacío
            }
        }
    };
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className={className}>
            <div className={`${className}__input-wrapper`}>
                <div className={`${className}__icon-wrapper`}>
                    <img className={`${className}__icon`} src={icon} />
                </div>
                <input
                    ref={inputRef}
                    id='search-input'
                    type='text'
                    placeholder='SEARCH A CHARACTER...'
                    className={`${className}-input`}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) => (e.target.placeholder = "SEARCH A CHARACTER...")}
                    data-testid="search-input"
                />
                <div className={`${className}__clear-icon-wrapper`} onClick={handleClearClick}>
                    <img className={`${className}__clear-icon`} src={clearIcon} />
                </div>
            </div>
        </div>
    );
};

export default Search;
