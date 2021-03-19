import React, { useState, useEffect } from 'react';

function Message({ message }) {
//   const [message, setmessage] = useState('');
  const [visible, setvisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setvisible(false);
    }, 5000);
  }, [message]);

  return (
    <React.Fragment>
      {(visible && message) && (
        <div className="message">
          <p>Personalized Message !</p>
        </div>
      )}
    </React.Fragment>
  );
}

export default Message;
