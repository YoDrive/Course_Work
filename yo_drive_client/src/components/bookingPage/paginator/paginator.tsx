import React from 'react';
import styles from './paginator.module.css'; // Создайте файл с CSS-стилями для пагинатора

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={i === currentPage ? styles.activePage : ''}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className={styles.paginatorContainer}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.arrowButton}
            >
                {'<'}
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => {
                    if (currentPage < totalPages - 1) {
                        onPageChange(currentPage + 1);
                    }
                }}
                disabled={currentPage === totalPages}
                className={styles.arrowButton}
            >
                {'>'}
            </button>
        </div>
    );
};

export default Paginator;
