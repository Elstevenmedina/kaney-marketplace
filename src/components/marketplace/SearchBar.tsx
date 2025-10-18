import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getSearchSuggestions } from '@/services/searchService';
import { Product } from '@/store/slices/marketplaceSlice';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  products?: Product[];
}

export const SearchBar = ({ 
  onSearch, 
  placeholder = 'Buscar frutas, verduras, granos...', 
  suggestions = [],
  onSuggestionClick,
  products = []
}: SearchBarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout>();
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (query.length >= 2) {
        onSearch(query);
      } else if (query.length === 0) {
        onSearch('');
      }
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query, onSearch]);

  // Immediate search when query changes programmatically (e.g., from suggestions)
  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    if (newQuery.length >= 2) {
      onSearch(newQuery);
    } else if (newQuery.length === 0) {
      onSearch('');
    }
  };

  // Filter suggestions
  useEffect(() => {
    if (query.length >= 2) {
      // Usar sugerencias inteligentes del servicio de búsqueda
      const smartSuggestions = getSearchSuggestions(query, products);
      const manualSuggestions = suggestions.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
      );
      
      // Combinar y eliminar duplicados
      const allSuggestions = [...new Set([...smartSuggestions, ...manualSuggestions])];
      setFilteredSuggestions(allSuggestions.slice(0, 8));
      setShowSuggestions(allSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [query, suggestions, products]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    onSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      setShowSuggestions(false);
      onSearch(query.trim());
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleQueryChange(suggestion);
    setShowSuggestions(false);
    onSuggestionClick?.(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 bg-background"
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg animate-fade-in">
          <CardContent className="p-2">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Search className="inline h-3 w-3 mr-2 text-muted-foreground" />
                {suggestion}
              </button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
