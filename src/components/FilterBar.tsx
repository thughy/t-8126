
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { DIET_OPTIONS, CUISINE_OPTIONS, MEAL_TYPE_OPTIONS } from '@/lib/constants';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterBarProps {
  onFilterChange: (filters: {
    diet?: string;
    cuisine?: string;
    mealType?: string;
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);

  const updateFilters = () => {
    const filters: {
      diet?: string;
      cuisine?: string;
      type?: string;
    } = {};

    if (selectedDiet) filters.diet = selectedDiet;
    if (selectedCuisine) filters.cuisine = selectedCuisine;
    if (selectedMealType) filters.type = selectedMealType;

    onFilterChange(filters);
  };

  const handleDietSelect = (dietId: string) => {
    const newDiet = selectedDiet === dietId ? null : dietId;
    setSelectedDiet(newDiet);
    setTimeout(updateFilters, 0);
  };

  const handleCuisineSelect = (cuisineId: string) => {
    const newCuisine = selectedCuisine === cuisineId ? null : cuisineId;
    setSelectedCuisine(newCuisine);
    setTimeout(updateFilters, 0);
  };

  const handleMealTypeSelect = (typeId: string) => {
    const newType = selectedMealType === typeId ? null : typeId;
    setSelectedMealType(newType);
    setTimeout(updateFilters, 0);
  };

  const clearAllFilters = () => {
    setSelectedDiet(null);
    setSelectedCuisine(null);
    setSelectedMealType(null);
    setTimeout(updateFilters, 0);
  };

  const FilterPopover = ({ 
    title, 
    options, 
    selected, 
    onSelect 
  }: { 
    title: string; 
    options: FilterOption[]; 
    selected: string | null; 
    onSelect: (id: string) => void;
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={selected ? "default" : "outline"}
          className="justify-between group"
        >
          {selected ? 
            options.find(o => o.id === selected)?.label : 
            title}
          <ChevronDown className="ml-2 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <div className="p-2 font-medium border-b">
          {title}
        </div>
        <ScrollArea className="h-[300px]">
          <div className="p-2">
            {options.map((option) => (
              <Button
                key={option.id}
                variant="ghost"
                className="w-full justify-start mb-1 font-normal"
                onClick={() => onSelect(option.id)}
              >
                <div className="w-4 h-4 mr-2 flex items-center justify-center">
                  {selected === option.id && <Check className="h-4 w-4" />}
                </div>
                {option.label}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );

  const hasActiveFilters = selectedDiet || selectedCuisine || selectedMealType;

  return (
    <motion.div 
      className="flex flex-wrap items-center gap-2 mt-4"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <FilterPopover
        title="Diet"
        options={DIET_OPTIONS}
        selected={selectedDiet}
        onSelect={handleDietSelect}
      />
      
      <FilterPopover
        title="Cuisine"
        options={CUISINE_OPTIONS}
        selected={selectedCuisine}
        onSelect={handleCuisineSelect}
      />
      
      <FilterPopover
        title="Meal Type"
        options={MEAL_TYPE_OPTIONS}
        selected={selectedMealType}
        onSelect={handleMealTypeSelect}
      />

      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearAllFilters}
              className="border border-input"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterBar;
