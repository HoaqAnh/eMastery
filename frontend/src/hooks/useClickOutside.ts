import { useEffect, useRef, useState } from 'react';

interface UseClickOutsideOptions {
  initialIsOpen?: boolean;
}

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  options: UseClickOutsideOptions = {}
) => {
  const { initialIsOpen = false } = options;
  const [isOpen, setIsOpen] = useState<boolean>(initialIsOpen);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return { ref, isOpen, setIsOpen, toggleDropdown };
};

export default useClickOutside;