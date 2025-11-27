const ClientFooter = () => {
  return (
    <footer className="mt-auto bg-gray-50 py-4 px-8 border-t border-gray-200">
      <div className="text-center">
        <p className="text-sm text-gray-500">Cần hỗ trợ? Liên hệ chúng tôi:</p>
        <div className="flex justify-center space-x-6 mt-2">
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="text-sm text-blue-500 font-medium">1900 1234</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="text-sm text-blue-500 font-medium">
              support@company.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter;
