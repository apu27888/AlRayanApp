import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Statement: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();

  useEffect(() => {
    setPageTitle('Statement');
  }, [setPageTitle]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Statement</h2>
        <p className="text-gray-600">Statement content will be implemented here.</p>
      </div>
    </div>
  );
};

export default Statement;
