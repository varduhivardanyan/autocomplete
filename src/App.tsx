import { useEffect, useState, useMemo, useCallback } from "react";
import Autocomplete from "./components/autocomplete";
import useDebounce from "./hooks/useDebounce";
import './App.css';

const API_URL = 'https://dummyjson.com/users';

type TItem = {
	id: number;
	firstName: string;
	lastName: string;
}

export type TOption = {
	label: string;
	value: number;
}

function App() {
	const [error, setError] = useState<string>('');
	const [inputValue, setInputValue] = useState<string>('');
	const [options, setOptions] = useState<TOption[] | null>(null)
	const [filteredOptions, setFilteredOptions] = useState<TOption[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [noResult, setNoResult] = useState<string>('');

	const { debounce } = useDebounce();

	// can be used for redirecting to corresponding search result page
	const onItemClick = useCallback((item: TOption) => {
		console.log(`clicked ${item}`);
	}, []);

	const fetchOptions = async () => {
		const apiUrl = `${API_URL}?limit=100`;
		setIsLoading(true);
		setError('');
		setNoResult('');
		try {
			const response = await fetch(apiUrl);
	
			if (!response.ok) {
				setError('Failed to fetch options');
				throw new Error('Failed to fetch options');
			}
	
			const { users = [] } = await response.json();
		
			const options = users.map((item: TItem): TOption => {
				return {
					value: item.id,
					label: item.firstName + ' ' + item.lastName
				}
			});
	
			setOptions(options);
		} catch (error) {
			setError('Failed to fetch options');
			setOptions([]);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchOptions();
	}, []);

	const handleInputChange = useCallback(debounce(event => fetchSearchResults(event as string), 500), [])	

	const fetchSearchResults = async (value: string) => {
		setError('');
		setNoResult('');
		setIsLoading(true);
		try {
			setInputValue(value);
			if (!value) {
				setFilteredOptions([]);
				return;
			}
	
			const searchResult = await fetch(`${API_URL}/search?q=${value}`);
	
			if (!searchResult.ok) {
				throw new Error('Failed to fetch search results');
			}
	
			const { users = [] }  = await searchResult.json();
			
			const filtered = users.map((item: TItem): TOption => {
				return {
					value: item.id,
					label: item.firstName + ' ' + item.lastName
				}
			});
	
			setFilteredOptions(filtered);
			const message = `No search results found for "${value}"`;

			!filtered.length && setNoResult(message);
		} catch (error) {
			setError('Error fetching search results');
			setFilteredOptions([]);
		} finally {
			setIsLoading(false);
		}
	};

  const list = useMemo(() => {
		if (inputValue && filteredOptions && filteredOptions.length) return filteredOptions;
		return options || [];
	}, [options, filteredOptions, inputValue]);

  return <Autocomplete  
		onItemClick={onItemClick}
    handleInputChange={handleInputChange}
    list={list} 
    fetchOptions={fetchOptions}
    isLoading={isLoading}
    error={error}
    noResult={noResult}
    placeholder="Type to search user..."
  />
}
export default App;
