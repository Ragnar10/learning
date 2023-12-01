// Core
import { useEffect } from 'react';

export const useOutsideClick = (ref, isOpen, onHide) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onHide();
            }
        }

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref, isOpen]);
};
