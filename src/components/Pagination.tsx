interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination =  ({
                         currentPage,
                         totalPages,
                         onPageChange,
                     }: PaginationProps) =>{
    return (
        <div className="mt-4 flex justify-center">
            {Array.from({length: totalPages}, (_, index) => (
                <button
                    key={index}
                    className={`mx-2 px-3 py-1 rounded ${
                        currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    )
}

export default  Pagination